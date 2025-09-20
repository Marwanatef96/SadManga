/** @format */
import React from "react";
import { Fab, Slide, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopFAB = () => {
    const trigger = useScrollTrigger({ threshold: 200 });
    return (
        <Slide direction='up' in={trigger} mountOnEnter unmountOnExit>
            <Fab
                color='primary'
                size='medium'
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                    position: "fixed",
                    bottom: 24,
                    right: 24,
                    background: "linear-gradient(135deg,#ff6ec4,#7873f5)",
                    "&:hover": {
                        background: "linear-gradient(135deg,#ff4db0,#5f5fff)",
                    },
                }}>
                <KeyboardArrowUpIcon />
            </Fab>
        </Slide>
    );
};

export default ScrollToTopFAB;
