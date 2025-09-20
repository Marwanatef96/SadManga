/** @format */

import { format } from "timeago.js";
import { useState } from "react";
import {
    Box,
    Typography,
    InputAdornment,
    IconButton,
    CardContent,
    Avatar,
    Button,
    Collapse,
    List,
    ListItemAvatar,
    ListItemText,
    Backdrop,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Search as SearchIcon,
    Clear as ClearIcon,
    Close as CloseIcon,
    Star as StarIcon,
    AccessTime as AccessTimeIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import useHistoryStore from "../../../Store/ReadStore";
import { useMangaList, useChapterList } from "../../../hooks/useManga";
import { useSidebar, useFilteredMangas } from "./useSidebar";
import {
    StyledDrawer,
    HeaderBox,
    SearchBox,
    MangaCard,
    GradientChip,
    ChapterButton,
    ChapterItem,
    ToggleFab,
} from "./SidebarStyles";
import { PremiumTooltip } from "../../Tooltip";
// Custom hooks
const useHistoryData = (isOpen) => {
    const history = useHistoryStore((state) => state.history);

    const mangaIds = isOpen ? history.map((item) => item.mangaId) : [];
    const chapterIds = isOpen
        ? history.flatMap((item) => item.chapters.map((ch) => ch.id))
        : [];

    const mangaQueries = useMangaList(mangaIds);
    const chapterQueries = useChapterList(chapterIds);

    const mangas = mangaQueries.map((q) => q.data).filter(Boolean);
    const chapters = chapterQueries.map((q) => q.data).filter(Boolean);

    return history.map((item) => {
        const manga = mangas.find((m) => m.id === item.mangaId);
        const chaptersWithReadTime = item.chapters
            .map((chapterObj) => {
                const chapterData = chapters.find(
                    (c) => c.id === chapterObj.id
                );
                return chapterData
                    ? { ...chapterData, readTime: chapterObj.readAt }
                    : null;
            })
            .filter(Boolean);

        const lastRead =
            chaptersWithReadTime.length > 0
                ? Math.max(...chaptersWithReadTime.map((ch) => ch.readTime))
                : null;

        return {
            id: manga?.id || item.mangaId,
            title: manga?.titleEN || manga?.titleJP || "Untitled",
            currentChapter: chaptersWithReadTime.length
                ? `Chapter ${
                      chaptersWithReadTime[0]?.attributes?.chapter || "?"
                  }`
                : null,
            coverImage: manga?.coverUrl || "",
            lastRead,
            rating: manga?.rating || null,
            readChapters: chaptersWithReadTime.map((ch) => ({
                id: ch?.id,
                number: ch?.attributes?.chapter,
                title:
                    ch?.attributes?.title ||
                    `Chapter ${ch?.attributes?.chapter}`,
                readTime: ch?.readTime,
            })),
        };
    });
};

const MangaSidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [expandedManga, setExpandedManga] = useState(null);

    const {
        isOpen,
        searchQuery,
        setSearchQuery,
        toggleSidebar,
        clearSearch,
        navigateAndClose,
    } = useSidebar();

    const removeMangaHistory = useHistoryStore(
        (state) => state.removeMangaHistory
    );
    const historyData = useHistoryData(isOpen);
    const filteredHistory = useFilteredMangas(historyData, searchQuery);

    const toggleChapterMenu = (mangaId) =>
        setExpandedManga(expandedManga === mangaId ? null : mangaId);
    const isVerySmall = useMediaQuery("(max-width:430px)");

    return (
        <>
            <Backdrop
                open={isOpen}
                onClick={toggleSidebar}
                sx={{
                    zIndex: 1200,
                    backgroundColor: (theme) =>
                        theme.palette.background.default + "80",
                }}
            />

            {isMobile ? (
                isVerySmall ? (
                    <ToggleFab
                        gap={1}
                        open={isOpen}
                        onClick={toggleSidebar}
                        color='primary'>
                        <AutoStoriesIcon sx={{ mr: 0.5 }} /> History
                    </ToggleFab>
                ) : (
                    <PremiumTooltip title='Hsitory' animation='connected'>
                        <ToggleFab
                            open={isOpen}
                            onClick={toggleSidebar}
                            color='primary'>
                            <AutoStoriesIcon />
                        </ToggleFab>
                    </PremiumTooltip>
                )
            ) : (
                <ToggleFab
                    gap={1}
                    open={isOpen}
                    onClick={toggleSidebar}
                    color='primary'>
                    <AutoStoriesIcon sx={{ mr: 0.5 }} /> History
                </ToggleFab>
            )}

            <StyledDrawer
                anchor='right'
                open={isOpen}
                onClose={toggleSidebar}
                disableEnforceFocus={true}
                variant='temporary'>
                <HeaderBox>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Box display='flex' alignItems='center' gap={1.5}>
                            <Typography variant='h4'>📜</Typography>
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                color={theme.palette.getContrastText(
                                    theme.palette.primary.main
                                )}>
                                Reading History
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={toggleSidebar}
                            sx={{
                                color: theme.palette.getContrastText(
                                    theme.palette.primary.main
                                ),
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </HeaderBox>

                <Box p={3} pb={2}>
                    <SearchBox
                        fullWidth
                        placeholder='Search your manga...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon
                                        sx={{
                                            color:
                                                theme.palette.mode === "dark"
                                                    ? "rgba(255, 255, 255, 0.6)"
                                                    : "rgba(0, 0, 0, 0.5)",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                <InputAdornment position='end'>
                                    <IconButton onClick={clearSearch}>
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box px={3} pb={2}>
                    <Typography
                        variant='caption'
                        sx={{
                            textTransform: "uppercase",
                            color: theme.palette.text.secondary,
                            fontWeight: 600,
                            letterSpacing: "2px",
                        }}>
                        {filteredHistory.length} Manga Found
                    </Typography>
                </Box>

                <Box flex={1} sx={{ overflow: "auto", px: 2, pb: 3 }}>
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((manga) => (
                            <MangaCard key={manga.id}>
                                <CardContent sx={{ p: 2 }}>
                                    <Box display='flex' gap={2}>
                                        <Avatar
                                            onClick={() =>
                                                navigateAndClose(
                                                    `/info/${manga.id}`
                                                )
                                            }
                                            src={`${manga.coverImage}.256.jpg`}
                                            srcSet={`${manga.coverImage}.256.jpg 256w, ${manga.coverImage}.512.jpg 512w`}
                                            imgProps={{
                                                loading: "lazy",
                                                decoding: "async",
                                                sizes: "80px",
                                            }}
                                            alt={manga.title}
                                            variant='rounded'
                                            sx={{
                                                width: 80,
                                                height: 120,
                                                border: `2px solid ${theme.palette.common.white}E6`,
                                                cursor: "pointer",
                                            }}
                                        />

                                        <Box flex={1} minWidth={0}>
                                            <Typography
                                                onClick={() =>
                                                    navigateAndClose(
                                                        `/info/${manga.id}`
                                                    )
                                                }
                                                variant='body2'
                                                fontWeight='bold'
                                                color={
                                                    theme.palette.text.primary
                                                }
                                                noWrap
                                                sx={{
                                                    fontSize: "14px",
                                                    mb: 0.5,
                                                    cursor: "pointer",
                                                }}>
                                                {manga.title}
                                            </Typography>

                                            <Box
                                                display='flex'
                                                justifyContent='space-between'
                                                alignItems='center'>
                                                <Box>
                                                    <Typography
                                                        variant='caption'
                                                        color={
                                                            theme.palette.text
                                                                .secondary
                                                        }
                                                        display='block'
                                                        mb={1}>
                                                        {manga.currentChapter}
                                                    </Typography>

                                                    <Box
                                                        display='flex'
                                                        alignItems='center'
                                                        gap={0.5}
                                                        mb={1}
                                                        sx={{
                                                            translate: "-6px",
                                                        }}>
                                                        <AccessTimeIcon
                                                            sx={{
                                                                fontSize: 12,
                                                            }}
                                                        />
                                                        <Typography
                                                            variant='caption'
                                                            color={
                                                                theme.palette
                                                                    .text
                                                                    .secondary
                                                            }
                                                            sx={{
                                                                fontSize:
                                                                    "11px",
                                                            }}>
                                                            {format(
                                                                manga.lastRead
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Button
                                                    variant='contained'
                                                    color='error'
                                                    size='small'
                                                    sx={{ translate: "-10px" }}
                                                    onClick={() =>
                                                        removeMangaHistory(
                                                            manga.id
                                                        )
                                                    }>
                                                    Delete
                                                </Button>
                                            </Box>

                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='space-between'>
                                                <Box
                                                    display='flex'
                                                    alignItems='center'
                                                    gap={0.5}>
                                                    <StarIcon
                                                        sx={{
                                                            fontSize: 12,
                                                            color: theme.palette
                                                                .warning.main,
                                                        }}
                                                    />
                                                    <Typography
                                                        variant='caption'
                                                        fontWeight='bold'
                                                        color={
                                                            theme.palette.text
                                                                .primary
                                                        }
                                                        sx={{
                                                            fontSize: "11px",
                                                        }}>
                                                        {manga.rating}
                                                    </Typography>
                                                </Box>

                                                <ChapterButton
                                                    onClick={() =>
                                                        toggleChapterMenu(
                                                            manga.id
                                                        )
                                                    }
                                                    endIcon={
                                                        expandedManga ===
                                                        manga.id ? (
                                                            <ExpandLessIcon
                                                                sx={{
                                                                    fontSize: 16,
                                                                }}
                                                            />
                                                        ) : (
                                                            <ExpandMoreIcon
                                                                sx={{
                                                                    fontSize: 16,
                                                                }}
                                                            />
                                                        )
                                                    }>
                                                    {manga.readChapters.length}{" "}
                                                    chapters
                                                </ChapterButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>

                                <Collapse in={expandedManga === manga.id}>
                                    <Box
                                        sx={{
                                            borderTop:
                                                "1px solid rgba(255, 255, 255, 0.1)",
                                            background: "rgba(0, 0, 0, 0.2)",
                                            backdropFilter: "blur(20px)",
                                            borderBottomLeftRadius: "20px",
                                            borderBottomRightRadius: "20px",
                                            p: 1.5,
                                        }}>
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                fontWeight: "bold",
                                                color: theme.palette.text
                                                    .secondary,
                                                textTransform: "uppercase",
                                                letterSpacing: "1px",
                                                fontSize: "11px",
                                                mb: 1,
                                                display: "block",
                                            }}>
                                            Read Chapters
                                        </Typography>

                                        <List
                                            sx={{
                                                maxHeight: 160,
                                                overflow: "auto",
                                                p: 0,
                                            }}>
                                            {manga.readChapters.map(
                                                (chapter) => (
                                                    <ChapterItem
                                                        key={chapter.number}
                                                        dense
                                                        onClick={() =>
                                                            navigateAndClose(
                                                                `/read/${manga.id}/${chapter.id}`
                                                            )
                                                        }
                                                        sx={{
                                                            maxWidth: "95%",
                                                            overflow: "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                        }}>
                                                        <ListItemAvatar
                                                            sx={{
                                                                minWidth:
                                                                    "auto",
                                                                mr: 2,
                                                            }}>
                                                            <GradientChip
                                                                label={`#${chapter.number}`}
                                                                size='small'
                                                            />
                                                        </ListItemAvatar>

                                                        <ListItemText
                                                            sx={{
                                                                mr: 1,
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                maxWidth: "50%",
                                                            }}
                                                            primary={
                                                                <Typography
                                                                    variant='caption'
                                                                    fontWeight='bold'
                                                                    color={
                                                                        theme
                                                                            .palette
                                                                            .text
                                                                            .primary
                                                                    }
                                                                    noWrap
                                                                    sx={{
                                                                        fontSize:
                                                                            "11px",
                                                                    }}>
                                                                    {
                                                                        chapter.title
                                                                    }
                                                                </Typography>
                                                            }
                                                        />

                                                        <Typography
                                                            variant='caption'
                                                            color={
                                                                theme.palette
                                                                    .text
                                                                    .secondary
                                                            }
                                                            sx={{
                                                                fontSize:
                                                                    "10px",
                                                            }}>
                                                            {format(
                                                                chapter.readTime
                                                            )}
                                                        </Typography>
                                                    </ChapterItem>
                                                )
                                            )}
                                        </List>
                                    </Box>
                                </Collapse>
                            </MangaCard>
                        ))
                    ) : (
                        <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            height={200}
                            color='rgba(255, 255, 255, 0.6)'>
                            <Typography
                                sx={{ fontSize: "48px", mb: 2, opacity: 0.3 }}>
                                📚
                            </Typography>
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                color='white'
                                mb={0.5}>
                                No manga found
                            </Typography>
                            <Typography
                                variant='body2'
                                color='rgba(255, 255, 255, 0.7)'>
                                Try adjusting your search
                            </Typography>
                        </Box>
                    )}
                </Box>
            </StyledDrawer>
        </>
    );
};

export default MangaSidebar;
