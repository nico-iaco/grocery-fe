import {
    AppBar,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Toolbar,
    Typography
} from "@mui/material";
import {ArrowBack, EmailOutlined, Key, Person, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import React from "react";
import {createUserWithEmailAndPassword, getAuth, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setError, setUser} from "../../action/Action";
import {User} from "../../model/user";
import {getAnalytics, logEvent} from "firebase/analytics";

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [username, setUsername] = React.useState("");

    const analytics = getAnalytics();

    const register = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const firebaseUser = userCredential.user;
                updateProfile(firebaseUser, {
                    displayName: username,
                })
                    .then(() => {
                        const user: User = {
                            email: firebaseUser.email ?? "",
                            id: firebaseUser.uid,
                            displayName: firebaseUser.displayName ?? "",
                        }
                        logEvent(analytics, 'sign_up', user);
                        dispatch(setUser(user));
                        navigate(-1);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error(errorCode, errorMessage)
                        dispatch(setError(errorMessage));
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                dispatch(setError(errorMessage));
            });
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="sticky" className="AppBar">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="back"
                                sx={{mr: 2}}
                                onClick={goBack}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Register
                            </Typography>
                            <Button disabled></Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Container className="container">
                <Grid item xs={8} className="container">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="name-required">Name</InputLabel>
                        <OutlinedInput
                            required
                            id="name-required"
                            label="Name"
                            value={username}
                            type={"text"}
                            onChange={(event) => setUsername(event.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Person/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={8} className="container">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="email-required">Email</InputLabel>
                        <OutlinedInput
                            required
                            id="email-required"
                            label="Email"
                            value={email}
                            type={"email"}
                            onChange={(event) => setEmail(event.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailOutlined/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={8} className="container">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="password-required">Password</InputLabel>
                        <OutlinedInput
                            required
                            id="password-required"
                            label="Password"
                            value={password}
                            type={passwordVisible ? "text" : "password"}
                            onChange={(event) => setPassword(event.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Key/>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment onClick={() => setPasswordVisible(prevState => !prevState)}
                                                position="end">
                                    {passwordVisible ? <VisibilityOffOutlined/> : <VisibilityOutlined/>}
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button variant="contained" onClick={register}>Register</Button>
                </Grid>
            </Container>
        </Grid>
    );
}
