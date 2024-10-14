import {
    Avatar,
    Button,
    Container,
    Divider,
    Grid2,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPantry, getLanguage, getUser} from "../../selector/Selector";
import {getAuth} from "firebase/auth";
import {clearUser, setCurrentPantry, setCurrentTabIndex, setError, setLanguage} from "../../action/Action";
import {stringAvatar} from "../../utils/colorUtils";
import {AppBarComponent} from "../../component/AppBarComponent";
import {BugReport, Email, Info, Language} from "@mui/icons-material";
import './ProfilePage.css';
import {useEffect, useState} from "react";
import {strings} from "../../localization/strings";
import LanguageSelectionDialogComponent from "../../component/LanguageSelectionDialogComponent";
import PantrySelectionDialogComponent from "../../component/PantrySelectionDialogComponent";
import KitchenIcon from '@mui/icons-material/Kitchen';
import IosShareIcon from '@mui/icons-material/IosShare';
import {Pantry} from "../../model/pantry";
import PantryShareDialogComponent from "../../component/PantryShareDialogComponent";

const ProfilePage = () => {
    const currentUser = useSelector(getUser);
    const currentLanguage = useSelector(getLanguage);
    const currentPantry = useSelector(getCurrentPantry);
    const dispatch = useDispatch();
    dispatch(setCurrentTabIndex(3));

    const [open, setOpen] = useState(false);
    const [pantrySelectionDialogOpen, setPantrySelectionDialogOpen] = useState(false);
    const [pantryShareDialogOpen, setPantryShareDialogOpen] = useState(false);

    const appVersionDetail = import.meta.env.VITE_VERSION;

    const logout = () => {
        const auth = getAuth();
        auth.signOut()
            .then(() => {
                dispatch(clearUser());
            })
            .catch((error) => {
                console.error(error)
                dispatch(setError(error.message));
            });
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleLanguageChange = (language: string) => {
        strings.setLanguage(language);
        dispatch(setLanguage(language));
        setOpen(false);
    }

    const handlePantryChooserOpen = () => {
        setPantrySelectionDialogOpen(true);
    }

    const handlePantryChooserClose = (p: Pantry | undefined) => {
        dispatch(setCurrentPantry(p));
        setPantrySelectionDialogOpen(false);
    }


    useEffect(() => {
        if (!currentLanguage) {
            const language = strings.getLanguage();
            dispatch(setLanguage(language));
        }
    }, [])

    return (
        <Grid2 container columns={8}>
            <Grid2 size={8}>
                <AppBarComponent
                    title={strings.profileTitle}
                    rightButton={<Button color={"inherit"} onClick={logout}>{strings.logoutButtonLabel}</Button>}
                />
            </Grid2>
            <Container className="container">
                <Grid2 size={8} container columns={8} className="container">
                    <Grid2 size={2} className={"center"}>
                        <Avatar
                            {...stringAvatar(currentUser?.displayName || "")}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <h2 className={"lobster-font"}>{strings.formatString(strings.profileGreetingsLabel, currentUser?.displayName || "")}</h2>
                    </Grid2>
                </Grid2>
                <Grid2 size={8} className="container">
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <Email/>
                            </ListItemIcon>
                            <ListItemText primary={strings.profileEmailLabel} secondary={currentUser?.email}/>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleClickOpen}>
                                <ListItemIcon>
                                    <Language/>
                                </ListItemIcon>
                                <ListItemText primary={strings.profileLanguageLabel} secondary={currentLanguage}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => setPantryShareDialogOpen(true)}>
                                <IosShareIcon/>
                            </IconButton>
                        }>
                            <ListItemButton onClick={handlePantryChooserOpen}>
                                <ListItemIcon>
                                    <KitchenIcon/>
                                </ListItemIcon>
                                <ListItemText primary={strings.selectedPantryLabel} secondary={currentPantry?.name}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <BugReport/>
                            </ListItemIcon>
                            <ListItemText
                                primary={strings.profileReportBugPrimaryLabel}
                                secondary={strings.profileReportBugSecondaryLabel}
                                onClick={() => window.open("https://github.com/nico-iaco/grocery-fe/issues/new?assignees=&labels=bug&template=bug_report.md&title=BUG+-+", "_blank")}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemIcon>
                                <Info/>
                            </ListItemIcon>
                            <ListItemText
                                primary={strings.profileApplicationVersionLabel}
                                secondary={`v2.0.0-${appVersionDetail}`}
                            />
                        </ListItem>
                        <Divider/>
                    </List>
                </Grid2>
                <Grid2 size={8} className="container footer lobster-font">
                    <p>Made with 💙 by <b><a className={"footer-link"} target={'_blank'}
                                            href={"https://github.com/nico-iaco"}>nico-iaco</a></b></p>
                </Grid2>
            </Container>
            <LanguageSelectionDialogComponent open={open} onClose={handleLanguageChange}
                                              selectedValue={currentLanguage || 'en'}/>
            {pantrySelectionDialogOpen ?
                <PantrySelectionDialogComponent open={pantrySelectionDialogOpen} onClose={handlePantryChooserClose}
                                                selectedValue={currentPantry}/>
                : <div/>
            }
            {pantryShareDialogOpen ?
                <PantryShareDialogComponent open={pantryShareDialogOpen} onClose={() => setPantryShareDialogOpen(false)}
                                            pantryId={currentPantry?.id || ""}/>
                : <div/>
            }
        </Grid2>
    );
}

export default ProfilePage;
