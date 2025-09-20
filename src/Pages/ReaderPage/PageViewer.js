/** @format */
import React, { useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

const PageViewer = ({ pages, zoomMode }) => {
    const [loadedImages, setLoadedImages] = useState({});
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen <= 600px

    const getZoomStyle = () => {
        if (zoomMode === "fit-width") {
            return isMobile
                ? { width: "100%", height: "auto" } // full width on mobile
                : { width: "80%", height: "auto" }; // 80% on desktop
        } else if (zoomMode === "small") {
            return { width: "50%", height: "auto" };
        } else if (zoomMode === "medium") {
            return { width: "60%", height: "auto" };
        } else if (zoomMode === "large") {
            return { width: "120%", height: "auto" };
        } else {
            return { width: "100%", height: "auto" };
        }
    };

    return pages.map((src, idx) => (
        <Box key={idx} sx={{ display: "flex", justifyContent: "center" }}>
            {!loadedImages[idx] && (
                <Box
                    sx={{
                        ...getZoomStyle(),
                        height: "600px",
                        borderRadius: "12px",
                        background:
                            "linear-gradient(90deg, #2a2a40 25%, #3a3a55 50%, #2a2a40 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s infinite",
                        "@keyframes shimmer": {
                            "0%": { backgroundPosition: "-200% 0" },
                            "100%": { backgroundPosition: "200% 0" },
                        },
                    }}
                />
            )}
            <img
                src={src}
                alt={`Page ${idx + 1}`}
                style={{
                    ...getZoomStyle(),
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: loadedImages[idx] ? 1 : 0,
                    position: loadedImages[idx] ? "relative" : "absolute",
                }}
                onLoad={() =>
                    setLoadedImages((prev) => ({
                        ...prev,
                        [idx]: true,
                    }))
                }
            />
        </Box>
    ));
};

export default PageViewer;
