import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";


export interface AppBarComponentProps {
    title: string;
    leftButton?: JSX.Element;
    rightButton?: JSX.Element;
}

export const AppBarComponent = (props: AppBarComponentProps) => {
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="sticky" className="AppBar">
            <Toolbar>
                {props.leftButton || <Button disabled></Button>}
                <Typography variant="h6" component="div" className="lobster-font" sx={{flexGrow: 1}}>
                    ${props.title}
                </Typography>
                {props.rightButton || <Button disabled></Button>}
            </Toolbar>
        </AppBar>
    </Box>
}