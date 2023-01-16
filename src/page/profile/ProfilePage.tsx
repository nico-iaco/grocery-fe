import {Avatar, Button, Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../selector/Selector";
import {getAuth} from "firebase/auth";
import {clearUser, setCurrentTabIndex, setError} from "../../action/Action";
import {stringAvatar} from "../../utils/colorUtils";
import {AppBarComponent} from "../../component/AppBarComponent";
import {BugReport, Email, Info} from "@mui/icons-material";
import './ProfilePage.css';

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
                <Grid item xs={8} container columns={8} className="container">
                    <Grid item xs={2} className={"center"}>
                        <Avatar
                            {...stringAvatar(currentUser?.displayName || "")}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <h2 className={"lobster-font"}>Hi {currentUser?.displayName}</h2>
                    </Grid>
                </Grid>
                <Grid item xs={8} className="container">
                    <List>
                        <ListItem >
                            <ListItemIcon>
                                <Email/>
                            </ListItemIcon>
                            <ListItemText primary="Email" secondary={currentUser?.email}/>
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemIcon>
                                <BugReport/>
                            </ListItemIcon>
                            <ListItemText
                                primary="Report a bug"
                                secondary={"Open a Github issue"}
                                onClick={() => window.open("https://github.com/nico-iaco/grocery-fe/issues/new?assignees=&labels=bug&template=bug_report.md&title=BUG+-+", "_blank")}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem >
                            <ListItemIcon>
                                <Info/>
                            </ListItemIcon>
                            <ListItemText primary="Application version" secondary={"v2.0.0"}/>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
                <Grid item xs={8} className="container footer lobster-font">
                    <p>Made with 💙 by <b><a className={"footer-link"} target={'_blank'} href={"https://github.com/nico-iaco"}>nico-iaco</a></b></p>
                </Grid>
            </Container>
        </Grid>
    );
}

export default ProfilePage;
