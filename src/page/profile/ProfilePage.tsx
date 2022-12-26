import {Avatar, Button, Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../selector/Selector";
import {getAuth} from "firebase/auth";
import {clearUser, setCurrentTabIndex, setError} from "../../action/Action";
import {stringAvatar} from "../../utils/colorUtils";
import {AppBarComponent} from "../../component/AppBarComponent";

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
                />
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

export default ProfilePage;
