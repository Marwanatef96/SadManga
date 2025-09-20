/** @format */

import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Stack,
    Box,
    Chip,
    IconButton,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import useBookmarkStore from "../../Store/BookmarkStore";

const MangaHeader = ({ mangaData }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const addBookmark = useBookmarkStore((state) => state.addBookmark);
    const removeBookmark = useBookmarkStore((state) => state.removeBookmark);
    const hasBookmark = useBookmarkStore((state) =>
        state.hasBookmark(mangaData?.id)
    );

    const toggleBookmark = () => {
        if (hasBookmark) {
            removeBookmark(mangaData.id);
        } else {
            addBookmark(mangaData.id);
        }
    };

    return (
        <Grid container spacing={5} alignItems='flex-start'>
            {/* Cover */}
            {mangaData?.coverUrl && (
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
                        <img
                            src={mangaData?.coverUrl}
                            alt={mangaData?.titleEN}
                            style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                                background: theme.palette.background.default,
                            }}
                        />
                    </Paper>
                </Grid>
            )}

            {/* Text Info */}
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
                    {/* Title + Bookmark */}
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
                            }}>
                            <Typography
                                fontWeight='bold'
                                gutterBottom
                                sx={{
                                    fontSize: {
                                        xs: "1.5rem",
                                        sm: "2rem",
                                        md: "2.5rem",
                                    },
                                    color: theme.palette.text.primary,
                                }}>
                                {mangaData?.titleEN ||
                                    mangaData?.titleJP ||
                                    "No Title"}
                            </Typography>
                            <IconButton
                                onClick={toggleBookmark}
                                aria-label='bookmark'
                                sx={{
                                    top: 8,
                                    left: 8,
                                    
                                    alignSelf: "flex-start",
                                    color: hasBookmark
                                        ? theme.palette.warning.main
                                        : theme.palette.text.primary,
                                    backgroundColor: hasBookmark
                                        ? theme.palette.mode === "dark"
                                            ? "rgba(251,191,36,0.08)"
                                            : "rgba(251,191,36,0.15)"
                                        : "transparent",
                                }}>
                                {hasBookmark ? (
                                    <Bookmark
                                        sx={{
                                            fontSize: 36,
                                            color: theme.palette.warning.main,
                                        }}
                                    />
                                ) : (
                                    <BookmarkBorder
                                        sx={{
                                            fontSize: 36,
                                            color: theme.palette.text.primary,
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Status + Rating */}
                    <Stack
                        direction='row'
                        spacing={2}
                        alignItems='center'
                        flexWrap='wrap'
                        sx={{ mb: 2 }}>
                        <Chip
                            label={mangaData?.status}
                            onClick={() =>
                                navigate(
                                    `/tags?status=${
                                        mangaData?.status
                                            .charAt(0)
                                            .toUpperCase() +
                                        mangaData?.status.slice(1)
                                    }&sort=Latest`
                                )
                            }
                            sx={{
                                bgcolor: theme.palette.secondary.main,
                                color: theme.palette.getContrastText(
                                    theme.palette.secondary.main
                                ),
                                fontWeight: "bold",
                                borderRadius: "12px",
                            }}
                        />
                        <Chip
                            label={`⭐ ${Number(mangaData?.rating).toFixed(2)}`}
                            sx={{
                                bgcolor: theme.palette.warning.main,
                                color: theme.palette.getContrastText(
                                    theme.palette.warning.main
                                ),
                                fontWeight: "bold",
                                borderRadius: "12px",
                            }}
                        />
                    </Stack>

                    {/* Categories */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant='body1'
                            gutterBottom
                            fontWeight='bold'>
                            Categories:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                            }}>
                            {mangaData?.categories?.length > 0 ? (
                                mangaData.categories.map((cat, i) => (
                                    <Chip
                                        key={i}
                                        label={cat.label}
                                        variant='outlined'
                                        sx={{
                                            color: theme.palette.text.primary,
                                            borderColor:
                                                theme.palette.primary.light,
                                            background:
                                                theme.palette.mode === "dark"
                                                    ? "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
                                                    : "linear-gradient(145deg, rgba(37,99,235,0.08), rgba(99,102,241,0.03))",
                                            fontWeight: "bold",
                                            "&:hover": {
                                                background:
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))"
                                                        : "linear-gradient(145deg, rgba(37,99,235,0.15), rgba(99,102,241,0.08))",
                                            },
                                        }}
                                        onClick={() =>
                                            navigate(`/tags?tags=${cat.value}`)
                                        }
                                    />
                                ))
                            ) : (
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}>
                                    None
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Description */}
                    <Typography
                        variant='body1'
                        sx={{
                            whiteSpace: "pre-line",
                            lineHeight: 1.8,
                            maxHeight: { xs: 150, sm: 200, md: 250 },
                            overflowY: "auto",
                            pr: 1,
                            fontSize: { xs: "0.9rem", sm: "1rem" },
                            color: theme.palette.text.secondary,
                        }}>
                        {mangaData?.description || "No description available."}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default MangaHeader;
