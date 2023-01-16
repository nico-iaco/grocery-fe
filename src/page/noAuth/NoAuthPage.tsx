import {Button, Container, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AppBarComponent} from "../../component/AppBarComponent";

const NoAuthPage = () => {
    const navigate = useNavigate();

    const login = () => {
        navigate(`/signin`);
    }

    const register = () => {
        navigate(`/signup`);
    }

    return (
        <Grid container columns={8}>
            <Grid item xs={8}>
                <AppBarComponent
                    title={"Foody"}
                />
            </Grid>
            <Container className="container text-center">
                <Grid item xs={8} className="container">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        You are not logged in.
                    </Typography>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={register}
                    >
                        Register
                    </Button>
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

export default NoAuthPage;