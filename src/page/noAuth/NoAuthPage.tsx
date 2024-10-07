import {Button, Container, Grid2, Typography} from "@mui/material";
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
        <Grid2 container columns={8}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.homeTitle}
                />
            </Grid2>
            <Container className="container text-center">
                <Grid2 size={8} className="container">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {strings.noAuthMainTitle}
                    </Typography>
                </Grid2>
                <Grid2 size={8} className="container">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={register}
                    >
                        {strings.registerButtonLabel}
                    </Button>
                </Grid2>
                <Grid2 size={8} className="container">
                    <Button
                        variant="contained"
                        color={"secondary"}
                        onClick={login}
                    >
                        {strings.loginButtonLabel}
                    </Button>
                </Grid2>
            </Container>
        </Grid2>
    );
}

export default NoAuthPage;