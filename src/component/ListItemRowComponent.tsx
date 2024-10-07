import {Chip, Grid2, Paper, Typography} from "@mui/material";


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
                <Grid2 container alignItems="center" onClick={props.onItemClicked}>
                    <Grid2 size={2} className={"center"}>
                        {props.leftIcon}
                    </Grid2>
                    <Grid2 size={8}>
                        <Grid2 container direction="column">
                            <Grid2>
                                <Typography variant="h5">
                                    {props.title}
                                </Typography>
                            </Grid2>
                            <Grid2>
                                <Typography variant="subtitle1">
                                    {props.subtitle}
                                </Typography>
                            </Grid2>
                            <Grid2 className={"center"}>
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
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <Grid2 size={2} className={"center"} onClick={props.onRightIconClicked}>
                        {props.rightIcon}
                    </Grid2>
                </Grid2>
            </Paper>
        </div>
    );
}
