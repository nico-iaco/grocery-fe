import {Grid2, Typography} from "@mui/material";

export interface SimpleItemRowComponentProps {
    mainText: string
    subText: string
    onClick: () => void
}

export const SimpleItemRowComponent = (props: SimpleItemRowComponentProps) => {
    return <Grid2 size={8} onClick={props.onClick}>
        <Grid2 container columns={8}>
            <Grid2 size={8} className={"center"}>
                <Typography variant="h5">{props.mainText}</Typography>
            </Grid2>
            <Grid2 size={8} className="center">
                <Typography variant="subtitle1">{props.subText}</Typography>
            </Grid2>
        </Grid2>
    </Grid2>
}
