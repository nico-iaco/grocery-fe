import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    Toolbar,
    Typography
} from "@mui/material";
import {getCurrentMeal} from "../../selector/Selector";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import {ChooseFoodComponent} from "../../component/ChooseFoodComponent";
import {setCurrentItem, setCurrentTransaction} from "../../action/Action";
import {ChooseFoodTransactionComponent} from "../../component/ChooseFoodTransactionComponent";
import {CompleteFoodConsumptionComponent} from "../../component/CompleteFoodConsumptionComponent";

const steps = ['Select food', 'Select transaction', 'Complete'];

const _renderStepContent = (step: number, onNextClicked: () => void, onPreviousClicked: () => void, onSkipClicked: () => void) => {
    switch (step) {
        case 0:
            return <ChooseFoodComponent
                isNextAvailable={true}
                onNextClicked={onNextClicked}
                isPreviousAvailable={false}
                onPreviousClicked={onPreviousClicked}
                isSkipAvailable={true}
                onSkipClicked={onSkipClicked}
            />;
        case 1:
            return <ChooseFoodTransactionComponent
                isNextAvailable={true}
                onNextClicked={onNextClicked}
                isPreviousAvailable={true}
                onPreviousClicked={onPreviousClicked}
                isSkipAvailable={true}
                onSkipClicked={onSkipClicked}
            />;
        case 2:
            return <CompleteFoodConsumptionComponent
                isNextAvailable={true}
                onNextClicked={onNextClicked}
                isPreviousAvailable={true}
                onPreviousClicked={onPreviousClicked}
                isSkipAvailable={false}
                onSkipClicked={onSkipClicked}
            />;
        default:
            return <div></div>;
    }
}

export interface StepperComponentProps {
    isNextAvailable: boolean
    onNextClicked: () => void
    isPreviousAvailable: boolean
    onPreviousClicked: () => void
    isSkipAvailable: boolean
    onSkipClicked: () => void
}

export const AddFoodConsumptionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMeal = useSelector(getCurrentMeal);

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleSkip = () => {
        setActiveStep(2);
    }

    const goBack = () => {
        dispatch(setCurrentItem(undefined));
        dispatch(setCurrentTransaction(undefined));
        navigate(-1);
    }

    return <Grid container columns={8} sx={{
        '& .MuiTextField-root': {m: 1, width: '25ch'},
    }}>
        <Grid item xs={8}>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={goBack}
                        >
                            <ArrowBack/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Add food consumption
                        </Typography>
                        <Button disabled></Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </Grid>
        <Container className="container">
            <Grid item xs={8}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <React.Fragment>
                    {
                        _renderStepContent(activeStep, handleNext, handleBack, handleSkip)
                    }
                </React.Fragment>
            </Grid>
        </Container>
    </Grid>

}
