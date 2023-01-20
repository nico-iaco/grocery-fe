import {Paper, Typography} from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {strings} from "../localization/strings";

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
                        {strings.noDataAvailableLabel}
                    </Typography>
                </div>
            </Paper>
        </div>
    )
}


