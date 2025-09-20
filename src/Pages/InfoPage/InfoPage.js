/** @format */
import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useManga, useMangaInfinite } from "../../hooks/useManga";
import { useParams, useNavigate } from "react-router-dom";
import MangaHeader from "./MangaHeader";
import MangaChapters from "./MangaChapters";
import MangaHeaderSkeleton from "./MangaHeaderSkeleton";

const InfoPage = () => {
    const { id } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const [order, setOrder] = useState("desc");

    const { data: mangaData, isLoading: isLoadingManga } = useManga({
        mode: "details",
        mangaId: id,
    });
    const {
        data,
        fetchNextPage: loadAllChapters,
        hasNextPage: hasMoreChapters,
        isFetchingNextPage: loadingChapters,
        isLoading: loading,
    } = useMangaInfinite({
        mode: "chapters",
        limit: 20,
        mangaId: id,
        order,
        query: true,
    });

    const chapters = data?.pages.flatMap((page) => page.chapters) ?? [];

    const goToDetails = (chapterId) =>
        navigate(`/read/${mangaData?.id}/${chapterId}`);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                minHeight: "calc(100vh - 64px)",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.7)), url('${
                    mangaData?.coverUrl ||
                    "https://images6.alphacoders.com/137/thumb-1920-1372163.jpeg"
                }')`,
                backgroundSize: "cover",
                backgroundPosition: "center 20%",
                backgroundRepeat: "no-repeat",
                color: "white",
                p: { xs: 2, md: 6 },
            }}>
            {isLoadingManga ? (
                <MangaHeaderSkeleton />
            ) : (
                <MangaHeader mangaData={mangaData} theme={theme} />
            )}
            <MangaChapters
                chapters={chapters}
                loadAllChapters={loadAllChapters}
                hasMoreChapters={hasMoreChapters}
                order={order}
                setOrder={setOrder}
                goToDetails={goToDetails}
                loading={loading}
            />
        </Box>
    );
};

export default InfoPage;
