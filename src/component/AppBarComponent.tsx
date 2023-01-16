import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";


export interface AppBarComponentProps {
    title: string;
    leftButton?: {
        icon: JSX.Element;
        onClick: () => void;
    };
    rightButton?: JSX.Element;
}

export const AppBarComponent = (props: AppBarComponentProps) => {
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="sticky" className="AppBar text-center">
            <Toolbar>
                {props.leftButton ?
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={props.leftButton.onClick}
                    >
                        {props.leftButton.icon}
                    </IconButton>
                    : <Button disabled></Button>}
                <Typography variant="h5" className="lobster-font" sx={{flexGrow: 1}}>
                    {props.title}
                </Typography>
                {props.rightButton || <Button disabled></Button>}
            </Toolbar>
        </AppBar>
    </Box>
}