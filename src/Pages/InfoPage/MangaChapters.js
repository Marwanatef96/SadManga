/** @format */
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import ChapterCard from "./ChapterCard";
import ChaptersSkeletonList from "./ChapterSkeleton";
import { useTheme, useMediaQuery } from "@mui/material";

const MangaChapters = ({
    chapters,
    loadAllChapters,
    hasMoreChapters,
    order,
    setOrder,
    goToDetails,
    loading,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Box sx={{ mt: 8 }}>
            <Box
                sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    gap: isMobile ? 2 : 0,
                    alignItems: isMobile ? "flex-start" : "center",
                }}>
                <Typography variant='h4' gutterBottom fontWeight='bold'>
                    📚 Chapters
                </Typography>
                <Box
                    sx={{
                        mt: isMobile ? 1 : 0,
                        mb: 2,
                        display: "flex",
                        gap: 2,
                        background:
                            theme.palette.mode === "dark"
                                ? "linear-gradient(to right, rgba(124,58,237,0.10), rgba(59,130,246,0.10))"
                                : "linear-gradient(to right, rgba(99,102,241,0.10), rgba(37,99,235,0.10))",
                        borderRadius: "12px",
                    }}>
                    <Button
                        size={isMobile ? "small" : "medium"}
                        variant={order === "asc" ? "contained" : "outlined"}
                        onClick={() => setOrder("asc")}
                        sx={{
                            color: "white",
                            bgcolor:
                                order === "asc"
                                    ? theme.palette.primary.main
                                    : "transparent",
                            borderColor: theme.palette.primary.main,
                            "&:hover": {
                                bgcolor:
                                    order === "asc"
                                        ? theme.palette.primary.dark
                                        : theme.palette.action.hover,
                            },
                        }}>
                        Ascending
                    </Button>
                    <Button
                        size={isMobile ? "small" : "medium"}
                        variant={order === "desc" ? "contained" : "outlined"}
                        onClick={() => setOrder("desc")}
                        sx={{
                            color: "white",
                            bgcolor:
                                order === "desc"
                                    ? theme.palette.primary.main
                                    : "transparent",
                            borderColor: theme.palette.primary.main,
                            "&:hover": {
                                bgcolor:
                                    order === "desc"
                                        ? theme.palette.primary.dark
                                        : theme.palette.action.hover,
                            },
                        }}>
                        Descending
                    </Button>
                </Box>
            </Box>

            <InfiniteScroll
                dataLength={chapters.length}
                next={loadAllChapters}
                hasMore={!!hasMoreChapters}
                loader={<ChaptersSkeletonList count={4} />}
                style={{ overflow: "visible" }}>
                {loading ? (
                    <ChaptersSkeletonList count={8} />
                ) : chapters && chapters.length > 0 ? (
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {chapters.map((ch) => (
                            <ChapterCard
                                key={ch.id}
                                ch={ch}
                                goToDetails={goToDetails}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Typography
                        variant='body2'
                        sx={{ color: theme.palette.text.secondary }}>
                        No chapters found.
                    </Typography>
                )}
            </InfiniteScroll>
        </Box>
    );
};

export default MangaChapters;
