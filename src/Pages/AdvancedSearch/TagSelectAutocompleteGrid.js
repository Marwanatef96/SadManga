/** @format */

import React, { useRef } from "react";
import { Autocomplete, TextField, Chip, Popper, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { alpha } from "@mui/material/styles";
import { color } from "framer-motion";
export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        padding: "6px !important",
        paddingRight: "36px !important",
        borderRadius: 12,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.4),
            boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
        "&.Mui-focused": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
        },
    },
}));
export const AnimatedChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
        transform: "scale(1.04)",
        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    "& .MuiChip-deleteIcon": {
        color: alpha(theme.palette.primary.main, 0.5),
        transition: "color 0.2s ease, transform 0.2s ease",
        "&:hover": {
            color: theme.palette.error.main,
            transform: "rotate(90deg)",
        },
    },
}));
// Custom Popper that matches input width
const StyledPopper = React.forwardRef(function StyledPopper(props, ref) {
    const { anchorEl, ...other } = props;
    return (
        <Popper
            {...other}
            ref={ref}
            anchorEl={anchorEl}
            style={{
                width: anchorEl ? anchorEl.clientWidth : undefined, // match input width
            }}
            placement='bottom-start'
        />
    );
});

// Custom Listbox for grid layout
const GridListbox = styled("ul")(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    margin: 0,
    listStyle: "none",
    maxHeight: 300,
    overflowY: "auto",
    "& li": {
        width: "auto",
        margin: 0,
        padding: 0,
    },
}));

export default function TagSelectAutocompleteGrid({
    name,
    control,
    options,
    label = "Tags",
    placeholder = "Search tags...",
    watch,
    debouncedSearch,
    tags = [],
}) {
    const inputRef = useRef(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <StyledAutocomplete
                    multiple
                    disableCloseOnSelect
                    options={options}
                    getOptionLabel={(option) =>
                        option.attributes?.name?.en || ""
                    }
                    value={
                        tags.filter((tag) => field.value?.includes(tag.id)) ||
                        []
                    }
                    onChange={(_, newValue) => {
                        const tagIds = newValue.map((tag) => tag.id);
                        field.onChange(tagIds);
                        debouncedSearch?.({ ...watch(), tags: tagIds });
                    }}
                    slots={{
                        popper: StyledPopper,
                        listbox: GridListbox,
                    }}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <AnimatedChip
                                label={option.attributes?.name?.en}
                                variant={selected ? "filled" : "outlined"}
                                color={selected ? "primary" : "default"}
                                sx={{
                                    borderRadius: "20px",
                                    fontSize: "0.8rem",
                                    backgroundColor: "#abb0b6c7 !important",
                                    color: "#000000ff !important",
                                }}
                            />
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            inputRef={inputRef}
                        />
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <AnimatedChip
                                label={option.attributes?.name?.en}
                                {...getTagProps({ index })}
                                sx={{
                                    borderRadius: "20px",
                                    fontSize: "0.8rem",
                                }}
                            />
                        ))
                    }
                />
            )}
        />
    );
}
