/** @format */
import React from "react";
import { Container, Box, Stack, Typography } from "@mui/material";
import ChapterControls from "./ChapterControls";
import PageViewer from "./PageViewer";
import ScrollToTopFAB from "./ScrollToTopFAB";
import useReaderLogic from "./useReaderLogic";
import { useEffect } from "react";
import useHistoryStore from "../../Store/ReadStore";

function ReaderPage() {
    const {
        pages,
        loading,
        mangaTitle,
        chapters,
        chapterData,
        zoomMode,
        handleZoomChange,
        handlePrevChapter,
        handleNextChapter,
        currentChapterIndex,
    } = useReaderLogic();

    const { addChapter } = useHistoryStore();
    const mangaId = window.location.pathname.split("/")[2];
    const chapterId = window.location.pathname.split("/")[3];

    useEffect(() => {
        addChapter(mangaId, chapterId);
    }, [mangaId, chapterId, addChapter]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #1a1a2e, #0f0f1a)",
            }}>
            <Container maxWidth='lg' sx={{ mt: 4 }}>
                {loading ? (
                    <Typography
                        variant='h4'
                        m={"64px"}
                        p={2}
                        align='center'
                        color='white'>
                        Loading Chapter...
                    </Typography>
                ) : (
                    <Stack>
                        <ChapterControls
                            chapters={chapters}
                            chapterData={chapterData}
                            mangaTitle={mangaTitle}
                            zoomMode={zoomMode}
                            handleZoomChange={handleZoomChange}
                            handlePrevChapter={handlePrevChapter}
                            handleNextChapter={handleNextChapter}
                        />
                        <PageViewer pages={pages} zoomMode={zoomMode} />
                        <ChapterControls
                            chapters={chapters}
                            chapterData={chapterData}
                            mangaTitle={mangaTitle}
                            zoomMode={zoomMode}
                            handlePrevChapter={handlePrevChapter}
                            handleNextChapter={handleNextChapter}
                            minimalMode={true}
                        />
                    </Stack>
                )}
            </Container>
            <ScrollToTopFAB />
        </Box>
    );
}

export default ReaderPage;
