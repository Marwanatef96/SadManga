/** @format */

import { useMangaInfinite, useMangaList } from "../../../hooks/useManga";
import InfiniteScroll from "react-infinite-scroll-component";
import { format } from "timeago.js";
import { useState, useRef, useEffect } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Paper,
    List,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    useTheme,
    Button,
    useMediaQuery,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MangaCardSkeleton from "./MangaCardSkeleton";
import useMangaStore from "../../../Store/SearchStore";
import DeleteIcon from "@mui/icons-material/Delete";
import { PremiumTooltip } from "../../Tooltip";
export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 700);

    const { addManga, getManga, removeManga } = useMangaStore();

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
    function handleDelete(id) {
        removeManga(id);
    }
    function handleStatusClick(status) {
        navigate(
            `/tags?status=${
                status.charAt(0).toUpperCase() + status.slice(1)
            }&sort=Latest`
        );
        setOpen(false);
        setQuery("");
    }
    function handleNavigate(id) {
        addManga(id);
        navigate(`/info/${id}`);
        setOpen(false);
        setQuery("");
    }
    const { data, refetch, hasNextPage, fetchNextPage, isLoading } =
        useMangaInfinite({
            mode: "title",
            query: debouncedQuery || undefined,
            limit: 10,
            enabled: !!debouncedQuery, // <--- IMPORTANT
        });
    // Optional: trigger refetch when debouncedQuery changes
    useEffect(() => {
        if (debouncedQuery) {
            refetch();
        }
    }, [debouncedQuery, refetch]);
    let results = data?.pages?.flatMap((page) => page.data);

    const historyData = useMangaList(getManga().map((m) => m.id));
    const historyResults = historyData.map((q, i) => ({
        ...q.data,
        addedAt: getManga()[i]?.addedAt,
    }));

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setOpen(false);
                setQuery("");
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const searchWidth = isMobile ? "90vw" : isTablet ? "65vw" : "450px";
    return (
        <Box
            sx={{ position: "relative", display: "inline-block" }}
            ref={searchRef}>
            <PremiumTooltip title='Live Search' animation='connected'>
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{ p: "10px 12px" }}
                    aria-label='open search'>
                    <SearchIcon />
                </IconButton>
            </PremiumTooltip>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key='search-bar'
                        initial={{ width: 50, opacity: 0 }}
                        animate={{ width: searchWidth, opacity: 1 }}
                        exit={{ width: 50, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{ position: "absolute", top: 0, right: 0 }}>
                        <Paper
                            component='form'
                            sx={{
                                p: "2px 4px",
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "12px",
                                width: "100%",
                                boxShadow: 1,
                            }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder='Search…'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                autoFocus
                            />
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        {open && !query && !isLoading && (
                            <>
                                <motion.div
                                    key='results'
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                    }}
                                />
                                <Paper
                                    sx={{
                                        mt: 1,
                                        width: "100%",
                                        borderRadius: 0,
                                        maxHeight: 350,
                                        overflow: "auto",
                                        boxShadow: 2,
                                    }}>
                                    {[...historyResults]
                                        .reverse()
                                        .map((result) => (
                                            <List key={result.id}>
                                                <ResultCard
                                                    result={result}
                                                    theme={theme}
                                                    handleDelete={handleDelete}
                                                    handleNavigate={
                                                        handleNavigate
                                                    }
                                                    handleStatusClick={
                                                        handleStatusClick
                                                    }
                                                    history={true}
                                                    addedAt={result.addedAt}
                                                />
                                            </List>
                                        ))}
                                </Paper>
                            </>
                        )}

                        {/* Results Container */}
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                minHeight: 200, // keeps space fixed
                            }}>
                            <AnimatePresence>
                                {isLoading && (
                                    <motion.div
                                        key='loading'
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            left: 0,
                                            width: "100%",
                                        }}>
                                        <MangaCardSkeleton theme={theme} />
                                    </motion.div>
                                )}

                                {results && (
                                    <motion.div
                                        key='results'
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.2 }}
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                        }}>
                                        <Paper
                                            sx={{
                                                mt: 1,
                                                width: "100%",
                                                borderRadius: 0,
                                                maxHeight: 350,
                                                overflow: "hidden",
                                                boxShadow: 2,
                                            }}>
                                            {results.length > 0 ? (
                                                <InfiniteScroll
                                                    dataLength={results.length}
                                                    next={fetchNextPage}
                                                    hasMore={!!hasNextPage}
                                                    loader={
                                                        <MangaCardSkeleton
                                                            theme={theme}
                                                        />
                                                    }
                                                    height={350}
                                                    scrollableTarget='scrollableDiv'>
                                                    {results.map((result) => (
                                                        <List key={result.id}>
                                                            <ResultCard
                                                                result={result}
                                                                theme={theme}
                                                                handleNavigate={
                                                                    handleNavigate
                                                                }
                                                                handleStatusClick={
                                                                    handleStatusClick
                                                                }
                                                            />
                                                        </List>
                                                    ))}
                                                </InfiniteScroll>
                                            ) : (
                                                <Box
                                                    p={2}
                                                    color='text.secondary'>
                                                    No results found
                                                </Box>
                                            )}
                                        </Paper>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>
        </Box>
    );
}

