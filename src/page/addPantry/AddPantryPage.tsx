import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {Pantry} from "../../model/pantry";
import {createPantry} from "../../api/pantryApis";
import {setCurrentPantry, setError} from "../../action/Action";
import {Container, Grid2} from "@mui/material";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";
import {ArrowBack} from "@mui/icons-material";
import {PantryDataComponent} from "../../component/PantryDataComponent";

const AddPantryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const goBack = () => {
        navigate(-1);
    }

    const sendPantryToBe = () => {
        // Create pantry object
        const pantry: Pantry = {
            name,
            description
        };

        // Send pantry to backend
        const controller = new AbortController();
        createPantry(pantry, controller)
            .then(value => {
                dispatch(setCurrentPantry(value));
                navigate(`/profile`);
            })
            .catch(reason => {
                console.error(reason)
                dispatch(setError(reason.message));
            });
    }


    return (
        <Grid2 container columns={8} sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.addPantryTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                />
            </Grid2>
            <Container className="container">
                <PantryDataComponent
                    onNameChange={setName}
                    onDescriptionChange={setDescription}
                    buttonText={strings.addButtonLabel}
                    onButtonClick={sendPantryToBe}
                />
            </Container>
        </Grid2>
    )
}

export default AddPantryPage;