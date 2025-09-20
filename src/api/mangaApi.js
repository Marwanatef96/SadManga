/** @format */
import apiClient from "./client";

const BASE_URL = "https://myapp-production-6903.up.railway.app";
const DEFAULT_CONTENT_RATING = ["safe"];
const DEFAULT_LANGUAGE = ["en"];
const EXCLUDED_TAGS = [
    "2d1f5d56-a1e5-4d0d-a961-2193588b08ec", // Yuri
    "5920b825-4181-4a17-beeb-9918b0ff7a30", // Yaoi
    "5bd0e105-4481-44ca-b6e7-7544da56b1a3",
    "97893a4c-12af-4dac-b6be-0dffb353568e",
    "a3c67850-4684-404e-9b7f-c69850ee5da6",
    "b13b2a48-c720-44a9-9c77-39c9979373fb",
    "ddefd648-5140-4e5f-ba18-4eca4071d19b",
    "9ab53f92-3eed-4e9b-903a-917c86035ee3",
];
function applyExcludedTags(params) {
    EXCLUDED_TAGS.forEach((id, index) => {
        params[`excludedTags[${index}]`] = id;
        params[`excludedTagsMode`] = "OR";
    });
    return params;
}
// ---- Constants ----
const API_ENDPOINTS = {
    MANGA: "/manga",
    CHAPTER: "/chapter",
    STATISTICS: "/statistics/manga",
    AT_HOME: "/at-home/server",
};

const COMMON_INCLUDES = {
    COVER_ART: "cover_art",
    MANGA: "manga",
};

// ---- Helpers ----
function buildCoverUrl(mangaId, coverFileName) {
    if (!mangaId || !coverFileName) return null;
    return `${BASE_URL}/cover/${mangaId}/${coverFileName}`;
}

function extractTitle(titleObj, fallback = "Untitled") {
    if (!titleObj) return fallback;
    return titleObj.en || Object.values(titleObj)[0] || fallback;
}

function extractCoverInfo(relationships) {
    const coverRel = relationships?.find(
        (rel) => rel.type === COMMON_INCLUDES.COVER_ART
    );
    return coverRel?.attributes?.fileName ?? null;
}

function mapCategories(tags = []) {
    return tags.map((tag) => ({
        value: tag.id,
        label: tag.attributes?.name?.en || "Unknown",
    }));
}

// Optimized batch ratings fetcher with caching
const ratingsCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getMangaRatingsMap(mangaIds) {
    if (!mangaIds?.length) return {};

    // Check cache first
    const now = Date.now();
    const uncachedIds = mangaIds.filter((id) => {
        const cached = ratingsCache.get(id);
        return !cached || now - cached.timestamp > CACHE_TTL;
    });

    // Fetch only uncached ratings
    if (uncachedIds.length > 0) {
        try {
            const { data } = await apiClient.get(API_ENDPOINTS.STATISTICS, {
                params: { "manga[]": uncachedIds },
            });

            const stats = data.statistics || {};
            for (const [id, stat] of Object.entries(stats)) {
                ratingsCache.set(id, {
                    average: stat.rating?.average ?? null,
                    timestamp: now,
                });
            }
        } catch (error) {
            console.warn("Failed to fetch ratings:", error.message);
        }
    }

    // Return combined cached and fresh results
    const ratings = {};
    mangaIds.forEach((id) => {
        const cached = ratingsCache.get(id);
        if (cached) {
            ratings[id] = { average: cached.average };
        }
    });

    return ratings;
}

async function getMangaDetailsById(mangaId) {
    try {
        const [mangaResponse, ratingsMap] = await Promise.all([
            apiClient.get(`${API_ENDPOINTS.MANGA}/${mangaId}`, {
                params: { "includes[]": COMMON_INCLUDES.COVER_ART },
            }),
            getMangaRatingsMap([mangaId]),
        ]);

        const mangaData = mangaResponse.data.data;
        if (!mangaData) return null;

        const coverFile = extractCoverInfo(mangaData.relationships);
        const categories = mapCategories(mangaData.attributes?.tags);

        return {
            id: mangaId,
            titleEN: extractTitle(mangaData.attributes?.title),
            titleJP: mangaData.attributes?.title?.ja || null,
            status: mangaData.attributes?.status || "unknown",
            description: mangaData.attributes?.description?.en || "",
            categories,
            coverUrl: buildCoverUrl(mangaId, coverFile),
            rating: ratingsMap[mangaId]?.average ?? null,
        };
    } catch (error) {
        console.error(
            `Error fetching manga details for ${mangaId}:`,
            error.message
        );
        return null;
    }
}

