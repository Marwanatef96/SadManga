/** @format */
import {
    Grid,
    Card,
    CardContent,
    Skeleton,
    Stack,
    Avatar,
    Box,
} from "@mui/material";

const ChapterSkeleton = () => {
    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: "20px",
                bgcolor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                p: 2,
            }}>
            <CardContent
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Avatar + Title */}
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Skeleton variant='circular'>
                        <Avatar />
                    </Skeleton>
                    <Box sx={{ flex: 1 }}>
                        <Skeleton variant='text' width='60%' height={28} />
                        <Skeleton variant='text' width='80%' height={20} />
                    </Box>
                </Stack>

                {/* Bottom info row */}
                <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='space-around'
                    alignItems='center'>
                    <Skeleton variant='rectangular' width={80} height={20} />
                    <Skeleton variant='rectangular' width={40} height={20} />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default function ChaptersSkeletonList({ count = 8 }) {
    return (
        <Grid container spacing={3} sx={{ mt: 2 }}>
            {Array.from({ length: count }).map((_, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
                    <ChapterSkeleton />
                </Grid>
            ))}
        </Grid>
    );
}
