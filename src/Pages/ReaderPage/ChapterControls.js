/** @format */
import React from "react";
import {
    Box,
    Toolbar,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const ChapterControls = ({
    chapters = [],
    chapterData = null,
    mangaTitle = "",
    zoomMode = "fit-width",
    handleZoomChange = () => {},
    handlePrevChapter = () => {},
    handleNextChapter = () => {},
}) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const currentIndex = chapters
        ? chapters.findIndex((ch) => ch.id === chapterData?.id)
        : -1;
    const isFirstChapter = currentIndex === chapters.length - 1;
    const isLastChapter = currentIndex === 0;
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const minimalMode = !chapterData;

    return (
        <Box
            sx={{
                margin: "64px 0 32px 0",
                background:
                    theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, rgba(18,21,27,0.9), rgba(31,41,55,0.8), rgba(55,65,81,0.9))"
                        : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(245,247,251,0.8), rgba(229,231,235,0.9))",
                backdropFilter: "blur(12px)",
                boxShadow:
                    theme.palette.mode === "dark"
                        ? "0 10px 30px rgba(0,0,0,0.6)"
                        : "0 10px 30px rgba(0,0,0,0.2)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                border:
                    theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(0,0,0,0.08)",
            }}>
            {!minimalMode && (
                <Typography
                    variant={isMobile ? "h5" : "h4"}
                    align='center'
                    onClick={() =>
                        navigate(
                            `/info/${
                                chapterData?.relationships?.find(
                                    (rel) => rel.type === "manga"
                                ).id
                            }`
                        )
                    }
                    sx={{
                        cursor: "pointer",
                        color: theme.palette.text.primary,
                        pt: 2,
                        pb: 1,
                        px: 2,
                        textAlign: "center",
                        fontWeight: "700",
                        textShadow:
                            theme.palette.mode === "dark"
                                ? "0 2px 6px rgba(0,0,0,0.6)"
                                : "0 2px 6px rgba(0,0,0,0.3)",
                        transition: "all 0.25s ease",
                    }}>
                    {mangaTitle} -{" "}
                    {chapterData?.attributes.chapter
                        ? `Chapter ${chapterData.attributes.chapter}`
                        : "Oneshot"}
                </Typography>
            )}
            <Toolbar
                sx={{
                    flexDirection: isMobile ? "column" : "row",
                    display: "flex",
                    "& > *": {
                        width: isMobile ? "100%" : "auto",
                    },
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 1,
                    px: 2,
                    py: 2,
                }}>
                <Button
                    variant='contained'
                    onClick={handlePrevChapter}
                    disabled={isFirstChapter}
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: theme.palette.getContrastText(
                            theme.palette.primary.main
                        ),
                        fontWeight: "600",
                        borderRadius: "12px",
                        "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                    }}>
                    Prev Chapter
                </Button>
                {!minimalMode && (
                    <FormControl sx={{ minWidth: 200 }} size='small'>
                        <InputLabel
                            sx={{
                                fontWeight: "600",
                                color: theme.palette.text.primary,
                            }}>
                            Chapter
                        </InputLabel>
                        <Select
                            value={chapterData?.id}
                            label='Chapter'
                            onChange={(e) =>
                                navigate(
                                    `/read/${
                                        chapterData.relationships.find(
                                            (rel) => rel.type === "manga"
                                        ).id
                                    }/${e.target.value}`
                                )
                            }
                            sx={{
                                bgcolor:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.08)",
                                color: theme.palette.text.primary,
                                fontWeight: "500",
                                borderRadius: "12px",
                                backdropFilter: "blur(6px)",
                            }}>
                            {chapters.length > 0 ? (
                                chapters.map((ch) => (
                                    <MenuItem key={ch.id} value={ch.id}>
                                        {ch.attributes.chapter
                                            ? `Chapter ${ch.attributes.chapter}`
                                            : "Oneshot"}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No Chapters</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                )}
                {!minimalMode && handleZoomChange && (
                    <FormControl sx={{ minWidth: 160 }} size='small'>
                        <InputLabel
                            sx={{
                                fontWeight: "600",
                                color: theme.palette.text.primary,
                            }}>
                            Zoom
                        </InputLabel>
                        <Select
                            value={zoomMode}
                            label='Zoom'
                            onChange={handleZoomChange}>
                            <MenuItem value='large'>Large</MenuItem>
                            <MenuItem value='fit-width'>Fit Width</MenuItem>
                            <MenuItem value='medium'>Medium</MenuItem>
                            <MenuItem value='small'>Small</MenuItem>
                        </Select>
                    </FormControl>
                )}
                <Button
                    variant='contained'
                    onClick={handleNextChapter}
                    disabled={isLastChapter}
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: theme.palette.getContrastText(
                            theme.palette.primary.main
                        ),
                        fontWeight: "600",
                        borderRadius: "12px",
                        "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                    }}>
                    Next Chapter
                </Button>
            </Toolbar>
        </Box>
    );
};

export default ChapterControls;
