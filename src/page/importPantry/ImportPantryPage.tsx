import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Pantry} from "../../model/pantry";
import {addSharedPantry} from "../../api/pantryApis";
import {setCurrentPantry, setError} from "../../action/Action";
import {Box, Container, Grid2, Modal} from "@mui/material";
import {AppBarComponent} from "../../component/AppBarComponent";
import {strings} from "../../localization/strings";
import {ArrowBack} from "@mui/icons-material";
import {PantryDataComponent} from "../../component/PantryDataComponent";
import {BarcodeComponent} from "../../component/BarcodeComponent";

const ImportPantryPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [pantryId, setPantryId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [isLoading, setIsLoading] = useState(true);
    const [isBarcodeReaderVisible, setIsBarcodeReaderVisible] = useState(true);

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (pantryId !== "") {
            const controller = new AbortController();
            addSharedPantry(pantryId, controller)
                .then(value => {
                    setName(value?.name || "");
                    setDescription(value?.description || "");
                    setIsLoading(false);
                })
                .catch(reason => {
                    console.error(reason)
                    dispatch(setError(reason.message));
                });
        }
    }, [pantryId]);

    const handleImportPantry = () => {
        const pantry: Pantry = {
            id: pantryId,
            name,
            description
        }

        dispatch(setCurrentPantry(pantry));
        navigate(`/profile`);

    }


    return (
        <Grid2 container columns={8} sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
        }}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.importPantryTitle}
                    leftButton={{
                        icon: <ArrowBack/>,
                        onClick: goBack
                    }}
                />
            </Grid2>
            {
                isLoading ?
                    <Box>Loading...</Box>
                    :
                    <Container className="container">
                        <PantryDataComponent
                            name={name}
                            onNameChange={setName}
                            description={description}
                            onDescriptionChange={setDescription}
                            buttonText={strings.importButtonLabel}
                            onButtonClick={handleImportPantry}
                            isFieldDisabled={true}
                        />
                    </Container>
            }
            <Modal
                open={isBarcodeReaderVisible}
                onClose={() => setIsBarcodeReaderVisible(false)}
            >
                <Box>
                    <BarcodeComponent
                        fps={15}
                        qrbox={240}
                        qrCodeSuccessCallback={(decodedText, result) => {
                            setPantryId(decodedText)
                            setIsBarcodeReaderVisible(false)
                        }}
                    />
                </Box>
            </Modal>
        </Grid2>
    )
}

export default ImportPantryPage;