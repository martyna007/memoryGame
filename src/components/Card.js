import React from 'react';

function Card(props) {
    const card = props.cardInfo
    return (
        <div className={"card-container " + (card.isOpen ? "open" : " ")} onClick={() => props.clicked(card.id)}>
            <div className="flipper">
                <div className="front">

                </div>
                <div className="back" style={{ backgroundImage: `url(${card.img})` }}>
                    <div className="name">{card.name}, cardId: {card.cardId}, ID: {card.id}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;