/** @format */
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";

const MangaChapters = ({ chapters, mangaId, theme }) => {
    const navigate = useNavigate();

    const handleChapterClick = (chapterId) =>
        navigate(`/read/${mangaId}/${chapterId}`);

    return (
        <Box
            gap={1}
            sx={{
                display: "flex",
                flexDirection: "column",
                mt: 4,
            }}>
            {chapters.slice(0, 3).map((chapter) => (
                <Button
                    key={chapter.id}
                    variant='outlined'
                    color='accent'
                    onClick={() => handleChapterClick(chapter.id)}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderColor: theme.palette.accent.main,
                        color: theme.palette.accent.main,
                        "&:hover": {
                            backgroundColor: theme.palette.accent.main,
                            color: theme.palette.common.black,
                        },
                    }}>
                    <Typography noWrap variant='caption'>
                        chapter {chapter.number}
                    </Typography>
                    <Typography noWrap sx={{ fontSize: "0.6rem" }}>
                        {format(chapter.updatedAt)}
                    </Typography>
                </Button>
            ))}
        </Box>
    );
};

export default MangaChapters;
