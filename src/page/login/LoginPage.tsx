import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {useState} from "react";
import {ArrowBack, EmailOutlined, Key} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";
import {setError, setUser} from "../../action/Action";
import {User} from "../../model/user";
import {logEvent} from "firebase/analytics";
import {analytics} from "../../utils/firebaseUtils";
import {AppBarComponent} from "../../component/AppBarComponent";


const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPersistent, setIsPersistent] = useState(false);

    const firebaseSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const firebaseUser = userCredential.user;
                const user: User = {
                    email: firebaseUser.email ?? "",
                    id: firebaseUser.uid,
                    displayName: firebaseUser.displayName ?? "",
                }
                logEvent(analytics, 'login', user);
                dispatch(setUser(user));
                navigate(-1);
            })
            .catch((error) => {
                const errorMessage = error.message;
                dispatch(setError(errorMessage));
            });
    }

    const login = () => {
        if (isPersistent) {
            console.log("set persistence")
            setPersistence(auth, browserLocalPersistence)
                .then(() => {
                    firebaseSignIn();
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    dispatch(setError(errorMessage));
                });
        } else {
            firebaseSignIn();
        }
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <AppBarComponent
                    title={"Login"}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                />
            </Grid>
            <Container className="container">
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
                            endAdornment={
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
                            type={"password"}
                            onChange={(event) => setPassword(event.target.value)}
                            endAdornment={
                                <InputAdornment position="start">
                                    <Key/>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={8} className="container">
                    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value={isPersistent}
                                        onChange={
                                            (event) => setIsPersistent(event.target.checked)
                                        } />
                                }
                                label="Remember me"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={login}
                    >
                        Login
                    </Button>
                </Grid>
            </Container>
        </Grid>
    );
}

export default LoginPage;