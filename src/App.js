/** @format */

import { Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { darkTheme, lightTheme } from "./theme/theme";
import {
    CssBaseline,
    ThemeProvider,
    CircularProgress,
    Box,
} from "@mui/material";
import AppNavBar from "./common/AppNavBar/AppNavBar";
import FloatingCreatorButton from "./common/Appfooter/MangaFooter";
import useThemeStore from "./Store/ThemeStore";
import ScrollToTop from "./common/ScrollToTop";
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));
const HomePage = lazy(() => import("./Pages/MainPage/HomePage"));
const InfoPage = lazy(() => import("./Pages/InfoPage/InfoPage"));
const AdvancedSearch = lazy(() =>
    import("./Pages/AdvancedSearch/AdvancedSearch")
);
const ReaderPage = lazy(() => import("./Pages/ReaderPage/ReaderPage"));
function App() {
    const { isDark } = useThemeStore();

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <CssBaseline />
            <AppNavBar />
            <ScrollToTop />
            <Suspense
                fallback={
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}>
                        <CircularProgress />
                    </Box>
                }>
                <Routes>
                    {/* Routes with FloatingCreatorButton */}
                    <Route element={<DefaultLayout />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/Home' element={<HomePage />} />
                        <Route path='/comics' element={<HomePage />} />
                        <Route path='/tags' element={<AdvancedSearch />} />
                        <Route path='/info/:id' element={<InfoPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>

                    {/* Routes without FloatingCreatorButton */}
                    <Route element={<ReaderLayout />}>
                        <Route
                            path='/read/:mangaId/:id'
                            element={<ReaderPage />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;

function DefaultLayout() {
    return (
        <>
            <AppNavBar />
            <ScrollToTop />
            <Outlet />
            <FloatingCreatorButton /> {/* always visible here */}
        </>
    );
}

function ReaderLayout() {
    return (
        <>
            <AppNavBar />
            <ScrollToTop />
            <Outlet /> {/* no button here */}
        </>
    );
}
