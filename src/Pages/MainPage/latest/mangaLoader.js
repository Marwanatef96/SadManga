/** @format */
import { Grid, Card, CardContent, Skeleton, Box } from "@mui/material";


export default function LatestMangaSkeleton({ dataLength = 12 }) {
    const columnSize = 4; // md: 3 → 4 columns per row
    const columnsPerRow = 12 / columnSize;

    const remainder = dataLength % columnsPerRow;
    const emptySlots = remainder === 0 ? 3 : columnsPerRow - remainder;
    return (
        <>
            {Array.from({ length: emptySlots }).map((_, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <Card
                        sx={{
                            width: "100%",
                            height: "262px",
                            display: "flex",
                            borderRadius: 3,
                            boxShadow: 3,
                            overflow: "hidden",
                        }}>
                        {/* Image skeleton */}
                        <Skeleton
                            variant='rectangular'
                            sx={{
                                width: { xs: "100%", sm: 180, md: 200 },
                                height: { xs: 200, sm: "auto", md: 250 },
                                flexShrink: 0,
                            }}
                        />

                        {/* Content skeleton */}
                        <CardContent sx={{ flex: 1 }}>
                            <Skeleton variant='text' width='60%' height={30} />
                            <Skeleton variant='text' width='40%' />
                            <Box mt={2}>
                                <Skeleton
                                    variant='rectangular'
                                    height={36}
                                    sx={{ mb: 1 }}
                                />
                                <Skeleton
                                    variant='rectangular'
                                    height={36}
                                    sx={{ mb: 1 }}
                                />
                                <Skeleton variant='rectangular' height={36} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </>
    );
}
