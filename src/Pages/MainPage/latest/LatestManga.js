/** @format */
import React from "react";
import { Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMangaInfinite } from "../../../hooks/useManga";
import MangaCard from "./MangaCard";
import LatestMangaSkeleton from "./mangaLoader";
import SectionTitle from "./sectionTitle";

const LatestManga = () => {
    const theme = useTheme();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useMangaInfinite({ mode: "latest", limit: 20 , query: true});

    const mangaList = data?.pages?.flat() || [];

    if (isLoading)
        return (
            <Container maxWidth='lg' sx={{ padding: 2 }}>
                <Grid container spacing={1}>
                    <LatestMangaSkeleton />
                </Grid>
            </Container>
        );

    if (isError) return <p>Error: {error.message}</p>;

    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <SectionTitle title='Latest Manga' />
            <InfiniteScroll
                dataLength={mangaList.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                style={{ overflow: "visible" }}>
                <Grid container spacing={1}>
                    {mangaList.map((manga) => (
                        <MangaCard key={manga.id} manga={manga} theme={theme} />
                    ))}
                    {isFetchingNextPage && (
                        <LatestMangaSkeleton dataLength={mangaList.length} />
                    )}
                </Grid>
            </InfiniteScroll>
        </Container>
    );
};

export default LatestManga;
