import {Grid, Typography} from "@mui/material";

export interface SimpleItemRowComponentProps {
    mainText: string
    subText: string
    onClick: () => void
}

export const SimpleItemRowComponent = (props: SimpleItemRowComponentProps) => {
    return <Grid item xs={8} onClick={props.onClick}>
        <Grid container columns={8}>
            <Grid item xs={8} className={"center"}>
                <Typography variant="h5">{props.mainText}</Typography>
            </Grid>
            <Grid item xs={8} className="center">
                <Typography variant="subtitle1">{props.subText}</Typography>
            </Grid>
        </Grid>
    </Grid>
}
