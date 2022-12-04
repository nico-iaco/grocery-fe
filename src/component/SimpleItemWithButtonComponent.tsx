import {Grid, IconButton, Paper} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";


export interface SimpleItemWithButtonComponentProps {
    mainText: string
    subText: string
    onItemClicked: () => void
    icon: JSX.Element
    onButtonClicked: () => void
}

export const SimpleItemWithButtonComponent = (props: SimpleItemWithButtonComponentProps) => {
    return (
        <div style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined" style={{
                padding: 8
            }}>
                <Grid container columns={10}>
                    <SimpleItemRowComponent
                        mainText={props.mainText}
                        subText={props.subText}
                        onClick={props.onItemClicked}
                    />
                    <Grid item xs={2} className="center">
                        <IconButton edge="end" aria-label="delete" onClick={props.onButtonClicked}>
                            {props.icon}
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

        </div>)
}