/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useMangaStore = create(
    persist(
        (set, get) => ({
            mangas: [], // [{ id, addedAt }, ...]

            // ✅ Add a mangaId with timestamp (no duplicates)
            addManga: (mangaId) => {
                const mangas = get().mangas;
                if (!mangas.some((m) => m.id === mangaId)) {
                    set({
                        mangas: [
                            ...mangas,
                            { id: mangaId, addedAt: Date.now() },
                        ],
                    });
                }
            },
            getManga: () => {
                return get().mangas;
            },

            // ✅ Remove a mangaId
            removeManga: (mangaId) => {
                set({
                    mangas: get().mangas.filter((m) => m.id !== mangaId),
                });
            },

            // ✅ Check if manga exists
            hasManga: (mangaId) => {
                return get().mangas.some((m) => m.id === mangaId);
            },

            // ✅ Clear all mangas
            clearMangas: () => set({ mangas: [] }),
        }),
        {
            name: "search-history", // key in localStorage
        }
    )
);

export default useMangaStore;
