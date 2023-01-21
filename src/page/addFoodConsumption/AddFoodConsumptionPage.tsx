import React, {Fragment, useState} from "react";
import {Container, Grid, Step, StepLabel, Stepper} from "@mui/material";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ArrowBack} from "@mui/icons-material";
import {setCurrentItem, setCurrentTransaction} from "../../action/Action";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";

const ChooseFoodComponent = React.lazy(() => import("../../component/ChooseFoodComponent"));
const ChooseFoodTransactionComponent = React.lazy(() => import("../../component/ChooseFoodTransactionComponent"));
const CompleteFoodConsumptionComponent = React.lazy(() => import("../../component/CompleteFoodConsumptionComponent"));


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

const AddFoodConsumptionPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        strings.addFoodConsumptionSelectFoodStepTitle,
        strings.addFoodConsumptionSelectTransactionStepTitle,
        strings.addFoodConsumptionCompleteStepTitle
    ];

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
            <AppBarComponent
                title={strings.addFoodConsumptionTitle}
                leftButton={{
                    icon: <ArrowBack/>,
                    onClick: goBack
                }}
            />
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
                <Fragment>
                    {
                        _renderStepContent(activeStep, handleNext, handleBack, handleSkip)
                    }
                </Fragment>
            </Grid>
        </Container>
    </Grid>

}

export default AddFoodConsumptionPage;
