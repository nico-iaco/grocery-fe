import {Grid, IconButton, Paper} from "@mui/material";
import {SimpleItemRowComponent} from "./SimpleItemRowComponent";
import {Edit} from "@mui/icons-material";


export interface ItemRowComponentProps {
    id: string
    name: string
    barcode: string,
    quantity: number
    unit: string
    onClick: () => void
    onButtonClick: () => void
}

export function ItemRowComponent(props: ItemRowComponentProps) {
    return (
        <div style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined" style={{
                padding: 8
            }}>
                <Grid container columns={10}>
                    <SimpleItemRowComponent
                        mainText={props.name}
                        subText={`${props.barcode} § ${props.quantity} ${props.unit}`}
                        onClick={props.onClick}
                    />
                    <Grid item xs={2} className="center">
                        <IconButton edge="end" aria-label="delete" onClick={props.onButtonClick}>
                            <Edit/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

        </div>

    );
}
