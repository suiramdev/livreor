import React, {useMemo, useState} from "react";
import axios from "axios";
import "./Admin.scss";
import {useNavigate} from "react-router-dom";
import TinderCard from "react-tinder-card";
import {Close, CloudDone, CloudOff, Delete, Fullscreen, Logout} from "@mui/icons-material";

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
    const [swipeIndex, setSwipeIndex] = useState(content.length - 1);
    const cardRefs = useMemo(() => Array(content.length).fill(0).map(React.createRef), [])
    const [cardFullscreen, setCardFullscreen] = useState(false);

    async function disconnect() {
        await axios.post("api/admin/logout");
        navigate(0);
    }

    function onSwipe(index) {
        setSwipeIndex(index - 1);
    }

    return (
        <div className="Admin">
            <button className="Disconnect" onClick={disconnect}><Logout/></button>
            <div className="CardList">
                {content.map((c, i) => (
                    <TinderCard preventSwipe={["down"]}
                                className="Card"
                                onSwipe={() => onSwipe(i)}
                                ref={cardRefs[i]}
                                key={i}>
                        <div style={{backgroundImage: "url("+c.image+")"}}>
                            <div>
                                <span className="Card__Author">{c.author}</span>
                                <span className="Card__Message">{c.message}</span>
                            </div>
                            <button className="Card__Fullscreen" onClick={() => setCardFullscreen(true)}><Fullscreen/></button>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="CardButtons">
                <button onClick={() => cardRefs[swipeIndex].current.swipe("left")}><Delete/></button>
                <button onClick={() => cardRefs[swipeIndex].current.swipe("up")}><CloudOff/></button>
                <button onClick={() => cardRefs[swipeIndex].current.swipe("right")}><CloudDone/></button>
            </div>
            {cardFullscreen && (
                <div className="CardPopup">
                    <div>
                        <img src={content[swipeIndex].image}/>
                        <button className="CardPopup__Close" onClick={() => setCardFullscreen(false)}><Close/></button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Admin;