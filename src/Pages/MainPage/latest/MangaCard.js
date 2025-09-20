/** @format */

import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Grid,
} from "@mui/material";
import MangaChapters from "./MangaChapters";
import MangaChips from "./MangaChips";
import { useNavigate } from "react-router-dom";
const MangaCard = React.memo(({ manga, theme }) => {
    const navigate = useNavigate();
    const handleMangaClick = (id) => { navigate(`/info/${id}`) };

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ minWidth: 0 }}>
            <Card
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "262px",
                    display: "flex",
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    zIndex: 1,
                    "@media (hover: hover) and (pointer: fine)": {
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: "-75%",
                            width: "50%",
                            height: "100%",
                            background:
                                theme.palette.mode === "dark"
                                    ? "linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent)"
                                    : "linear-gradient(120deg, transparent, rgba(0,0,0,0.2), transparent)",
                            transform: "skewX(-25deg)",
                            transition: "left 0.8s ease",
                            zIndex: 5,
                        },
                        "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                            zIndex: 10,
                        },
                        "&:hover::before": {
                            left: "125%",
                        },
                    },
                }}>
                <CardMedia
                    onClick={() => handleMangaClick(manga.id)}
                    component='img'
                    image={`${manga.coverUrl}.256.jpg`}
                    alt={manga.title}
                    sx={{
                        cursor: "pointer",
                        borderRadius: 3,
                        width: { xs: "40%", sm: 180, md: 200 },
                        height: { xs: "auto", sm: "auto", md: 250 },
                        objectFit: "cover",
                    }}
                />
                <CardContent
                    sx={{
                        p: 1,
                        overflow: "hidden",
                        flex: 1,
                        backgroundColor: "transparent",
                        color: theme.palette.text.primary,
                    }}>
                    <Box p={1}>
                        <Typography
                            onClick={() => handleMangaClick(manga.id)}
                            sx={{
                                cursor: "pointer",
                                color: theme.palette.text.primary,
                            }}
                            variant='h6'
                            component='div'
                            gutterBottom
                            noWrap>
                            {manga.title}
                        </Typography>
                        <MangaChips manga={manga} theme={theme} />
                    </Box>
                    <MangaChapters
                        chapters={manga.chapters}
                        mangaId={manga.id}
                        theme={theme}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
});

export default MangaCard;
