import {Grid2, IconButton, Paper} from "@mui/material";
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
                <Grid2 container columns={10}>
                    <SimpleItemRowComponent
                        mainText={props.mainText}
                        subText={props.subText}
                        onClick={props.onItemClicked}
                    />
                    <Grid2 size={2} className="center">
                        <IconButton edge="end" aria-label="delete" onClick={props.onButtonClicked}>
                            {props.icon}
                        </IconButton>
                    </Grid2>
                </Grid2>
            </Paper>

        </div>)
}