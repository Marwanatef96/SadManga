/** @format */

import React, { useState } from "react";
import {
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Typography,
    Box,
    Chip,
    Link,
    Slide,
    useTheme,
    alpha,
    useMediaQuery,
} from "@mui/material";
import {
    Person,
    Close,
    GitHub,
    LinkedIn,
    Twitter,
    Email,
    Code,
    Palette,
} from "@mui/icons-material";
import { PremiumTooltip } from "../Tooltip";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const FloatingCreatorButton = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const socialLinks = [
        {
            icon: <GitHub />,
            url: "https://github.com/Marwanatef96",
            label: "GitHub",
        },
        {
            icon: <LinkedIn />,
            url: "https://www.linkedin.com/in/marwan-atef-dev/",
            label: "LinkedIn",
        },
        {
            icon: <Twitter />,
            url: "https://x.com/MarwanAtef10",
            label: "Twitter",
        },
        {
            icon: <Email />,
            url: "mailto:marwanatef54@gmail.com",
            label: "Email",
        },
    ];

    const skills = [
        "React 19",
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
        "Zustand",
        "React Query",
        "Vite",
        "Figma",
        "Three.js",
        "WebGL",
        "PWA",
        "Redux ToolKit",
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <>
            {/* Floating Action Button */}
            <PremiumTooltip
                title='Meet the Creator'
                animation='connected'
                placement='left'>
                <Fab
                    color='primary'
                    onClick={handleOpen}
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        background: "linear-gradient(135deg, #7C3AED, #3B82F6)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #6D28D9, #2563EB)",
                            transform: "scale(1.05)",
                        },
                        boxShadow: "0 8px 25px rgba(124, 58, 237, 0.4)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        zIndex: 1000,
                    }}>
                    <Person />
                </Fab>
            </PremiumTooltip>
            {/* Creator Info Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                maxWidth='sm'
                fullWidth
                PaperProps={{
                    sx: {
                        background:
                            theme.palette.mode === "dark"
                                ? "linear-gradient(135deg, rgba(18,21,27,0.98) 0%, rgba(30,35,45,0.95) 100%)"
                                : "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(245,247,251,0.95) 100%)",
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${alpha(
                            theme.palette.divider,
                            0.1
                        )}`,
                        borderRadius: 3,
                        overflow: "hidden",
                    },
                }}>
                {/* Header */}
                <DialogTitle
                    sx={{
                        background:
                            theme.palette.mode === "dark"
                                ? "linear-gradient(90deg, transparent, #7C3AED, #3B82F6, transparent)"
                                : "linear-gradient(90deg, transparent, #2563EB, #06B6D4, transparent)",
                        backgroundSize: "100% 1px",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top",
                        paddingTop: 3,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Code color='primary' />
                        <Typography variant='h5' fontWeight={700}>
                            Creator
                        </Typography>
                    </Box>
                    <IconButton onClick={handleClose} size='small'>
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 3 }}>
                    {/* Creator Info */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant='h6' fontWeight={600} gutterBottom>
                            Marwan Atef
                        </Typography>
                        <Typography
                            variant='body1'
                            color='text.secondary'
                            sx={{ mb: 2 }}>
                            Front-end developer passionate about crafting
                            beautiful, immersive manga reading experiences.
                            Creating pixel-perfect interfaces and smooth user
                            interactions, one component at a time.
                        </Typography>
                    </Box>

                    {/* Skills */}
                    <Box sx={{ mb: 3 }}>
                        <Typography
                            variant='subtitle1'
                            fontWeight={600}
                            sx={{
                                mb: 1.5,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}>
                            <Palette color='secondary' fontSize='small' />
                            Tech Stack
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {skills.map((skill, index) => (
                                <Chip
                                    key={index}
                                    label={skill}
                                    size='small'
                                    variant='outlined'
                                    sx={{
                                        fontWeight: 600,
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            borderColor: "primary.main",
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            transform: "translateY(-1px)",
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Social Links */}
                    <Box sx={{ mb: isMobile ? 1 : 3 }}>
                        <Typography
                            variant='subtitle1'
                            fontWeight={600}
                            sx={{ mb: 1.5 }}>
                            Connect with me
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                            {socialLinks.map((social, index) => (
                                <IconButton
                                    key={index}
                                    component={Link}
                                    href={social.url}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={social.label}
                                    sx={{
                                        border: `1px solid ${alpha(
                                            theme.palette.divider,
                                            0.3
                                        )}`,
                                        borderRadius: 2,
                                        transition:
                                            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            color: "primary.main",
                                            borderColor: "primary.main",
                                            backgroundColor: alpha(
                                                theme.palette.primary.main,
                                                0.1
                                            ),
                                            transform:
                                                "translateY(-2px) scale(1.05)",
                                        },
                                    }}>
                                    {social.icon}
                                </IconButton>
                            ))}
                        </Box>
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            textAlign: "center",
                            mt: isMobile ? 1 : 3,
                            pt: 2,
                            borderTop: `1px solid ${alpha(
                                theme.palette.divider,
                                0.3
                            )}`,
                        }}>
                        <Typography variant='body2' color='text.secondary'>
                            © 2025 SAD MANGA • Project made with ❤️ to
                            showcase my skills
                        </Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FloatingCreatorButton;
