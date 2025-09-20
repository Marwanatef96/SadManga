/** @format */
import { useInfiniteQuery, useQuery, useQueries } from "@tanstack/react-query";
import { fetchManga } from "../api/mangaApi";

// ---- Infinite / paginated manga loader ----
export function useMangaInfinite({
    mode,
    query,
    tagIds,
    mangaId,
    limit = 20,
    order,
    status,
}) {
    return useInfiniteQuery({
        queryKey: ["manga", mode, query, tagIds, mangaId, order, status],
        queryFn: ({ pageParam = 0 }) =>
            fetchManga({
                mode,
                query,
                tagIds,
                mangaId,
                order,
                page: pageParam,
                limit,
                status,
            }),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage) return undefined;
            if (mode === "latest") {
                return allPages.length;
            } else {
                const nextOffset = lastPage.offset + lastPage.limit;
                return nextOffset >= lastPage.total
                    ? undefined
                    : nextOffset / lastPage.limit;
            }
        },
        keepPreviousData: true,
        enabled: !!query, // <--- only fetch if query is truthy
    });
}

// ---- Single fetch hook for unit load (e.g., details) ----
export function useManga({ mode, mangaId, chapterId }) {
    return useQuery({
        queryKey: ["manga", mode, mangaId, chapterId],
        queryFn: () => fetchManga({ mode, mangaId, chapterId }),
    });
}
export function useMangaList(mangaIds = []) {
    return useQueries({
        queries: mangaIds.map((id) => ({
            queryKey: ["manga", "details", id],
            queryFn: () => fetchManga({ mode: "details", mangaId: id }),
            enabled: !!id,
        })),
    });
}
export function useChapterList(chapterIds = []) {
    return useQueries({
        queries: chapterIds.map((id) => ({
            queryKey: ["chapter", "details", id],
            queryFn: () => fetchManga({ mode: "chapter", chapterId: id }),
            enabled: !!id,
        })),
    });
}
