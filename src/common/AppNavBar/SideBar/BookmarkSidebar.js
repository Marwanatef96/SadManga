/** @format */

import {
    Box,
    Typography,
    InputAdornment,
    IconButton,
    CardContent,
    Avatar,
    Button,
    Backdrop,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Search as SearchIcon,
    Clear as ClearIcon,
    Close as CloseIcon,
    Star as StarIcon,
    Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import BookmarksIcon from "@mui/icons-material/BookmarksOutlined";
import { PremiumTooltip } from "../../Tooltip";
import { useMangaList } from "../../../hooks/useManga";
import useBookmarkStore from "../../../Store/BookmarkStore";
import { useSidebar, useFilteredMangas } from "./useSidebar";
import {
    StyledDrawer,
    HeaderBox,
    SearchBox,
    MangaCard,
    ToggleFab,
} from "./SidebarStyles";

const BookmarkSidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        isOpen,
        searchQuery,
        setSearchQuery,
        toggleSidebar,
        clearSearch,
        navigateAndClose,
    } = useSidebar();

    // Get bookmarks from store
    const bookmarks = useBookmarkStore((state) => state.bookmarks);
    const removeBookmark = useBookmarkStore((state) => state.removeBookmark);

    const mangaIds = isOpen ? bookmarks.map((b) => b.id) : [];

    // Fetch manga info
    const mangaQueries = useMangaList(mangaIds);
    const mangas = mangaQueries.map((q) => q.data).filter(Boolean);

    // Filter by search query using custom hook
    const filteredMangas = useFilteredMangas(mangas, searchQuery);
    const isVerySmall = useMediaQuery("(max-width:430px)");

    return (
        <Box sx={{ left: "0" }}>
            {/* Backdrop */}
            <Backdrop
                open={isOpen}
                onClick={toggleSidebar}
                sx={{
                    zIndex: 1200,
                    backgroundColor: (theme) =>
                        theme.palette.background.default + "80",
                }}
            />

            {/* Toggle Button */}
            {isMobile ? (
                isVerySmall ? (
                    <ToggleFab
                        open={isOpen}
                        onClick={toggleSidebar}
                        color='primary'>
                        <BookmarksIcon sx={{ mr: 0.5 }} /> Bookmarks
                    </ToggleFab>
                ) : (
                    <PremiumTooltip
                        title='Bookmarks'
                        animation='connected'
                    >
                        <ToggleFab
                            open={isOpen}
                            onClick={toggleSidebar}
                            color='primary'>
                            <BookmarksIcon />
                        </ToggleFab>
                    </PremiumTooltip>
                )
            ) : (
                <ToggleFab
                    open={isOpen}
                    onClick={toggleSidebar}
                    color='primary'>
                    <BookmarksIcon sx={{ mr: 0.5 }} /> Bookmarks
                </ToggleFab>
            )}

            {/* Sidebar */}
            <StyledDrawer
                anchor='right'
                open={isOpen}
                onClose={toggleSidebar}
                disableEnforceFocus={true}
                variant='temporary'>
                {/* Header */}
                <HeaderBox>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        position='relative'
                        zIndex={100000}>
                        <Box display='flex' alignItems='center' gap={1.5}>
                            <Typography variant='h4'> 📑 </Typography>
                            <Typography
                                variant='h6'
                                fontWeight='bold'
                                color={theme.palette.getContrastText(
                                    theme.palette.primary.main
                                )}>
                                Bookmarked Mangas
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={toggleSidebar}
                            sx={{
                                color: theme.palette.getContrastText(
                                    theme.palette.primary.main
                                ),
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.common.white + "1F",
                                },
                            }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </HeaderBox>

                {/* Search Bar */}
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

                {/* Results Count */}
                <Box px={3} pb={2}>
                    <Typography
                        variant='caption'
                        sx={{
                            textTransform: "uppercase",
                            color: theme.palette.text.secondary,
                            fontWeight: 600,
                            letterSpacing: "2px",
                        }}>
                        {filteredMangas?.length} Manga Found
                    </Typography>
                </Box>

                {/* Bookmarks List */}
                <Box
                    flex={1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        overflow: "auto",
                        px: 2,
                        pb: 3,
                        "&::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "10px",
                            border: "2px solid transparent",
                            backgroundClip: "content-box",
                        },
                        "&::-webkit-scrollbar-track": {
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "10px",
                        },
                    }}>
                    {filteredMangas?.length > 0 ? (
                        filteredMangas?.map((manga) => (
                            <MangaCard key={manga?.id}>
                                <CardContent sx={{ p: 2 }}>
                                    <Box display='flex' gap={2}>
                                        {/* Cover Image */}
                                        <Avatar
                                            onClick={() =>
                                                navigateAndClose(
                                                    `/info/${manga?.id}`
                                                )
                                            }
                                            src={`${manga?.coverUrl}.256.jpg`}
                                            srcSet={`${manga?.coverUrl}.256.jpg 256w, ${manga?.coverUrl}.512.jpg 512w`}
                                            imgProps={{
                                                loading: "lazy",
                                                decoding: "async",
                                                sizes: "80px",
                                            }}
                                            alt={manga?.titleEN}
                                            variant='rounded'
                                            sx={{
                                                width: 80,
                                                height: 120,
                                                border: `2px solid ${theme.palette.common.white}E6`,
                                                cursor: "pointer",
                                            }}
                                        />

                                        {/* Content */}
                                        <Box flex={1} minWidth={0}>
                                            {/* Title and Bookmark */}
                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                gap={1}
                                                mb={0.5}>
                                                <Typography
                                                    onClick={() =>
                                                        navigateAndClose(
                                                            `/info/${manga?.id}`
                                                        )
                                                    }
                                                    variant='body2'
                                                    fontWeight='bold'
                                                    color={
                                                        theme.palette.text
                                                            .primary
                                                    }
                                                    noWrap
                                                    sx={{
                                                        fontSize: "14px",
                                                        cursor: "pointer",
                                                        flex: 1,
                                                    }}>
                                                    {manga.titleEN ||
                                                        manga.titleJP ||
                                                        "Untitled"}
                                                </Typography>
                                                <BookmarkIcon
                                                    sx={{
                                                        fontSize: 16,
                                                        color: "#ffa726",
                                                    }}
                                                />
                                            </Box>

                                            <Box
                                                display='flex'
                                                alignItems='center'
                                                justifyContent='space-between'
                                                mt={2}>
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
                                                        {manga.rating || "N/A"}
                                                    </Typography>
                                                </Box>

                                                <Button
                                                    size='small'
                                                    variant='contained'
                                                    color='error'
                                                    sx={{
                                                        fontSize: "12px",
                                                        borderRadius: 20,
                                                        textTransform: "none",
                                                        padding: theme.spacing(
                                                            0.5,
                                                            2
                                                        ),
                                                        boxShadow: `0 4px 12px ${theme.palette.error.main}40`,
                                                        "&:hover": {
                                                            boxShadow: `0 6px 20px ${theme.palette.error.main}60`,
                                                        },
                                                    }}
                                                    onClick={() =>
                                                        removeBookmark(manga.id)
                                                    }>
                                                    Remove
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
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
                                sx={{
                                    fontSize: "48px",
                                    mb: 2,
                                    opacity: 0.3,
                                }}>
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
        </Box>
    );
};

export default BookmarkSidebar;
