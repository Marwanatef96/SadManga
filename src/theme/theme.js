/** @format */

// theme.js
import { createTheme } from "@mui/material/styles";

// Font Variables - Import these fonts in your index.html or index.css
// @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap');

// Shared tokens used across both modes
const common = {
    shape: { borderRadius: 14 },
    typography: {
        // Primary font for body text, buttons, UI elements
        fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',

        // Headings use Space Grotesk for modern, tech-savvy look
        h1: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
        },
        h2: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
        },
        h3: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
        },
        h4: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h6: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 600,
            lineHeight: 1.4,
        },

        // Body text uses Inter for excellent readability
        body1: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            lineHeight: 1.5,
            fontSize: "0.875rem",
        },

        // UI elements
        button: {
            fontFamily: '"Inter", sans-serif',
            textTransform: "none",
            fontWeight: 600,
            letterSpacing: "0.01em",
        },
        caption: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            lineHeight: 1.4,
        },
        overline: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
        },
        subtitle1: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            lineHeight: 1.4,
        },
    },
    components: {
        // Global font smoothing and optimization
        MuiCssBaseline: {
            styleOverrides: {
                html: {
                    fontFamily: '"Inter", sans-serif',
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                    textRendering: "optimizeLegibility",
                },
                body: {
                    scrollbarWidth: "thin",
                    fontFamily: '"Inter", sans-serif',
                },
                "*::-webkit-scrollbar": { width: 8, height: 8 },
                "*::-webkit-scrollbar-track": { background: "transparent" },
                // Headings will inherit from typography settings above
                "h1, h2, h3, h4, h5, h6": {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: { minHeight: 64 },
            },
        },
        MuiButtonBase: {
            defaultProps: { disableRipple: true },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    transition: "all .2s ease",
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                },
                contained: { boxShadow: "0 6px 18px rgba(0,0,0,.2)" },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: { borderRadius: 10, transition: "all .2s ease" },
            },
        },
        MuiPaper: {
            styleOverrides: { root: { borderRadius: 16 } },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    overflow: "hidden",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    fontFamily: '"Inter", sans-serif',
                },
                outlined: { borderWidth: 1.5 },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: { borderRadius: 12 },
                input: {
                    paddingTop: 12,
                    paddingBottom: 12,
                    fontFamily: '"Inter", sans-serif',
                },
            },
        },
        MuiListItem: {
            styleOverrides: { root: { borderRadius: 10 } },
        },
        MuiSkeleton: {
            styleOverrides: { root: { borderRadius: 12 } },
        },
        // Typography components
        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
                h2: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
                h3: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
                h4: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
                h5: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
                h6: {
                    fontFamily: '"Space Grotesk", "Inter", sans-serif',
                },
            },
        },
    },
};

// 🌙 Dark Theme
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#7C3AED" }, // violet
        secondary: { main: "#F97316" }, // orange
        accent: { main: "#3B82F6" },
        success: { main: "#22C55E" },
        warning: { main: "#F59E0B" },
        error: { main: "#EF4444" },
        info: { main: "#06B6D4" },
        background: {
            default: "#0B0F14",
            paper: "#12151B",
            cool: "#141e34ff",
        },
        text: {
            primary: "#E5E7EB",
            secondary: "#A1A1AA",
        },
        divider: "#27272A",
    },
    ...common,
    typography: {
        ...common.typography,
        body1: {
            ...common.typography.body1,
            color: "#E5E7EB",
        },
        body2: {
            ...common.typography.body2,
            color: "#A1A1AA",
        },
    },
    components: {
        ...common.components,
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    backgroundImage: "none",
                    backgroundColor: "rgba(18,21,27,0.9)",
                    backdropFilter: "blur(8px)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(18,21,27,0.9)",
                    border: "1px solid rgba(255,255,255,0.06)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(18,21,27,0.95)",
                    border: "1px solid rgba(255,255,255,0.06)",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#E5E7EB",
                    "&:hover": {
                        backgroundColor: "rgba(124, 58, 237, 0.15)",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    fontFamily: '"Inter", sans-serif',
                },
                containedPrimary: {
                    background: "linear-gradient(135deg,#3B82F6,#7C3AED)",
                },
                outlined: {
                    borderColor: "#2F3341",
                    color: "#E5E7EB",
                    "&:hover": { borderColor: "#7C3AED" },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { color: "#E5E7EB" },
                outlined: { borderColor: "#2F3341" },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(255,255,255,0.04)",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#7C3AED",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#3B82F6",
                    },
                },
                notchedOutline: { borderColor: "#2F3341" },
                input: { color: "#E5E7EB" },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background:
                        "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.98) 50%, rgba(55,65,81,0.95) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    "&:hover": { backgroundColor: "rgba(124,58,237,0.1)" },
                },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(90deg,#111418,#1a1f27)",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                ...common.components.MuiCssBaseline.styleOverrides,
                "*::-webkit-scrollbar-thumb": {
                    background: "linear-gradient(180deg, #3B82F6, #7C3AED)",
                    borderRadius: 999,
                },
            },
        },
    },
});

// ☀️ Light Theme
export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#2563EB" }, // cool blue
        secondary: { main: "#6366F1" }, // indigo
        accent: { main: "#06B6D4" }, // cyan
        success: { main: "#16A34A" },
        warning: { main: "#D97706" },
        error: { main: "#DC2626" },
        info: { main: "#06B6D4" },
        background: {
            default: "#F5F7FB", // cooler light background
            paper: "#FFFFFF",
            cool: "#d7d9dbff",
        },
        text: {
            primary: "#111827",
            secondary: "#3F4555", // slightly cooler gray
        },
        divider: "#E6EAF2",
    },
    ...common,
    typography: {
        ...common.typography,
        body1: {
            ...common.typography.body1,
            color: "#111827",
        },
        body2: {
            ...common.typography.body2,
            color: "#374151",
        },
    },
    components: {
        ...common.components,
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    backgroundImage: "none",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(8px)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.05)",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(0,0,0,0.05)",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: "#374151",
                    "&:hover": {
                        backgroundColor: "rgba(37,99,235,0.08)", // cool blue hover
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                    fontFamily: '"Inter", sans-serif',
                },
                containedPrimary: {
                    background: "linear-gradient(135deg,#60A5FA,#06B6D4)", // blue -> cyan
                },
                outlined: {
                    borderColor: "#CBD5E1",
                    color: "#111827",
                    "&:hover": { borderColor: "#06B6D4" },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                outlined: { borderColor: "#CBD5E1" },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F1F5FB",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#60A5FA",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#06B6D4",
                    },
                },
                notchedOutline: { borderColor: "#E5E7EB" },
                input: { color: "#111827" },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#FFFFFF",
                    borderLeft: "1px solid rgba(0,0,0,0.06)",
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: { "&:hover": { backgroundColor: "#F3F4F6" } },
            },
        },
        MuiSkeleton: {
            styleOverrides: {
                root: {
                    background: "linear-gradient(90deg,#F3F4F6,#E5E7EB)",
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                ...common.components.MuiCssBaseline.styleOverrides,
                "*::-webkit-scrollbar-thumb": {
                    background: "linear-gradient(180deg, #60A5FA, #06B6D4)",
                    borderRadius: 999,
                },
            },
        },
    },
});
