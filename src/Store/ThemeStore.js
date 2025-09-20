/** @format */

import { create } from "zustand";

const useThemeStore = create((set) => ({
    // Initialize from localStorage, default to dark
    isDark: localStorage.getItem("theme") === "light" ? false : true,

    toggleTheme: () =>
        set((state) => {
            const newTheme = !state.isDark;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            return { isDark: newTheme };
        }),
}));

export default useThemeStore;
