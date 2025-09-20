/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing sidebar state and navigation
 * Provides common sidebar functionality to reduce code duplication
 */
export const useSidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleSidebar = () => setIsOpen(!isOpen);

    const clearSearch = () => setSearchQuery("");

    const navigateAndClose = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return {
        isOpen,
        searchQuery,
        setSearchQuery,
        toggleSidebar,
        clearSearch,
        navigateAndClose,
    };
};

/**
 * Custom hook for filtering manga based on search query
 * @param {Array} mangas - Array of manga objects
 * @param {string} searchQuery - Search query string
 * @returns {Array} Filtered manga array
 */
export const useFilteredMangas = (mangas, searchQuery) => {
    if (!searchQuery.trim()) return mangas;

    return mangas.filter((manga) => {
        const title = manga?.titleEN || manga?.titleJP || manga?.title || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
};
