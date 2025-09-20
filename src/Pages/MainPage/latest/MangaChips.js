/** @format */
import React from "react";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MangaChips = ({ manga, theme }) => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
            }}>
            <Chip
                label={`⭐ ${manga.rating?.toFixed(1) ?? "N/A"}`}
                sx={{
                    fontSize: "0.7rem",
                    bgcolor: "secondary.main",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "12px",
                }}
            />
            <Chip
                label={`${manga?.status}`}
                onClick={() => {
                    navigate(
                        `/tags?status=${
                            manga?.status.charAt(0).toUpperCase() +
                            manga?.status.slice(1)
                        }&sort=Latest`
                    );
                }}
                sx={{
                    fontSize: "0.7rem",
                    bgcolor: "secondary.main",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "12px",
                }}
            />
        </div>
    );
};

export default MangaChips;

