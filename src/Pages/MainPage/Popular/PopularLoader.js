/** @format */

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { Card, Box, Skeleton } from "@mui/material";

export default function PopularSkeleton() {
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={8}
            loop={true}
            breakpoints={{
                640: { slidesPerView: 3 },
                960: { slidesPerView: 5 },
                1280: { slidesPerView: 8 },
            }}>
            {Array.from(new Array(12)).map((_, idx) => (
                <SwiperSlide key={idx}>
                    <Card sx={{ aspectRatio: "5 / 6" }}>
                        <Skeleton
                            variant='rectangular'
                            width='100%'
                            height='100%'
                            animation='wave'
                        />
                        <Box sx={{ p: 1.5 }}>
                            <Skeleton
                                variant='text'
                                width='80%'
                                animation='wave'
                                sx={{ fontSize: "1rem" }}
                            />
                            <Skeleton
                                variant='text'
                                width='50%'
                                animation='wave'
                                sx={{ fontSize: "0.8rem" }}
                            />
                        </Box>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