function ResultCard({
    result,
    theme,
    handleNavigate,
    handleDelete,
    history = false,
    handleStatusClick,
    addedAt,
}) {
    return (
        <Card
            sx={{
                width: "calc(100% - 16px)",
                height: 110,
                margin: "0 8px",
                display: "flex",
                borderRadius: 0,
                boxShadow: 3,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
            }}>
            <CardMedia
                component='img'
                onClick={() => handleNavigate(result.id)}
                src={`${result.coverUrl}.256.jpg`}
                srcSet={` ${result.coverUrl}.256.jpg 256w, ${result.coverUrl}.512.jpg 512w`}
                sizes='(max-width: 600px) 60px, 70px'
                alt={result.title}
                loading='lazy'
                decoding='async'
                sx={{
                    cursor: "pointer",
                    borderRadius: 0,
                    width: 70,
                    height: 110,
                    objectFit: "cover",
                }}
            />
            <CardContent
                sx={{
                    p: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: 1,
                    backgroundColor: "transparent",
                    color: theme.palette.text.primary,
                }}>
                <Typography
                    onClick={() => handleNavigate(result.id)}
                    variant='h6'
                    fontWeight='bold'
                    component='div'
                    gutterBottom
                    sx={{ cursor: "pointer", mr: 2 }}
                    noWrap>
                    {result.titleEN}
                </Typography>
                <Box
                    px={1}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}>
                    <Chip
                        label={`⭐ ${result.rating?.toFixed(1) ?? "N/A"}`}
                        variant='outlined'
                        sx={(t) => ({
                            m: "4px",
                            color: t.palette.text.primary,
                            borderColor: t.palette.divider,
                            backgroundColor:
                                t.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.06)"
                                    : "rgba(0,0,0,0.03)",
                            fontWeight: "bold",
                        })}
                    />

                    <Chip
                        label={result.status}
                        onClick={() => {
                            handleStatusClick(result.status);
                        }}
                        variant='outlined'
                        sx={(t) => ({
                            cursor: "pointer",
                            m: "4px",
                            color: t.palette.text.primary,
                            borderColor: t.palette.divider,
                            backgroundColor:
                                t.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.06)"
                                    : "rgba(0,0,0,0.03)",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor:
                                    t.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.12)"
                                        : "rgba(0,0,0,0.06)",
                            },
                        })}
                    />

                    {history && (
                        <>
                            <Button
                                onClick={() => handleDelete(result.id)}
                                variant='contained'
                                size='small'
                                sx={(t) => ({
                                    m: "4px",
                                    padding: "4px 8px",
                                    borderColor: t.palette.error.light,
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor: t.palette.error.dark,
                                    },
                                })}
                                color='error'
                                startIcon={<DeleteIcon />}>
                                Delete
                            </Button>
                            <Typography
                                variant='contained'
                                sx={(t) => ({
                                    position: "absolute",
                                    top: 92,
                                    right: 15,
                                    padding: "2px 6px",
                                    borderRadius: "8px",
                                    color: t.palette.error.light,
                                    backgroundColor:
                                        t.palette.mode === "dark"
                                            ? "rgba(255,255,255,0.06)"
                                            : "rgba(0,0,0,0.03)",
                                    fontSize: "12px",
                                    borderColor: t.palette.error.light,
                                    fontWeight: "bold",
                                    "&:hover": {
                                        backgroundColor: t.palette.error.dark,
                                    },
                                })}>
                                {addedAt && format(addedAt)}
                            </Typography>
                        </>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
{
    /* // <Chip
                        //     onClick={() => handleDelete(result.id)}
                        //     label={"Delete"}
                        //     variant='outlined'
                        //     sx={{
                        //         m: "4px",
                        //         color: "white",
                        //         borderColor: "primary.light",
                        //         background:
                        //             "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                        //         fontWeight: "bold",
                        //         "&:hover": {
                        //             background:
                        //                 "linear-gradient(145deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                        //         },
                        //     }}
                        // /> */
}
