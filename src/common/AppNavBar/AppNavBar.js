/** @format */
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    CssBaseline,
    useTheme,
    IconButton,
    useMediaQuery,
    styled,
    alpha,
    Menu,
} from "@mui/material";
import ElevationScroll from "./ElevationScroll";
import SearchBar from "./SearchBar/SearchBar";
import { ReactComponent as LogoIcon } from "../../logos/logo.svg";
import { ReactComponent as TitleIcon } from "../../logos/Title.svg";
import MangaSidebar from "./SideBar/MangaSidebar";
import BookmarkSidebar from "./SideBar/BookmarkSidebar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuIcon from "@mui/icons-material/Menu";
import useThemeStore from "../../Store/ThemeStore";
import { PremiumTooltip } from "../Tooltip";
import { Link } from "react-router-dom";

const ToggleFab = styled(Button)(({ theme, open }) => ({
    position: "relative",
    zIndex: 1301,
    fontSize: 16,
    padding: "6px 9px",
    fontWeight: "bold",
    color: theme.palette.getContrastText(theme.palette.primary.main),
    borderRadius: 30,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
    transition: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    transform: open ? "scale(0) rotate(180deg)" : "scale(1) rotate(0deg)",
    opacity: open ? 0 : 1,
    visibility: open ? "hidden" : "visible",
    "&:hover": {
        transform: open ? "scale(0) rotate(180deg)" : "scale(1.2) rotate(0deg)",
        background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.85
        )} 0%, ${alpha(theme.palette.secondary.main, 0.85)} 100%)`,
    },
}));
export default function AppNavBar({ props }) {
    const { isDark, toggleTheme } = useThemeStore();
    const theme = useTheme();
    const [bgColor, setBgColor] = useState(theme.palette.background.paper);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isVerySmall = useMediaQuery("(max-width:430px)");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    return (
        <div style={{ marginBottom: "64px" }}>
            <CssBaseline />
            <ElevationScroll onBgChange={setBgColor}>
                <AppBar
                    {...props}
                    sx={{
                        backgroundColor: bgColor,
                        color: theme.palette.text.primary,
                        transition: "all 0.3s ease",
                    }}>
                    <Toolbar sx={{ minHeight: "64px" }}>
                        <Button
                            component={Link}
                            to='/Home'
                            style={{
                                cursor: "pointer",
                                position: "relative",
                                marginRight: "16px",
                                backgroundColor: "transparent",
                                textTransform: "none",
                                boxShadow: "none",
                                maxHeight: "60px",
                                padding: "0",
                                gap: "10px",
                            }}>
                            <LogoIcon
                                style={{
                                    height: 60,
                                    width: "auto",
                                    color: bgColor,
                                }}
                            />
                            <TitleIcon
                                style={{
                                    height: 60,
                                    width: "auto",
                                    color: bgColor,
                                }}
                            />
                        </Button>

                        {/* Library Button */}
                        <PremiumTooltip
                            title='Library'
                            animation='connected'
                            disableHoverListener={!isMobile}
                            disableFocusListener={!isMobile}>
                            <ToggleFab
                                component={Link}
                                to='/tags'
                                color='primary'>
                                <LibraryBooksIcon
                                    sx={!isMobile ? { mr: 0.5 } : {}}
                                />
                                {!isMobile && "Library"}
                            </ToggleFab>
                        </PremiumTooltip>

                        {/* Theme Switch */}
                        <PremiumTooltip title='Theme' animation='connected'>
                            <IconButton
                                color='inherit'
                                sx={{ ml: 1.5 }}
                                onClick={toggleTheme}>
                                {isDark ? (
                                    <Brightness7Icon
                                        sx={{ color: "#FFD700" }}
                                    />
                                ) : (
                                    <Brightness4Icon
                                        sx={{ color: "#003668ff" }}
                                    />
                                )}
                            </IconButton>
                        </PremiumTooltip>

                        {/* Very Small Screens → Menu with Sidebars */}
                        {isVerySmall && (
                            <>
                                <IconButton
                                    color='inherit'
                                    onClick={handleMenuOpen}>
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleMenuClose}
                                    sx={{ zIndex: 1 }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 2,
                                            p: 1,
                                        }}>
                                        <MangaSidebar />
                                        <BookmarkSidebar />
                                    </Box>
                                </Menu>
                            </>
                        )}

                        {/* Spacer */}
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Search Bar (not mobile) */}
                        {!isMobile && <SearchBar />}

                        {/* Sidebars + Search on Different Sizes */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                p: 1,
                            }}>
                            {!isVerySmall && (
                                <>
                                    <MangaSidebar />
                                    <BookmarkSidebar />
                                </>
                            )}
                            {isMobile && (
                                <>
                                    <SearchBar />
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    );
}
