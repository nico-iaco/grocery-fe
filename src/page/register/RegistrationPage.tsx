import {Button, Container, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {ArrowBack, EmailOutlined, Key, Person, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setError, setUser} from "../../action/Action";
import {logEvent} from "firebase/analytics";
import {analytics, auth, mapFirebaseUserToUser} from "../../utils/firebaseUtils";
import {useState} from "react";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const firebaseUser = userCredential.user;
                updateProfile(firebaseUser, {
                    displayName: username,
                })
                    .then(() => {
                        const user = mapFirebaseUserToUser(firebaseUser);
                        logEvent(analytics, 'sign_up', user);
                        dispatch(setUser(user));
                        navigate(-1);
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
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
                <AppBarComponent
                    title={strings.registerTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack,
                    }}
                />
            </Grid>
            <Container className="container text-center">
                <Grid item xs={8} className="container">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <InputLabel htmlFor="name-required">{strings.registrationNameLabel}</InputLabel>
                        <OutlinedInput
                            required
                            id="name-required"
                            label={strings.registrationNameLabel}
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
                        <InputLabel htmlFor="email-required">{strings.registrationEmailLabel}</InputLabel>
                        <OutlinedInput
                            required
                            id="email-required"
                            label={strings.registrationEmailLabel}
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
                        <InputLabel htmlFor="password-required">{strings.registrationPasswordLabel}</InputLabel>
                        <OutlinedInput
                            required
                            id="password-required"
                            label={strings.registrationPasswordLabel}
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
                <Grid item xs={8} className="container text-center">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={register}
                    >
                        {strings.registerButtonLabel}
                    </Button>
                </Grid>
            </Container>
        </Grid>
    );
}

export default RegistrationPage;
