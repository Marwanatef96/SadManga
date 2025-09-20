/** @format */

// components/ModernTooltip/ModernTooltip.jsx
import React from "react";
import {
    Tooltip,
    tooltipClasses,
    styled,
    Zoom,
    Fade,
    Grow,
    alpha,
} from "@mui/material";

// Enhanced Tooltip with modern styling
const StyledTooltip = styled(({ className, variant = "default", ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, variant }) => {
    const getVariantStyles = () => {
        switch (variant) {
            case "premium":
                return {
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, rgba(124, 58, 237, 0.95), rgba(59, 130, 246, 0.95))"
                            : "linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(6, 182, 212, 0.95))",
                    border: `1px solid ${
                        theme.palette.mode === "dark"
                            ? "rgba(124, 58, 237, 0.3)"
                            : "rgba(37, 99, 235, 0.3)"
                    }`,
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)"
                            : "0 8px 32px rgba(37, 99, 235, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.8)",
                };
            case "success":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.success.main,
                        0.95
                    )}, ${alpha(
                        theme.palette.success.light || "#4ADE80",
                        0.95
                    )})`,
                    border: `1px solid ${alpha(
                        theme.palette.success.main,
                        0.3
                    )}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.success.main,
                        0.4
                    )}`,
                };
            case "warning":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.warning.main,
                        0.95
                    )}, ${alpha(
                        theme.palette.warning.light || "#FCD34D",
                        0.95
                    )})`,
                    border: `1px solid ${alpha(
                        theme.palette.warning.main,
                        0.3
                    )}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.warning.main,
                        0.4
                    )}`,
                };
            case "error":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.error.main,
                        0.95
                    )}, ${alpha(
                        theme.palette.error.light || "#F87171",
                        0.95
                    )})`,
                    border: `1px solid ${alpha(theme.palette.error.main, 0.3)}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.error.main,
                        0.4
                    )}`,
                };
            case "info":
                return {
                    background: `linear-gradient(135deg, ${alpha(
                        theme.palette.info.main,
                        0.95
                    )}, ${alpha(theme.palette.info.light || "#38BDF8", 0.95)})`,
                    border: `1px solid ${alpha(theme.palette.info.main, 0.3)}`,
                    boxShadow: `0 8px 32px ${alpha(
                        theme.palette.info.main,
                        0.4
                    )}`,
                };
            case "glass":
                return {
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(18, 21, 27, 0.95)"
                            : "rgba(255, 255, 255, 0.95)",
                    border:
                        theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.1)"
                            : "1px solid rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                            : "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                };
            default:
                return {
                    background:
                        theme.palette.mode === "dark"
                            ? "rgba(18, 21, 27, 0.98)"
                            : "rgba(255, 255, 255, 0.98)",
                    border:
                        theme.palette.mode === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.06)"
                            : "1px solid rgba(0, 0, 0, 0.06)",
                    boxShadow:
                        theme.palette.mode === "dark"
                            ? "0 8px 25px rgba(0, 0, 0, 0.4)"
                            : "0 8px 25px rgba(0, 0, 0, 0.15)",
                };
        }
    };

    return {
        [`& .${tooltipClasses.tooltip}`]: {
            ...getVariantStyles(),
            backdropFilter: variant !== "glass" ? "blur(12px)" : "blur(20px)",
            borderRadius: 12,
            padding: "12px 16px",
            fontSize: "0.875rem",
            fontWeight: 500,
            fontFamily: '"Inter", sans-serif',
            lineHeight: 1.4,
            letterSpacing: "0.01em",
            color:
                theme.palette.mode === "dark"
                    ? "#FFFFFF"
                    : ["warning", "info"].includes(variant)
                    ? "#FFFFFF"
                    : "#1F2937",
            maxWidth: 280,
            wordWrap: "break-word",
            position: "relative",
            overflow: "hidden",

            // Connected animation - grows from the trigger element
            transformOrigin: "center bottom",
            transform: "scale(0.8) translateY(8px)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",

            // When tooltip appears, it scales and moves to final position
            "&.MuiTooltip-tooltip": {
                transform: "scale(1) translateY(0)",
            },

            // Subtle glow animation
            animation:
                variant === "premium"
                    ? "tooltipGlow 2s ease-in-out infinite alternate"
                    : "none",

            // Connection line effect
            "&::before": {
                content: '""',
                position: "absolute",
                bottom: variant === "glass" ? -1 : -2,
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "8px",
                background:
                    variant === "glass"
                        ? theme.palette.mode === "dark"
                            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent)"
                            : "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent)"
                        : getVariantStyles().background,
                borderRadius: "1px",
                opacity: 0,
                animation: "connectionLine 0.3s ease-out 0.1s forwards",
            },

            // Glassmorphism effect enhancement
            ...(variant === "glass" && {
                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background:
                        theme.palette.mode === "dark"
                            ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)"
                            : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)",
                },
            }),

            // Premium variant sparkle effect
            ...(variant === "premium" && {
                "&:after": {
                    content: '""',
                    position: "absolute",
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background:
                        "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
                    borderRadius: 12,
                    opacity: 0,
                    animation: "sparkle 3s ease-in-out infinite",
                    pointerEvents: "none",
                },
            }),
        },

        [`& .${tooltipClasses.arrow}`]: {
            color: "transparent",
            "&::before": {
                background: getVariantStyles().background,
                border: getVariantStyles().border,
                borderRadius: "3px",
                boxShadow: getVariantStyles().boxShadow,
                transform: "rotate(45deg)",
            },
            // Enhanced arrow with connection effect
            "&::after": {
                content: '""',
                position: "absolute",
                width: "3px",
                height: "12px",
                background: getVariantStyles().background,
                left: "50%",
                top: "100%",
                transform: "translateX(-50%)",
                borderRadius: "0 0 2px 2px",
                opacity: 0.8,
                animation: "arrowExtend 0.3s ease-out 0.1s forwards",
            },
        },

        // Enhanced keyframe animations
        "@keyframes connectionLine": {
            "0%": {
                opacity: 0,
                height: "2px",
                transform: "translateX(-50%) scaleY(0)",
            },
            "100%": {
                opacity: 1,
                height: "8px",
                transform: "translateX(-50%) scaleY(1)",
            },
        },

        "@keyframes arrowExtend": {
            "0%": {
                opacity: 0,
                height: "0px",
            },
            "100%": {
                opacity: 0.8,
                height: "12px",
            },
        },

        "@keyframes tooltipGlow": {
            "0%": {
                boxShadow: `${getVariantStyles().boxShadow}, 0 0 20px ${alpha(
                    theme.palette.primary.main,
                    0.3
                )}`,
            },
            "100%": {
                boxShadow: `${getVariantStyles().boxShadow}, 0 0 30px ${alpha(
                    theme.palette.primary.main,
                    0.5
                )}`,
            },
        },

        "@keyframes sparkle": {
            "0%, 100%": { opacity: 0, transform: "rotate(0deg)" },
            "50%": { opacity: 1, transform: "rotate(180deg)" },
        },

        // Custom Grow animation that starts from trigger element
        "@keyframes connectedGrow": {
            "0%": {
                opacity: 0,
                transform: "scale(0.3) translateY(20px)",
                filter: "blur(4px)",
            },
            "50%": {
                opacity: 0.8,
                transform: "scale(0.8) translateY(10px)",
                filter: "blur(2px)",
            },
            "100%": {
                opacity: 1,
                transform: "scale(1) translateY(0)",
                filter: "blur(0px)",
            },
        },

        // Animation for different placements
        '&[data-popper-placement*="bottom"]': {
            [`& .${tooltipClasses.tooltip}`]: {
                transformOrigin: "center top",
                "&::before": {
                    top: -1,
                    background:
                        variant === "glass"
                            ? theme.palette.mode === "dark"
                                ? "linear-gradient(0deg, rgba(255, 255, 255, 0.4), transparent)"
                                : "linear-gradient(0deg, rgba(255, 255, 255, 0.8), transparent)"
                            : getVariantStyles().background,
                },
            },
            [`& .${tooltipClasses.arrow}`]: {
                "&::after": {
                    top: "-12px",
                    borderRadius: "2px 2px 0 0",
                },
            },
        },

        '&[data-popper-placement*="left"]': {
            [`& .${tooltipClasses.tooltip}`]: {
                transformOrigin: "right center",
                "&::before": {
                    right: -1,
                    left: "auto",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "8px",
                    height: "2px",
                    background:
                        variant === "glass"
                            ? theme.palette.mode === "dark"
                                ? "linear-gradient(270deg, rgba(255, 255, 255, 0.4), transparent)"
                                : "linear-gradient(270deg, rgba(255, 255, 255, 0.8), transparent)"
                            : getVariantStyles().background,
                },
            },
        },

        '&[data-popper-placement*="right"]': {
            [`& .${tooltipClasses.tooltip}`]: {
                transformOrigin: "left center",
                "&::before": {
                    left: -1,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "8px",
                    height: "2px",
                    background:
                        variant === "glass"
                            ? theme.palette.mode === "dark"
                                ? "linear-gradient(90deg, rgba(255, 255, 255, 0.4), transparent)"
                                : "linear-gradient(90deg, rgba(255, 255, 255, 0.8), transparent)"
                            : getVariantStyles().background,
                },
            },
        },
    };
});

// Custom Connected Transition Component
const ConnectedTransition = React.forwardRef(function ConnectedTransition(
    props,
    ref
) {
    return (
        <Grow
            ref={ref}
            {...props}
            timeout={300}
            style={{
                transformOrigin: "center bottom",
                ...props.style,
            }}
            easing={{
                enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                exit: "cubic-bezier(0.4, 0, 0.6, 1)",
            }}
        />
    );
});

// Main Modern Tooltip Component
const ModernTooltip = ({
    children,
    title,
    variant = "default",
    animation = "connected",
    placement = "top",
    delay = 100,
    arrow = true,
    interactive = false,
    maxWidth = 280,
    ...props
}) => {
    // Animation components mapping
    const animationComponents = {
        zoom: Zoom,
        fade: Fade,
        grow: Grow,
        connected: ConnectedTransition,
    };

    const AnimationComponent =
        animationComponents[animation] || ConnectedTransition;

    return (
        <StyledTooltip
            title={title}
            variant={variant}
            placement={placement}
            arrow={arrow}
            enterDelay={delay}
            leaveDelay={50}
            TransitionComponent={AnimationComponent}
            TransitionProps={{
                timeout: animation === "connected" ? 300 : 200,
                easing: {
                    enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                    exit: "cubic-bezier(0.4, 0, 0.6, 1)",
                },
            }}
            componentsProps={{
                tooltip: {
                    sx: {
                        maxWidth: maxWidth,
                    },
                },
            }}
            {...(interactive && {
                disableHoverListener: false,
                disableFocusListener: false,
                disableTouchListener: false,
                enterTouchDelay: 0,
                leaveTouchDelay: 1500,
            })}
            {...props}>
            {children}
        </StyledTooltip>
    );
};

// Predefined tooltip variants for common use cases
export const PremiumTooltip = (props) => (
    <ModernTooltip variant='premium' {...props} />
);
export const GlassTooltip = (props) => (
    <ModernTooltip variant='glass' {...props} />
);
export const SuccessTooltip = (props) => (
    <ModernTooltip variant='success' {...props} />
);
export const WarningTooltip = (props) => (
    <ModernTooltip variant='warning' {...props} />
);
export const ErrorTooltip = (props) => (
    <ModernTooltip variant='error' {...props} />
);
export const InfoTooltip = (props) => (
    <ModernTooltip variant='info' {...props} />
);

// Hook for programmatic tooltip control
export const useTooltipState = (initialOpen = false) => {
    const [open, setOpen] = React.useState(initialOpen);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const toggle = () => setOpen((prev) => !prev);

    return {
        open,
        onOpen: handleOpen,
        onClose: handleClose,
        toggle,
        setOpen,
    };
};

export default ModernTooltip;
