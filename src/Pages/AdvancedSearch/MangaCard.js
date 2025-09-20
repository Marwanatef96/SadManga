/** @format */

import React from "react";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const MangaCard = React.memo(({ manga, theme }) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card
            component={Link}
            to={`/info/${manga.id}`}
            sx={{
                textDecoration: "none",
                position: "relative",
                width: "100%",
                display: "flex",
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                zIndex: 1,
                cursor: "pointer",
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
                    "@media (hover: hover) and (pointer: fine)": {
                        "&:hover": {
                            transform: "translateY(-8px) scale(1.02)",
                            boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                            zIndex: 10,
                        },
                        "&:hover::before": {
                            left: "125%",
                        },
                    },
                },
            }}>
            <CardMedia
                component='img'
                image={`${manga.coverUrl}.256.jpg`}
                alt={manga.titleEN}
                loading='lazy'
                sx={{
                    borderRadius: 3,
                    width: { xs: "40%", sm: 180, md: 200 },
                    height: { xs: "auto", sm: "auto", md: 250 },
                    objectFit: "cover",
                }}
            />
            <CardContent
                sx={{
                    p: 2,
                    overflow: "hidden",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}>
                <Box>
                    <Typography variant='h6' noWrap sx={{ fontWeight: 600 }}>
                        {manga.titleEN}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            mb: 2,
                        }}>
                        {manga.description || "No description available"}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                        }}>
                        <StarIcon
                            sx={{ color: "warning.main", fontSize: 18 }}
                        />
                        <Typography variant='body2' fontWeight={600}>
                            {manga.rating?.toFixed(1) ?? "N/A"}
                        </Typography>
                    </Box>
                    <Chip
                        label={manga.status}
                        size='small'
                        color={
                            manga.status === "Ongoing"
                                ? "info"
                                : manga.status === "Completed"
                                ? "success"
                                : "default"
                        }
                        sx={{ borderRadius: 2 }}
                    />
                </Box>
            </CardContent>
        </Card>
    </Grid>
));

export default MangaCard;
