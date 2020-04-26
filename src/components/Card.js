import React from 'react';

function Card(props) {
    const card = props.cardInfo
    return (
        <div className={"card-container " + (card.isOpen ? "open" : " ")} onClick={card.solved || card.isOpen ? null : () => props.clicked(card.id)}>
            <div className="flipper">
                <div className="front" style={{ backgroundImage: `url(./images/bg.jpg)` }}>

                </div>
                <div className="back" style={{ backgroundImage: `url(${card.img})` }}>
                    <div className={"name" + (card.solved ? " show" : " ")}>{card.name}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;