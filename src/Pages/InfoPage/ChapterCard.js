/** @format */
import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Stack,
    Typography,
    Avatar,
    Box,
    Chip,
    useTheme,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TranslateIcon from "@mui/icons-material/Translate";
import { format } from "timeago.js";
import useHistoryStore from "../../Store/ReadStore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ChapterCard = ({ ch, goToDetails }) => {
    const theme = useTheme();
    const history = useHistoryStore((state) => state.history);

    // ✅ Check if this chapter is read
    const hasRead = history.some((m) => m.chapters.some((c) => c.id === ch.id));
    return (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={ch.id}>
            <Card
                onClick={() => goToDetails(ch.id)}
                sx={{
                    cursor: "pointer",
                    height: "100%",
                    borderRadius: "20px",
                    bgcolor: hasRead
                        ? theme.palette.mode === "dark"
                            ? theme.palette.success.light + "22" // subtle green tint if read
                            : theme.palette.success.light + "11"
                        : theme.palette.background.paper,
                    backdropFilter: "blur(12px)",
                    transition: "0.3s",
                    display: "flex",
                    boxShadow: `0px 2px 10px ${
                        theme.palette.mode === "dark"
                            ? "rgba(0,0,0,0.4)"
                            : "rgba(37,99,235,0.08)"
                    }`,
                    "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: `0px 8px 25px ${
                            theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.4)"
                                : "rgba(37,99,235,0.18)"
                        }`,
                        bgcolor: hasRead
                            ? theme.palette.mode === "dark"
                                ? theme.palette.success.light + "44"
                                : theme.palette.success.light + "22"
                            : theme.palette.mode === "dark"
                            ? theme.palette.action.hover
                            : "#f9f9f991",
                        color: "#fff",
                    },
                    border: hasRead
                        ? `1.5px solid ${theme.palette.success.main}`
                        : `1px solid ${theme.palette.divider}`,
                }}>
                <CardActionArea sx={{ p: 2 }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}>
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <Avatar
                                sx={{
                                    bgcolor: hasRead
                                        ? theme.palette.success.main
                                        : theme.palette.primary.main,
                                    width: 48,
                                    height: 48,
                                    color: theme.palette.getContrastText(
                                        hasRead
                                            ? theme.palette.success.main
                                            : theme.palette.primary.main
                                    ),
                                }}>
                                {hasRead ? (
                                    <CheckCircleIcon />
                                ) : (
                                    <MenuBookIcon />
                                )}
                            </Avatar>
                            <Box sx={{ flexGrow: 1, maxWidth: "70%" }}>
                                <Typography
                                    variant='h6'
                                    noWrap
                                    sx={{
                                        textDecoration: hasRead
                                            ? "line-through"
                                            : "none", // ✅ strike-through if read
                                        color: theme.palette.text.primary,
                                    }}>
                                    {ch.attributes.chapter
                                        ? `Chapter ${ch.attributes.chapter}`
                                        : "Oneshot"}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    noWrap
                                    sx={{
                                        width: "100%",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        color: theme.palette.text.secondary,
                                    }}>
                                    {ch.attributes.title || "Untitled"}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                            sx={{ mt: 1, justifyContent: "space-around" }}>
                            <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'>
                                <AccessTimeIcon fontSize='small' />
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}>
                                    {format(ch.attributes.readableAt)}
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'>
                                <TranslateIcon fontSize='small' />
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}>
                                    EN
                                </Typography>
                            </Stack>
                            {hasRead && (
                                <Chip
                                    size='small'
                                    color='success'
                                    label='Read'
                                    sx={{
                                        fontWeight: "bold",
                                        bgcolor: theme.palette.success.main,
                                        color: theme.palette.getContrastText(
                                            theme.palette.success.main
                                        ),
                                    }}
                                />
                            )}
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default ChapterCard;
