import React from 'react';

function GameOverModal({onClick, time, moves}) {

    return (
        <div className="game-over">
            <h1>Congratulations!</h1>
            <h3>You win this in in {time} seconds, and with {moves} moves!</h3>
            <div className="btn" onClick={onClick}>Restart</div>
        </div>
    )
}

export default GameOverModal;