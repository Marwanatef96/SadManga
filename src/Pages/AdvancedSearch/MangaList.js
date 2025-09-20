/** @format */

import { useMemo } from "react";
import { Grid, Container, Paper, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTheme } from "@mui/material/styles";
import { useMangaInfinite } from "../../hooks/useManga";
import LatestMangaSkeleton from "../MainPage/latest/mangaLoader";
import MangaCard from "./MangaCard";

export default function MangaList({ searchParams }) {
    const theme = useTheme();
    const filters = Object.fromEntries(searchParams.entries());

    const queryParams = useMemo(
        () => ({
            mode: "tag",
            tagIds: filters.tags ? filters.tags.split(",") : [],
            order: filters.sort || "Latest",
            limit: 20,
            status: filters.status || "",
            query: true,
        }),
        [filters]
    );

    const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
        useMangaInfinite(queryParams);

    const mangaList = useMemo(
        () => data?.pages?.flatMap((page) => page.data) || [],
        [data]
    );

    if (isLoading)
        return (
            <Container maxWidth='lg' sx={{ padding: 2 }}>
                <Grid container spacing={2}>
                    <LatestMangaSkeleton />
                </Grid>
            </Container>
        );

    if (isError)
        return (
            <Container maxWidth='lg' sx={{ padding: 2 }}>
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
                    <Typography color='error' variant='h6'>
                        Error loading manga
                    </Typography>
                    <Typography color='text.secondary' sx={{ mt: 1 }}>
                        {error?.message || "Something went wrong"}
                    </Typography>
                </Paper>
            </Container>
        );

    if (mangaList.length === 0)
        return (
            <Container maxWidth='lg' sx={{ padding: 2 }}>
                <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
                    <Typography variant='h6' color='text.secondary'>
                        No manga found
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                        Try adjusting your search filters
                    </Typography>
                </Paper>
            </Container>
        );

    return (
        <Container maxWidth='lg' sx={{ padding: 2 }}>
            <InfiniteScroll
                dataLength={mangaList.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <LatestMangaSkeleton dataLength={3} />
                    </Grid>
                }
                style={{ overflow: "visible" }}>
                <Grid container spacing={2}>
                    {mangaList.map((manga) => (
                        <MangaCard key={manga.id} manga={manga} theme={theme} />
                    ))}
                </Grid>
            </InfiniteScroll>
        </Container>
    );
}
