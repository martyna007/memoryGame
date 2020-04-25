import React from 'react';

function Subheader({moves, score}) {
    return (
        <div className="subheader">
            <h4>Time: </h4>
            <h4>Moves: {moves}</h4>
            <h4>Score: {score}</h4>
        </div>
    )
}

export default Subheader;