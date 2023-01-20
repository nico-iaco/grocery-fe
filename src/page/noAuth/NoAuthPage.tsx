import {Button, Container, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

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
                    title={strings.homeTitle}
                />
            </Grid>
            <Container className="container text-center">
                <Grid item xs={8} className="container">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {strings.noAuthMainTitle}
                    </Typography>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={register}
                    >
                        {strings.registerButtonLabel}
                    </Button>
                </Grid>
                <Grid item xs={8} className="container">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={login}
                    >
                        {strings.loginButtonLabel}
                    </Button>
                </Grid>
            </Container>
        </Grid>
    );
}

export default NoAuthPage;