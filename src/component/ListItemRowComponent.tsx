import { Chip, Grid, Paper, Typography } from "@mui/material";


export interface ListItemRowComponentProps {
    leftIcon?: JSX.Element;
    title: string;
    subtitle: string;
    tagList: string[];
    rightIcon?: JSX.Element;
    onItemClicked: () => void;
    onRightIconClicked?: () => void;
}

export const ListItemRowComponent = (props: ListItemRowComponentProps) => {
    return (
        <div style={{
            paddingBottom: 8
        }}>
            <Paper sx={{
                borderRadius: '16px',
                padding: '8px',
            }}>
                <Grid container alignItems="center" onClick={props.onItemClicked}>
                    <Grid item xs={2}>
                        {props.leftIcon}
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h5">
                                    {props.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">
                                    {props.subtitle}
                                </Typography>
                            </Grid>
                            <Grid item>
                                {props.tagList.map((tag) => {
                                    return (
                                        <Chip 
                                            label={tag}
                                            variant="filled"
                                            color="secondary"
                                            size="small"
                                        />
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2} onClick={props.onRightIconClicked}>
                        {props.rightIcon}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
