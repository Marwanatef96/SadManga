/** @format */

import React from "react";
import {
    Grid,
    Paper,
    Stack,
    Box,
    IconButton,
    useTheme,
    Skeleton,
} from "@mui/material";
import { BookmarkBorder } from "@mui/icons-material";

const MangaHeaderSkeleton = () => {
    const theme = useTheme();

    return (
        <Grid container spacing={5} alignItems='flex-start'>
            {/* Cover Skeleton */}
            <Grid size={{ xs: 12, md: 4 }}>
                <Paper
                    elevation={8}
                    sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        maxWidth: { xs: "100%", sm: 320, md: 380 },
                        mx: "auto",
                        boxShadow: `0px 8px 30px ${
                            theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.7)"
                                : "rgba(37,99,235,0.15)"
                        }`,
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                    }}>
                    <Skeleton
                        variant='rectangular'
                        width='100%'
                        height={500}
                        sx={{
                            bgcolor:
                                theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.06)",
                        }}
                    />
                </Paper>
            </Grid>

            {/* Text Info Skeleton */}
            <Grid size={{ xs: 12, md: 12, lg: 8 }}>
                <Paper
                    elevation={6}
                    sx={{
                        width: "100%",
                        borderRadius: 3,
                        p: { xs: 2, sm: 3, md: 4 },
                        bgcolor: theme.palette.background.paper,
                        backdropFilter: "blur(12px)",
                        boxShadow: `0px 8px 30px ${
                            theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.4)"
                                : "rgba(37,99,235,0.08)"
                        }`,
                        border: `1px solid ${theme.palette.divider}`,
                    }}>
                    {/* Title + Bookmark Skeleton */}
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            mb: 2,
                            gap: 1,
                        }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                minWidth: "60%",
                                flexDirection: "row",
                                display: "flex",
                                alignItems: "flex-start",
                            }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Skeleton
                                    variant='text'
                                    width='80%'
                                    height={60}
                                    sx={{
                                        fontSize: {
                                            xs: "1.5rem",
                                            sm: "2rem",
                                            md: "2.5rem",
                                        },
                                        bgcolor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(255,255,255,0.08)"
                                                : "rgba(0,0,0,0.08)",
                                    }}
                                />
                            </Box>
                            <IconButton
                                disabled
                                aria-label='bookmark'
                                sx={{
                                    top: 8,
                                    left: 8,
                                    alignSelf: "flex-start",
                                    color: theme.palette.text.disabled,
                                }}>
                                <BookmarkBorder
                                    sx={{
                                        fontSize: 36,
                                        color: theme.palette.text.disabled,
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Status + Rating Skeleton */}
                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                        flexWrap='wrap'
                        sx={{ mb: 2 }}>
                        <Skeleton
                            variant='rounded'
                            width={80}
                            height={32}
                            sx={{
                                borderRadius: "12px",
                                bgcolor:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.08)",
                            }}
                        />
                        <Skeleton
                            variant='rounded'
                            width={60}
                            height={32}
                            sx={{
                                borderRadius: "12px",
                                bgcolor:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.08)",
                            }}
                        />
                    </Stack>

                    {/* Categories Skeleton */}
                    <Box sx={{ mb: 3 }}>
                        <Skeleton
                            variant='text'
                            width={100}
                            height={24}
                            sx={{
                                mb: 1,
                                bgcolor:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.08)",
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                            }}>
                            {/* Multiple category chips skeleton */}
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant='rounded'
                                    width={Math.random() * 40 + 60} // Random widths between 60-100
                                    height={32}
                                    sx={{
                                        borderRadius: "16px",
                                        bgcolor:
                                            theme.palette.mode === "dark"
                                                ? "rgba(255,255,255,0.08)"
                                                : "rgba(0,0,0,0.08)",
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Description Skeleton */}
                    <Box>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant='text'
                                width={index === 5 ? "60%" : "100%"} // Last line shorter
                                height={28}
                                sx={{
                                    mb: 0.5,
                                    bgcolor:
                                        theme.palette.mode === "dark"
                                            ? "rgba(255,255,255,0.06)"
                                            : "rgba(0,0,0,0.06)",
                                }}
                            />
                        ))}
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MangaHeaderSkeleton;
