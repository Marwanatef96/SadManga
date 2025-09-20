/** @format */
import React, { useEffect } from "react";
import { useScrollTrigger, useTheme } from "@mui/material";

export default function ElevationScroll({ children, onBgChange }) {
    const theme = useTheme();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    const bgColor = trigger
        ? theme.palette.mode === "dark"
            ? theme.palette.background.cool // slightly elevated but cohesive
            : theme.palette.background.cool
        : theme.palette.background.paper;

    // send bgColor to parent if callback exists
    useEffect(() => {
        if (onBgChange) onBgChange(bgColor);
    }, [bgColor, onBgChange]);

    // Ensure children is a valid React element
    if (!React.isValidElement(children)) return null;

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        sx: {
            ...children.props.sx,
            backgroundColor: bgColor,
            color: theme.palette.text.primary,
            transition: "all 0.3s ease",
        },
    });
}
