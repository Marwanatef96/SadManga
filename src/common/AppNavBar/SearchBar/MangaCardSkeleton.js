/** @format */

import {
    Box,
    Card,
    CardContent,
    Skeleton,
} from "@mui/material";

function MangaCardSkeleton({ theme }) {
    return (
        <Card
            sx={{
                width: "calc(100%-4px)",
                height: 110,
                margin: "0 8px",
                display: "flex",
                borderRadius: 0,
                boxShadow: 3,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
            }}>
            {/* Cover Image Skeleton */}
            <Skeleton variant='rectangular' width={70} height={110} />

            {/* Content Skeleton */}
            <CardContent sx={{ flex: 1, p: 1 }}>
                <Box px={1}>
                    {/* Title */}
                    <Skeleton width='60%' height={25} />

                    {/* Rating Chip */}
                    <Skeleton
                        width={50}
                        height={25}
                        sx={{ mt: 1, borderRadius: "16px" }}
                    />

                    {/* Status Chip */}
                    <Skeleton
                        width={70}
                        height={25}
                        sx={{ mt: 1, borderRadius: "16px" }}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
 export default MangaCardSkeleton;