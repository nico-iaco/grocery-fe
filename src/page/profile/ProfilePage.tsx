import {Avatar, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../selector/Selector";
import {getAuth} from "firebase/auth";
import {clearUser, setCurrentTabIndex, setError} from "../../action/Action";
import {stringAvatar} from "../../utils/colorUtils";
import {AppBarComponent} from "../../component/AppBarComponent";
import {Email} from "@mui/icons-material";

const ProfilePage = () => {
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
                <AppBarComponent
                    title={"Profile"}
                    rightButton={<Button color={"inherit"} onClick={logout}>Logout</Button>}
                />
            </Grid>
            <Container className="container">
                <Grid item xs={8} container className="container">
                    <Grid item xs={3}>
                        <Avatar
                            {...stringAvatar(currentUser?.displayName || "")}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <h4>Hi {currentUser?.displayName}</h4>
                    </Grid>
                </Grid>
                <Grid item xs={8} className="container">
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <Email/>
                            </ListItemIcon>
                            <ListItemText primary="Email" secondary={currentUser?.email}/>
                        </ListItem>
                    </List>
                </Grid>
            </Container>
        </Grid>
    );
}

export default ProfilePage;
