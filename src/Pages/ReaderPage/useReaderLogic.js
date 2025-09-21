/** @format */
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useManga, useMangaInfinite } from "../../hooks/useManga";

const useReaderLogic = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [pages, setPages] = useState([]);
    const [chapterData, setChapterData] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [zoomMode, setZoomMode] = useState("fit-width");
    const [loading, setLoading] = useState(true);
    const [mangaTitle, setMangaTitle] = useState("");
    const keyPressed = useRef(false);

    const { data: chapter, isLoading: isChapterLoading } = useManga({
        mode: "chapter",
        chapterId: params.id,
    });
    const { data: atHome, isLoading: isAtHomeLoading } = useManga({
        mode: "atHome",
        chapterId: params.id,
    });
    const { data: mangaDetails, isLoading: isMangaLoading } = useManga({
        mode: "details",
        mangaId: params.mangaId,
    });

    const {
        data: chaptersData,
        fetchNextPage: loadAllChapters,
        hasNextPage: hasMoreChapters,
        isFetchingNextPage: loadingChapters,
        isLoading: isChaptersLoading,
    } = useMangaInfinite({
        mode: "chapters",
        limit: 100,
        mangaId: params.mangaId,
        query: true,
        order: "desc",
    });
    const allChapters =
        chaptersData?.pages.flatMap((page) => page.chapters) ?? [];

    useEffect(() => {
        if (!hasMoreChapters || loadingChapters || isChaptersLoading) return;
        loadAllChapters();
    }, [
        hasMoreChapters,
        loadingChapters,
        isChaptersLoading,
        loadAllChapters,
        chaptersData,
        params.mangaId,
    ]);

    // Only update local state if `allChapters` actually changed
    useEffect(() => {
        if (allChapters.length !== chapters.length) {
            setChapters(allChapters);
        }
    }, [allChapters, chapters.length]);

    // fetch all chapters

    useEffect(() => {
        if (isMangaLoading || !mangaDetails) return;

        setMangaTitle(mangaDetails.titleEN || "Unknown Manga");
    }, [params.mangaId, mangaDetails, isMangaLoading]);

    useEffect(() => {
        setLoading(true);
        setPages([]);
        setChapterData(chapter);

        if (isChapterLoading || isAtHomeLoading) return;
        if (!chapter) return setLoading(false);

        if (!chapter?.attributes?.externalUrl && atHome) {
            const baseUrl = atHome.baseUrl;
            const hash = atHome.chapter.hash;
            const data = atHome.chapter.data;

            setPages(
                data.map(
                    (pageData) =>
                        `https://sadmanga-production.up.railway.app/api/page?baseUrl=${encodeURIComponent(
                            baseUrl
                        )}&hash=${hash}&pageData=${pageData}`
                )
            );
        } else {
            window.location.href = chapter.attributes.externalUrl;
        }

        setLoading(false);
    }, [chapter, atHome, isChapterLoading, isAtHomeLoading]);

    // keyboard navigation
    const handlePrevChapter = () => {
        const idx = chapters.findIndex((ch) => ch.id === params.id);
        if (idx >= 0 && idx < chapters.length - 1)
            navigate(`/read/${params.mangaId}/${chapters[idx + 1].id}`);
    };

    const handleNextChapter = () => {
        const idx = chapters.findIndex((ch) => ch.id === params.id);
        if (idx > 0)
            navigate(`/read/${params.mangaId}/${chapters[idx - 1].id}`);
    };

    const handleKeyDown = (event) => {
        if (keyPressed.current) return;
        keyPressed.current = true;
        if (event.key === "ArrowLeft") handlePrevChapter();
        if (event.key === "ArrowRight") handleNextChapter();
    };

    const handleKeyUp = (event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight")
            keyPressed.current = false;
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [chapters, params.id]);

    return {
        pages,
        chapterData,
        chapters,
        zoomMode,
        setZoomMode: setZoomMode,
        loading,
        mangaTitle,
        handleZoomChange: (e) => setZoomMode(e.target.value),
        handlePrevChapter,
        handleNextChapter,
        currentChapterIndex: chapters.findIndex((ch) => ch.id === params.id),
    };
};

export default useReaderLogic;
