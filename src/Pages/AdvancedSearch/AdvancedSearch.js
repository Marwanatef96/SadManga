/** @format */
import  { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import {
    Box,
    Grid,
    IconButton,
    Badge,
    Fade,
    Collapse,
    Tooltip,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    Clear as ClearIcon,
    FilterList as FilterListIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Schedule as ScheduleIcon,
    Close as CloseIcon,
    TrendingUp as TrendingUpIcon,
    Star as StarIcon,
    PauseCircleFilled as PauseCircleIcon,
} from "@mui/icons-material";
import apiClient from "../../api/client";
import TagSelectAutocompleteGrid from "./TagSelectAutocompleteGrid";
import MangaList from "./MangaList";
import { FilterContainer, StyledSelect } from "./StyledComponents";

const AdvancedSearch = () => {
    const theme = useTheme();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filtersExpanded, setFiltersExpanded] = useState(true);

    const { control, handleSubmit, watch, setValue, reset } = useForm({
        defaultValues: { tags: [], status: "", sort: "Latest" },
    });

    const statusOptions = [
        {
            value: "Ongoing",
            icon: <ScheduleIcon fontSize='small' />,
            color: "info",
        },
        {
            value: "Completed",
            icon: <CloseIcon fontSize='small' />,
            color: "success",
        },
        {
            value: "Hiatus",
            icon: <PauseCircleIcon fontSize='small' />,
            color: "warning",
        },
    ];

    const sortOptions = [
        { value: "Latest", icon: <TrendingUpIcon fontSize='small' /> },
        { value: "Oldest", icon: <ScheduleIcon fontSize='small' /> },
        { value: "Rating", icon: <StarIcon fontSize='small' /> },
    ];

    useEffect(() => {
        fetchTags();
    }, []);

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        if (params.tags) setValue("tags", params.tags.split(","));
        if (params.status) setValue("status", params.status);
        if (params.sort) setValue("sort", params.sort);
    }, [searchParams, setValue]);

    const fetchTags = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get("manga/tag");
            setTags(response.data.data || []);
        } catch (error) {
            console.error("Failed to fetch tags:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = useCallback(
        (data) => {
            const params = new URLSearchParams();
            if (data.tags?.length) params.set("tags", data.tags.join(","));
            if (data.status) params.set("status", data.status);
            if (data.sort) params.set("sort", data.sort);
            setSearchParams(params);
        },
        [setSearchParams]
    );

    const debouncedSearch = useMemo(() => debounce(onSubmit, 500), [onSubmit]);
    const handleClearAll = () => {
        reset();
        setSearchParams(new URLSearchParams());
    };
    const selectedTagsCount = watch("tags")?.length || 0;

    return (
        <>
            <FilterContainer elevation={0}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <FilterListIcon color='primary' />
                        <Typography variant='h5' fontWeight={700}>
                            Advanced Search
                        </Typography>
                        {selectedTagsCount > 0 && (
                            <Fade in>
                                <Badge
                                    badgeContent={selectedTagsCount}
                                    color='primary'>
                                    <Box />
                                </Badge>
                            </Fade>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip title='Clear all filters'>
                            <IconButton onClick={handleClearAll} size='small'>
                                <ClearIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip
                            title={filtersExpanded ? "Collapse" : "Expand"}>
                            <IconButton
                                onClick={() =>
                                    setFiltersExpanded(!filtersExpanded)
                                }
                                size='small'>
                                {filtersExpanded ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Collapse in={filtersExpanded}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                <TagSelectAutocompleteGrid
                                    name='tags'
                                    control={control}
                                    options={tags}
                                    watch={watch}
                                    debouncedSearch={debouncedSearch}
                                    tags={tags}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Controller
                                        name='status'
                                        control={control}
                                        render={({ field }) => (
                                            <StyledSelect
                                                {...field}
                                                label='Status'
                                                onChange={(e) => {
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                    debouncedSearch({
                                                        ...watch(),
                                                        status: e.target.value,
                                                    });
                                                }}
                                                value={field.value || ""}>
                                                <MenuItem value=''>
                                                    <em>All Status</em>
                                                </MenuItem>
                                                {statusOptions.map((status) => (
                                                    <MenuItem
                                                        key={status.value}
                                                        value={status.value}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 1,
                                                            }}>
                                                            {status.icon}
                                                            {status.value}
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </StyledSelect>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Sort By</InputLabel>
                                    <Controller
                                        name='sort'
                                        control={control}
                                        render={({ field }) => (
                                            <StyledSelect
                                                {...field}
                                                label='Sort By'
                                                onChange={(e) => {
                                                    field.onChange(
                                                        e.target.value
                                                    );
                                                    debouncedSearch({
                                                        ...watch(),
                                                        sort: e.target.value,
                                                    });
                                                }}
                                                value={field.value || "Latest"}>
                                                {sortOptions.map((sort) => (
                                                    <MenuItem
                                                        key={sort.value}
                                                        value={sort.value}>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 1,
                                                            }}>
                                                            {sort.icon}
                                                            {sort.value}
                                                        </Box>
                                                    </MenuItem>
                                                ))}
                                            </StyledSelect>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </Collapse>
            </FilterContainer>

            <MangaList searchParams={searchParams} />
        </>
    );
};

export default AdvancedSearch;
