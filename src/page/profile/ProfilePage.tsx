import {AppBar, Avatar, Box, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../selector/Selector";
import {getAuth} from "firebase/auth";
import {clearUser, setCurrentTabIndex, setError} from "../../action/Action";
import {stringAvatar} from "../../utils/colorUtils";

export const ProfilePage = () => {
    const currentUser = useSelector(getUser);
    const dispatch = useDispatch();
    dispatch(setCurrentTabIndex(3));

    const logout = () => {
        const auth = getAuth();
        auth.signOut()
            .then(() => {
                dispatch(clearUser());
            })
            .catch((error) => {
                console.error(error)
                dispatch(setError(error.message));
            });
    }

    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="sticky" className="AppBar">
                        <Toolbar>
                            <Button disabled></Button>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Profile
                            </Typography>
                            <Button disabled></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={8} className="container">
                    <Avatar {...stringAvatar(currentUser?.displayName || "")} />
                    <h5>Hi {currentUser?.displayName}</h5>
                </Grid>
                <Grid item xs={8} className="container">

                </Grid>
                <Grid item xs={8} className="container">
                    <Button variant="contained" onClick={logout}>Logout</Button>
                </Grid>
            </Container>
        </Grid>
    );
}
