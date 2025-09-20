/** @format */
import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useManga } from "../../../hooks/useManga";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import PopularSkeleton from "./PopularLoader";
import PopularSlider from "./PopularSlider";
import BgCard from "./backgroundCard";
import BgCardSkeleton from "./BgCardSkeleton";
const PopularManga = () => {
    const theme = useTheme();
    const [manga, setManga] = useState(null);
    const [popularList, setPopularList] = useState([]);

    const { data, isLoading, isError, error } = useManga({
        mode: "popular",
        limit: 20,
    });
    function onCardHover(mangaData) {
        setManga(mangaData);
    }
    useEffect(() => {
        setPopularList(Array.isArray(data) ? data : []);
    }, [data]);
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "calc(100vh - 64px)",
                    backgroundImage: `linear-gradient(to right, ${
                        theme.palette.mode === "dark"
                            ? "rgba(0,0,0,0.9), rgba(0,0,0,0.6)"
                            : "rgba(255,255,255,0.9), rgba(255,255,255,0.6)"
                    }), url('${
                        manga?.coverUrl && manga.coverUrl.trim() !== ""
                            ? manga.coverUrl
                            : popularList[0]?.coverUrl ||
                              "https://images6.alphacoders.com/137/thumb-1920-1372163.jpeg"
                    }')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 20%",
                    backgroundRepeat: "no-repeat",
                }}>
                {manga?.coverUrl ? <BgCard manga={manga} /> : null}
                <Container
                    maxWidth='item'
                    sx={{
                        position: "absolute",
                        bottom: "0",
                        zIndex: 1,
                    }}>
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "60px",
                        }}>
                        {isLoading ? (
                            // ------------------- Skeleton Loader -------------------
                            <>
                                <PopularSkeleton />
                                <BgCardSkeleton />
                            </>
                        ) : (
                            <>
                                <Container
                                    maxWidth='item'
                                    sx={{
                                        position: "absolute",
                                        bottom: "0",
                                        zIndex: 1,
                                    }}>
                                    <PopularSlider
                                        popularManga={popularList}
                                        loadingPopular={isLoading}
                                        onCardHover={onCardHover}
                                    />
                                </Container>
                            </>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default PopularManga;
// {
//     popularList.map((manga) => (
//         <Grid
//             size={{ xs: 12, sm: 6, md: 4 }}
//             key={manga.id}>
//             <Card
//                 sx={{
//                     width: "100%",
//                     display: "flex",
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     overflow: "hidden",
//                     backgroundColor:
//                         theme.palette.background.paper,
//                     color: theme.palette.text.primary,
//                     transition:
//                         "transform 0.4s ease, box-shadow 0.4s ease",
//                     zIndex: 1,
//                     "&:hover": {
//                         transform: "scale(1.05)",
//                         boxShadow: `0 12px 30px ${theme.palette.primary.main}`,
//                         zIndex: 10,
//                     },
//                 }}>
//                 <CardMedia
//                     onClick={() =>
//                         handleMangaClick(manga.id)
//                     }
//                     component='img'
//                     image={`${manga.coverUrl}.256.jpg`}
//                     alt={manga.title}
//                     sx={{
//                         cursor: "pointer",
//                         borderRadius: 3,
//                         width: {
//                             xs: "100%",
//                             sm: 180,
//                             md: 200,
//                         },
//                         height: {
//                             xs: 200,
//                             sm: "auto",
//                             md: 250,
//                         },
//                         objectFit: "cover",
//                     }}
//                 />
//                 <CardContent sx={{ p: 1, flex: 1 }}>
//                     <Typography
//                         onClick={() =>
//                             handleMangaClick(manga.id)
//                         }
//                         variant='h6'
//                         gutterBottom
//                         noWrap
//                         sx={{ cursor: "pointer" }}>
//                         {manga.title}
//                     </Typography>
//                     <Box
//                         sx={{
//                             display: "flex",
//                             justifyContent:
//                                 "space-between",
//                         }}>
//                         <Typography variant='body2'>
//                             ⭐{" "}
//                             {manga.rating?.toFixed(1) ??
//                                 "N/A"}
//                         </Typography>
//                         <Typography variant='body2'>
//                             {manga.status}
//                         </Typography>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Grid>
//     ));
// }
