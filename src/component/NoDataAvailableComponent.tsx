import {Paper, Typography} from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export const NoDataAvailableComponent = () => {
    return (
        <div style={{
            paddingBottom: 8
        }}>
            <Paper variant="outlined" style={{
                padding: 8
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <WarningAmberIcon style={{
                        marginRight: 8
                    }}/>
                    <Typography variant="h6" color="textSecondary">
                        No data available
                    </Typography>
                </div>
            </Paper>
        </div>
    )
}