// Optimized manga fetcher for search results
async function fetchMangaBatch(mangaList) {
    if (!mangaList?.length) return [];

    const mangaIds = mangaList.map((m) => m.id);
    const ratingsMap = await getMangaRatingsMap(mangaIds);

    return mangaList.map((manga) => {
        const coverFile = extractCoverInfo(manga.relationships);
        const categories = mapCategories(manga.attributes?.tags);

        return {
            id: manga.id,
            titleEN: extractTitle(manga.attributes?.title),
            titleJP: manga.attributes?.title?.ja || null,
            status: manga.attributes?.status || "unknown",
            description: manga.attributes?.description?.en || "",
            categories,
            coverUrl: buildCoverUrl(manga.id, coverFile),
            rating: ratingsMap[manga.id]?.average ?? null,
        };
    });
}

// ---- Main Service Function ----
export async function fetchManga({
    mode,
    query,
    mangaId,
    tagIds,
    page = 0,
    limit = 20,
    order = "desc",
    chapterId,
    status,
} = {}) {
    try {
        switch (mode) {
            case "popular": {
                let params = {
                    limit,
                    "order[followedCount]": "desc",
                    "includes[]": [COMMON_INCLUDES.COVER_ART],
                    "contentRating[]": DEFAULT_CONTENT_RATING,
                };
                params = applyExcludedTags(params);
                const { data } = await apiClient.get(API_ENDPOINTS.MANGA, {
                    params,
                });
                const mangaIds = data.data.map((m) => m.id);
                const ratingsMap = await getMangaRatingsMap(mangaIds);

                return data.data.map((m) => {
                    const coverFile = extractCoverInfo(m.relationships);
                    const categories = mapCategories(m.attributes?.tags);

                    return {
                        id: m.id,
                        title: extractTitle(m.attributes?.title),
                        coverUrl: buildCoverUrl(m.id, coverFile),
                        categories,
                        followers: m.attributes.followedCount || 0,
                        status: m.attributes.status,
                        rating: ratingsMap[m.id]?.average ?? null,
                    };
                });
            }

            // Optimized latest manga case for backend service
            case "latest": {
                try {
                    // For better pagination with deduplication, we need to fetch more chapters
                    // to ensure we get enough unique manga per page
                    const oversampleMultiplier = 3; // Fetch 3x more chapters to account for duplicates
                    const fetchLimit = limit * oversampleMultiplier;
                    const offset = page * fetchLimit;

                    // Fetch chapters with oversampling
                    const { data: chapterData } = await apiClient.get(
                        API_ENDPOINTS.CHAPTER,
                        {
                            params: {
                                limit: fetchLimit,
                                offset,
                                "includes[]": [COMMON_INCLUDES.MANGA],
                                "translatedLanguage[]": DEFAULT_LANGUAGE,
                                "contentRating[]": DEFAULT_CONTENT_RATING,
                                "order[updatedAt]": "desc",
                            },
                        }
                    );

                    if (!chapterData?.data?.length) return [];

                    // Extract unique manga IDs in order of appearance (most recent first)
                    const seenMangaIds = new Set();
                    const orderedMangaIds = [];

                    chapterData.data.forEach((chapter) => {
                        const mangaId = chapter.relationships?.find(
                            (r) => r.type === COMMON_INCLUDES.MANGA
                        )?.id;
                        if (mangaId && !seenMangaIds.has(mangaId)) {
                            seenMangaIds.add(mangaId);
                            orderedMangaIds.push(mangaId);
                        }
                    });

                    // Take only the requested limit of unique manga
                    const uniqueMangaIds = orderedMangaIds.slice(0, limit);

                    if (!uniqueMangaIds.length) return [];
                    let params = {
                        limit: uniqueMangaIds.length,
                        "ids[]": uniqueMangaIds,
                        "includes[]": [COMMON_INCLUDES.COVER_ART],
                    };
                    params = applyExcludedTags(params);
                    // Fetch manga details and ratings concurrently
                    const [mangaResponse, ratingsMap] = await Promise.all([
                        apiClient.get(API_ENDPOINTS.MANGA, { params }),
                        getMangaRatingsMap(uniqueMangaIds),
                    ]);

                    if (!mangaResponse?.data?.data?.length) return [];

                    // Build manga map preserving the order
                    const mangaMap = new Map();
                    mangaResponse.data.data.forEach((manga) => {
                        if (!manga?.id) return;

                        const coverFile = extractCoverInfo(manga.relationships);

                        mangaMap.set(manga.id, {
                            id: manga.id,
                            title: extractTitle(manga.attributes?.title),
                            coverUrl: buildCoverUrl(manga.id, coverFile),
                            status: manga.attributes?.status || "unknown",
                            chapters: [],
                            rating: ratingsMap[manga.id]?.average ?? null,
                            // Store the position for sorting
                            position: uniqueMangaIds.indexOf(manga.id),
                        });
                    });

                    // Fetch recent chapters for each manga
                    const chapterPromises = uniqueMangaIds.map(
                        async (mangaId) => {
                            const manga = mangaMap.get(mangaId);
                            if (!manga) return;

                            try {
                                const { data } = await apiClient.get(
                                    API_ENDPOINTS.CHAPTER,
                                    {
                                        params: {
                                            manga: mangaId,
                                            limit: 3,
                                            "translatedLanguage[]":
                                                DEFAULT_LANGUAGE,
                                            "contentRating[]":
                                                DEFAULT_CONTENT_RATING,
                                            "order[chapter]": "desc",
                                        },
                                    }
                                );

                                if (data?.data) {
                                    manga.chapters = data.data.map(
                                        (chapter) => ({
                                            id: chapter.id,
                                            number:
                                                chapter.attributes?.chapter ||
                                                "Oneshot",
                                            title:
                                                chapter.attributes?.title ||
                                                null,
                                            updatedAt:
                                                chapter.attributes?.updatedAt,
                                        })
                                    );
                                }
                            } catch (error) {
                                console.warn(
                                    `Failed to fetch chapters for manga ${mangaId}:`,
                                    error.message
                                );
                            }
                        }
                    );

                    await Promise.all(chapterPromises);

                    // Return results in the original order (most recent chapter updates first)
                    const results = Array.from(mangaMap.values())
                        .filter((manga) => manga.chapters.length > 0)
                        .sort((a, b) => a.position - b.position) // Maintain original order
                        .map((manga) => {
                            // Remove the position field before returning
                            const { position, ...mangaWithoutPosition } = manga;
                            return mangaWithoutPosition;
                        });

                    return results;
                } catch (error) {
                    console.error("Error fetching latest manga:", error);
                    throw new Error(
                        `Failed to fetch latest manga: ${error.message}`
                    );
                }
            }
            case "details": {
                if (!mangaId)
                    throw new Error("mangaId required for details mode");
                return await getMangaDetailsById(mangaId);
            }

            case "title": {
                const offset = page * limit;

                let params = {
                    title: query,
                    limit,
                    offset,
                    "includes[]": [COMMON_INCLUDES.COVER_ART],
                    "contentRating[]": DEFAULT_CONTENT_RATING,
                };
                params = applyExcludedTags(params);

                const { data } = await apiClient.get(API_ENDPOINTS.MANGA, {
                    params,
                });

                return {
                    data: await fetchMangaBatch(data.data),
                    offset,
                    limit,
                    total: data.total, // MangaDex response has this
                };
            }

            case "tag": {
                const ids = Array.isArray(tagIds) ? tagIds : [tagIds];
                const offset = page * limit;

                const params = {
                    limit,
                    offset,
                    includedTagsMode: "AND",
                    "includes[]": [COMMON_INCLUDES.COVER_ART],
                    "contentRating[]": DEFAULT_CONTENT_RATING,
                };

                // Add tag IDs to params
                ids.forEach((id, index) => {
                    params[`includedTags[${index}]`] = id;
                });

                // Add ordering
                switch (order) {
                    case "Latest":
                        params["order[updatedAt]"] = "desc";
                        break;
                    case "Oldest":
                        params["order[updatedAt]"] = "asc";
                        break;
                    case "Rating":
                        params["order[rating]"] = "desc";
                        break;
                }

                if (status) {
                    params["status[]"] = status.toLowerCase();
                }

                const { data } = await apiClient.get(API_ENDPOINTS.MANGA, {
                    params,
                });
                return {
                    data: await fetchMangaBatch(data.data),
                    offset,
                    limit,
                    total: data.total,
                };
            }

            case "chapter": {
                if (!chapterId)
                    throw new Error("chapterId required for chapter mode");
                const { data } = await apiClient.get(
                    `${API_ENDPOINTS.CHAPTER}/${chapterId}`
                );
                return data.data;
            }

            case "atHome": {
                if (!chapterId)
                    throw new Error("chapterId required for atHome mode");
                const { data } = await apiClient.get(
                    `${API_ENDPOINTS.AT_HOME}/${chapterId}`
                );
                return data;
            }

            case "chapters": {
                if (!mangaId)
                    throw new Error("mangaId required for chapters mode");
                const offset = page * limit;

                const { data } = await apiClient.get(API_ENDPOINTS.CHAPTER, {
                    params: {
                        manga: mangaId,
                        limit,
                        offset,
                        "translatedLanguage[]": DEFAULT_LANGUAGE,
                        "order[chapter]": order,
                    },
                });

                return {
                    chapters: data.data,
                    total: data.total,
                    limit: data.limit,
                    offset: data.offset,
                };
            }

            default:
                throw new Error(`Unknown mode: ${mode}`);
        }
    } catch (error) {
        console.error(`Error in fetchManga (mode: ${mode}):`, error.message);
        throw new Error(`Failed to fetch manga data: ${error.message}`);
    }
}
