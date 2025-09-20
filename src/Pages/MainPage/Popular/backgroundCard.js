/** @format */
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

export default function BgCard({ manga }) {
    const navigate = useNavigate();
    const theme = useTheme();

    function getdetails() {
        navigate(`/info/${manga.id}`);
    }

    return (
        <Card
            sx={{
                zIndex: 300,
                position: "absolute",
                top: { xs: 20, sm: 30, md: 40 }, // responsive vertical spacing
                left: { xs: "50%", sm: 60, md: 80 }, // center on mobile, offset on desktop
                transform: { xs: "translateX(-50%)", sm: "none" }, // center horizontally on mobile
                width: {
                    xs: "90%", // almost full width on phones
                    sm: "80%", // tablets
                    md: 700, // fixed width on desktop
                },
                color: theme.palette.text.primary,
                backgroundColor:
                    theme.palette.mode === "dark"
                        ? "rgba(0,0,0,0.4)"
                        : "rgba(255,255,255,0.4)", // semi-transparent overlay
                backdropFilter: "blur(6px)", // glass effect
                boxShadow:
                    theme.palette.mode === "dark"
                        ? "0 8px 24px rgba(0,0,0,0.3)"
                        : "0 8px 24px rgba(0,0,0,0.1)", // softer shadow
                borderRadius: 3,
            }}>
            <CardContent>
                <Typography
                    variant='h4'
                    component='div'
                    onClick={getdetails}
                    sx={{
                        cursor: "pointer",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                        fontSize: { xs: "1.4rem", sm: "1.6rem", md: "3rem" },
                    }}>
                    {manga.title}
                </Typography>

                <Typography
                    gutterBottom
                    sx={{
                        fontSize: { xs: 16, sm: 20, md: 22 },
                        opacity: 0.9,
                    }}>
                    {manga.latestChapter}
                </Typography>

                <Typography
                    component='div'
                    sx={{
                        mb: 1.5,
                        fontWeight: "bold",
                        opacity: 0.8,
                        display: "flex",
                        flexWrap: "wrap", // wrap chips responsively
                    }}>
                    {manga.categories.map((cat, index) => (
                        <Chip
                            onClick={() => navigate(`/tags?tags=${cat.value}`)}
                            key={index}
                            label={cat.label}
                            variant='outlined'
                            sx={{
                                m: "4px",
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                backgroundColor:
                                    theme.palette.mode === "dark"
                                        ? "rgba(255,255,255,0.08)"
                                        : "rgba(0,0,0,0.08)",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.mode === "dark"
                                            ? "rgba(255,255,255,0.15)"
                                            : "rgba(0,0,0,0.15)",
                                },
                            }}
                        />
                    ))}
                </Typography>

                <CardActions>
                    <Button
                        onClick={getdetails}
                        variant='contained'
                        sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            fontSize: {
                                xs: "0.8rem",
                                sm: "0.9rem",
                                md: "1rem",
                            },
                            px: { xs: 1.5, sm: 2 },
                        }}>
                        Read Now
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
