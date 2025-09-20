/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBookmarkStore = create(
    persist(
        (set, get) => ({
            bookmarks: [], // [{ id, addedAt }, ...]
            
            // ✅ Add manga to bookmarks (no duplicates)
            addBookmark: (mangaId) => {
                const bookmarks = get().bookmarks;
                if (!bookmarks.some((b) => b.id === mangaId)) {
                    set({
                        bookmarks: [
                            ...bookmarks,
                            { id: mangaId, addedAt: Date.now() },
                        ],
                    });
                }
            },

            // ✅ Get all bookmarks
            getBookmarks: () => get().bookmarks,

            // ✅ Remove manga from bookmarks
            removeBookmark: (mangaId) => {
                set({
                    bookmarks: get().bookmarks.filter((b) => b.id !== mangaId),
                });
            },

            // ✅ Check if a manga is bookmarked
            hasBookmark: (mangaId) =>
                get().bookmarks.some((b) => b.id === mangaId),

            // ✅ Clear all bookmarks
            clearBookmarks: () => set({ bookmarks: [] }),
        }),
        {
            name: "manga-bookmarks", // key in localStorage
        }
    )
);

export default useBookmarkStore;
