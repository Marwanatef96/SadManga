/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useHistoryStore = create(
    persist(
        (set, get) => ({
            history: [], // [{ mangaId: string, chapters: [{ id: string, readAt: number }] }]

            // ✅ Add a chapter to a manga's history (always put latest at the top)
            addChapter: (mangaId, chapterId) => {
                const history = get().history;
                const existing = history.find(
                    (item) => item.mangaId === mangaId
                );

                if (existing) {
                    // Avoid duplicates
                    const chapterExists = existing.chapters.some(
                        (ch) => ch.id === chapterId
                    );
                    let updatedChapters;
                    if (!chapterExists) {
                        updatedChapters = [
                            { id: chapterId, readAt: Date.now() },
                            ...existing.chapters,
                        ];
                    } else {
                        // Move chapter to top and update readAt
                        updatedChapters = [
                            { id: chapterId, readAt: Date.now() },
                            ...existing.chapters.filter(
                                (ch) => ch.id !== chapterId
                            ),
                        ];
                    }
                    const updated = {
                        ...existing,
                        chapters: updatedChapters,
                    };

                    // Move this manga to the top
                    set({
                        history: [
                            updated,
                            ...history.filter(
                                (item) => item.mangaId !== mangaId
                            ),
                        ],
                    });
                } else {
                    // Add new manga with first chapter at top
                    set({
                        history: [
                            {
                                mangaId,
                                chapters: [
                                    { id: chapterId, readAt: Date.now() },
                                ],
                            },
                            ...history,
                        ],
                    });
                }
            },

            // ✅ Get all chapters of a manga
            getChapters: (mangaId) => {
                const entry = get().history.find(
                    (item) => item.mangaId === mangaId
                );
                return entry ? entry.chapters : [];
            },
            // inside persist store config
            removeMangaHistory: (mangaId) => {
                set({
                    history: get().history.filter(
                        (item) => item.mangaId !== mangaId
                    ),
                });
            },

            getHistory() {
                return get().history;
            },

            // ✅ Clear history
            clearHistory: () => set({ history: [] }),
        }),
        {
            name: "read-history", // key in localStorage
        }
    )
);

export default useHistoryStore;
