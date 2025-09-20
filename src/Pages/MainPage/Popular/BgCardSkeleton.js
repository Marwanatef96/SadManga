/** @format */
import { calc } from "@chakra-ui/react";
import { Card, Box, Typography, keyframes } from "@mui/material";

const shimmer = keyframes`
  0% { background-position: -450px 0 }
  100% { background-position: 450px 0 }
`;

export default function BgCardSkeleton() {
    return (
        <Card
            sx={{
                width: 700,
                position: "absolute",
                top: "-300px",
                left: "calc(50% - 350px)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                borderRadius: 3,
                p: 3,
                overflow: "hidden",
            }}>
            {/* Animated gradient shimmer bar */}
            <Box
                sx={{
                    width: "100%",
                    height: "10px",
                    borderRadius: "10px",
                    mb: 3,
                    background:
                        "linear-gradient(90deg, #222 25%, #444 50%, #222 75%)",
                    backgroundSize: "400% 100%",
                    animation: `${shimmer} 1.5s infinite linear`,
                }}
            />

            {/* Animated loading text */}
            <Typography
                variant='h5'
                sx={{
                    textAlign: "center",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    background:
                        "linear-gradient(90deg,#ff512f,#dd2476,#ff512f)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "moveGradient 2s linear infinite",
                    "@keyframes moveGradient": {
                        "0%": { backgroundPosition: "0% center" },
                        "100%": { backgroundPosition: "200% center" },
                    },
                }}>
                Loading Manga...
            </Typography>

            {/* Pulsing box to mimic button */}
            <Box
                sx={{
                    width: 160,
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    mt: 3,
                    borderRadius: 3,
                    background: "linear-gradient(90deg,#fa3200,#fe5c01)",
                    animation: "pulse 1.5s infinite",
                    "@keyframes pulse": {
                        "0%": { transform: "scale(1)" },
                        "50%": { transform: "scale(1.05)" },
                        "100%": { transform: "scale(1)" },
                    },
                }}>
                <Typography variant='h6' sx={{ textAlign: "center" }}>
                    Hold On...
                </Typography>
            </Box>
        </Card>
    );
}
