/** @format */

import {
    Drawer,
    Box,
    TextField,
    Card,
    Chip,
    Button,
    ListItem,
    styled,
    alpha,
} from "@mui/material";

// Styled components for shared use across sidebars
export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    "& .MuiDrawer-paper": {
        width: "100%",
        maxWidth: 400,
        boxShadow:
            theme.palette.mode === "dark"
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    },
}));

export const HeaderBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    padding: theme.spacing(4, 3),
    position: "relative",
    overflow: "hidden",
    borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        backgroundRepeat: "repeat",
    },
}));

export const SearchBox = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        background:
            theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.04)",
        borderRadius: theme.shape.borderRadius,
        backdropFilter: "blur(20px)",
        border:
            theme.palette.mode === "dark"
                ? `1px solid ${alpha(theme.palette.common.white, 0.1)}`
                : `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
        transition: "all 0.3s ease",
        "& fieldset": { border: "none" },
        "&:focus-within": {
            background:
                theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(0, 0, 0, 0.06)",
            borderColor: alpha(theme.palette.primary.main, 0.5),
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
        },
    },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none",
        },
        "&:hover fieldset": {
            border: "none",
        },
        "&.Mui-focused fieldset": {
            border: "none",
        },
    },
    "& .MuiInputBase-input": {
        color: theme.palette.text.primary,
        fontWeight: 500,
        "&::placeholder": {
            color:
                theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.5)",
            opacity: 1,
        },
    },
}));

export const MangaCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1),
    borderRadius: 20,
    background:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.04)"
            : "rgba(0, 0, 0, 0.02)",
    border:
        theme.palette.mode === "dark"
            ? `1px solid ${alpha(theme.palette.common.white, 0.1)}`
            : `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "transform 120ms ease, box-shadow 120ms ease",
    cursor: "pointer",
    overflow: "visible",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
        borderColor: alpha(theme.palette.primary.main, 0.5),
    },
}));

export const GradientChip = styled(Chip)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    fontWeight: "bold",
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.4)}`,
}));

export const ChapterButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(135deg, ${alpha(
        theme.palette.primary.main,
        0.2
    )} 0%, ${alpha(theme.palette.secondary.main, 0.2)} 100%)`,
    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    color: theme.palette.text.primary,
    fontSize: "11px",
    fontWeight: "bold",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    textTransform: "none",
    "&:hover": {
        background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.3
        )} 0%, ${alpha(theme.palette.secondary.main, 0.3)} 100%)`,
        transform: "scale(1.05)",
        boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
}));

export const ChapterItem = styled(ListItem)(({ theme }) => ({
    background:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.04)"
            : "rgba(0, 0, 0, 0.02)",
    borderRadius: 12,
    marginBottom: theme.spacing(0.75),
    border:
        theme.palette.mode === "dark"
            ? `1px solid ${alpha(theme.palette.common.white, 0.1)}`
            : `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
    transition: "background-color 120ms ease, transform 120ms ease",
    cursor: "pointer",
    "&:hover": {
        background: alpha(theme.palette.primary.main, 0.12),
        transform: "translateX(2px)",
        borderColor: alpha(theme.palette.primary.main, 0.3),
    },
}));

export const ToggleFab = styled(Button)(({ theme, open }) => ({
    position: "relative",
    zIndex: 1301,
    fontSize: 16,
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