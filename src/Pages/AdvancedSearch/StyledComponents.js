/** @format */
import {
    styled,
    alpha,
    Autocomplete,
    Popper,
    Select,
    Paper,
} from "@mui/material";

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

export const StyledPopper = styled(Popper)(({ theme }) => ({
    "& .MuiPaper-root": {
        marginTop: 8,
        borderRadius: 12,
        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        backgroundColor: theme.palette.background.paper,
        maxHeight: 350,
        overflow: "hidden",
    },
}));

export const FilterContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: 16,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.08)}`,
    margin: "0 auto",
    marginBottom: theme.spacing(2),
    position: "relative",
    overflow: "visible",
    width: "100%",
    maxWidth: theme.breakpoints.values.lg,
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: theme.palette.primary.main,
        borderRadius: "16px 16px 0 0",
    },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    borderRadius: 10,
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.primary.main, 0.2),
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha(theme.palette.primary.main, 0.4),
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
    },
}));
