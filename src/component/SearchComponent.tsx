import {FormControl, Grid2, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {strings} from "../localization/strings";
import {Search} from "@mui/icons-material";

export interface SearchComponentProps {
    search: string
    onSearchChanged: (search: string) => void
}

const SearchComponent = (props: SearchComponentProps) => {
    return <Grid2 size={8}>
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-search">{strings.searchLabel}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-search"
                type={'text'}
                value={props.search}
                onChange={(event) => props.onSearchChanged(event.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                        >
                            <Search/>
                        </IconButton>
                    </InputAdornment>
                }
                label={strings.searchLabel}
            />
        </FormControl>
    </Grid2>
}

export default SearchComponent;