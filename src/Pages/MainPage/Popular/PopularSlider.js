/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Card, CardMedia, Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

export default function PopularSlider({ popularManga, onCardHover }) {
    const theme = useTheme();
    const navigate = useNavigate();

    function getdetails(id) {
        navigate(`/info/${id}`);
    }
    const swiperRef = useRef(null);

    // refs for nav buttons
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
            swiperRef.current.params.navigation.prevEl = prevRef.current;
            swiperRef.current.params.navigation.nextEl = nextRef.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, []);
    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        const updateHover = () => {
            // slidesPerView can be number or 'auto', make sure it's 1
            if (swiper.params.slidesPerView === 1 && popularManga.length > 0) {
                const activeIndex = swiper.activeIndex || 0;
                const activeManga =
                    popularManga[activeIndex % popularManga.length];
                onCardHover(activeManga);
            }
        };

        // Call on init
        updateHover();

        // Call on slide change
        swiper.on("slideChange", updateHover);

        // Cleanup
        return () => {
            swiper.off("slideChange", updateHover);
        };
    }, [popularManga, onCardHover]);

    return (
        <Box ref={containerRef}>
            <Swiper
                style={{ padding: "40px 0" }}
                modules={[Navigation, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    pauseOnVisibilityChange: true,
                }}
                loop={popularManga.length > 8}
                spaceBetween={20}
                slidesPerView={
                    popularManga.length < 8 ? popularManga.length : 8
                }
                breakpoints={{
                    1: { slidesPerView: 1 },
                    640: { slidesPerView: 3 },
                    960: { slidesPerView: 5 },
                    1280: { slidesPerView: 8 },
                }}>
                {popularManga.map((manga, idx) => (
                    <SwiperSlide key={idx}>
                        <Card
                            onClick={() => getdetails(manga.id)}
                            onMouseEnter={() => onCardHover(manga)}
                            sx={{
                                width: "100%",
                                position: "relative",
                                aspectRatio: "5 / 6",
                                overflow: "hidden",
                                transition:
                                    "transform 0.4s ease, box-shadow 0.4s ease",
                                zIndex: 1,
                                "@media (hover: hover) and (pointer: fine)": {
                                    "&:hover": {
                                        transform: "scale(1.2)",
                                        boxShadow: `0 12px 30px ${
                                            theme.palette.mode === "dark"
                                                ? "rgba(0,0,0,0.5)"
                                                : "rgba(0,0,0,0.2)"
                                        }`,
                                        zIndex: 10,
                                    },

                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-75%",
                                        width: "50%",
                                        height: "100%",
                                        background:
                                            theme.palette.mode === "dark"
                                                ? "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)"
                                                : "linear-gradient(120deg, transparent, rgba(0,0,0,0.2), transparent)",
                                        transform: "skewX(-25deg)",
                                        zIndex: 5,
                                    },
                                    "&:hover::before": {
                                        animation: "shine 0.8s forwards",
                                    },
                                    "@keyframes shine": {
                                        "100%": { left: "125%" },
                                    },
                                },
                            }}>
                            <CardMedia
                                component='img'
                                image={`${manga.coverUrl}.256.jpg`}
                                alt={manga.title}
                                sx={{
                                    cursor: "pointer",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            {/* Overlay */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    width: "100%",
                                    backgroundColor:
                                        theme.palette.mode === "dark"
                                            ? "rgba(0,0,0,0.6)"
                                            : "rgba(255,255,255,0.6)",
                                    color: theme.palette.text.primary,
                                    p: 1.5,
                                }}>
                                <Typography
                                    variant='subtitle1'
                                    fontWeight='bold'
                                    noWrap>
                                    {manga.title}
                                </Typography>
                                <Typography variant='body2' noWrap>
                                    {manga.latestChapter}
                                </Typography>
                            </Box>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <IconButton
                ref={prevRef}
                aria-label='Previous'
                sx={{
                    position: "absolute",
                    top: 0,
                    left: -30,
                    zIndex: 10,
                    width: 60,
                    height: "100%",
                    borderRadius: 0,
                    color: theme.palette.text.primary,
                    display: { xs: "none", sm: "flex" },
                    background: `linear-gradient(to right, ${theme.palette.background.default} 40%,  ${theme.palette.background.paper} 60%, transparent 100%)`,
                    "&:hover": {
                        background: `linear-gradient(to right, ${theme.palette.primary.main} 30%, transparent 100%)`,
                    },
                }}>
                <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
                ref={nextRef}
                aria-label='Next'
                sx={{
                    position: "absolute",
                    top: 0,
                    right: -24,
                    zIndex: 10,
                    width: 60,
                    height: "100%",
                    borderRadius: 0,
                    color: theme.palette.text.primary,
                    display: { xs: "none", sm: "flex" },
                    background: `linear-gradient(to left, ${theme.palette.background.default} 40%, ${theme.palette.background.paper} 60%, transparent 100%)`,
                    "&:hover": {
                        background: `linear-gradient(to left, ${theme.palette.primary.main} 30%,transparent 100%)`,
                    },
                }}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}
