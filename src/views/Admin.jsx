import React, {useMemo, useReducer} from "react";
import "./Admin.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import TinderCard from "react-tinder-card";
import {Box, Button, Divider, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from "@mui/material";
import {
    Book,
    Close,
    CloudDone,
    CloudOff,
    Delete,
    Fullscreen,
    Logout,
    Menu,
    SmartDisplay,
    Undo
} from "@mui/icons-material";
import TinderCardButton from "../components/TinderCardButton";

const content = [
    {
        author: "Jean-Pierre",
        message: "C'était d'incroyables vacances passés avec vous !",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Colombus_Isle.JPG/1200px-Colombus_Isle.JPG"
    },
    {
        author: "Bernadette",
        message: "Tu as grandi !",
        image: "https://i.pinimg.com/originals/50/a3/55/50a3556610ab5bf312363b72a46f4466.jpg"
    },
    {
        author: "Odette",
        message: "Bonne anniversaire Henry !!!",
        image: "https://cdn-s-www.leprogres.fr/images/5E640ABC-B930-40B6-8ECE-4E239A28CC8E/NW_raw/l-instant-photo-avant-de-passer-a-table-photo-progres-bernard-moiroud-1565472143.jpg"
    }
];

const Admin = () => {
    const navigate = useNavigate();
    const [state, setState] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            swipeIndex: content.length - 1,
            cardFullscreen: false,
            drawer: false
        }
    );
    const cardRefs = useMemo(() => Array(content.length).fill(0).map(React.createRef), [])

    async function disconnect() {
        await axios.post("api/admin/logout");
        navigate(0);
    }

    function onSwipe(index) {
        setState({swipeIndex: index -1});
    }

    return (
        <>
            <div className="Admin">
                <button className="Drawer" onClick={() => setState({drawer: true})}><Menu/></button>
                <div className="CardList">
                    {content.map((c, i) => (
                        <TinderCard preventSwipe={["down"]}
                                    className="Card"
                                    onSwipe={() => onSwipe(i)}
                                    ref={cardRefs[i]}
                                    key={i}>
                            <Box style={{backgroundImage: "url("+c.image+")"}}>
                                <Box>
                                    <span className="Card__Author">{c.author}</span>
                                    <span className="Card__Message">{c.message}</span>
                                </Box>
                                <button className="Card__Fullscreen" onClick={() => setState({cardFullscreen: true})}><Fullscreen/></button>
                            </Box>
                        </TinderCard>
                    ))}
                </div>
                <div className="CardButtons">
                    <TinderCardButton action="undo"
                                      onClick={() => {
                                          cardRefs[state.swipeIndex+1].current.restoreCard();
                                          setState({swipeIndex: state.swipeIndex+1});
                                      }}><Undo/></TinderCardButton>
                    <TinderCardButton action="delete"
                                      onClick={() => cardRefs[state.swipeIndex].current.swipe("left")}><Delete/></TinderCardButton>
                    <TinderCardButton action="mid"
                                      onClick={() => cardRefs[state.swipeIndex].current.swipe("up")}><CloudOff/></TinderCardButton>
                    <TinderCardButton action="like"
                                      onClick={() => cardRefs[state.swipeIndex].current.swipe("right")}><CloudDone/></TinderCardButton>
                </div>
                {state.cardFullscreen && (
                    <div className="CardPopup">
                        <div>
                            <img src={content[state.swipeIndex].image}/>
                            <button className="CardPopup__Close" onClick={() => setState({cardFullscreen: false})}><Close/></button>
                        </div>
                    </div>
                )}
            </div>
            <SwipeableDrawer anchor="left" open={state.drawer}
                             onClose={() => setState({drawer: false})}>
                <Box sx={{width: 300}}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <SmartDisplay/>
                            </ListItemIcon>
                            <ListItemText primary="Affichage"/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <Book/>
                            </ListItemIcon>
                            <ListItemText primary="Créer un livre d'or"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button onClick={disconnect}>
                            <ListItemIcon>
                                <Logout/>
                            </ListItemIcon>
                            <ListItemText primary="Se déconnecter"/>
                        </ListItem>
                    </List>
                </Box>
            </SwipeableDrawer>
        </>
    )
}

export default Admin;