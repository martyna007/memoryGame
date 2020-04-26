import React from 'react';

function Subheader({ moves, time }) {
    return (
        <div className="subheader">
            <h4>Time: {time}</h4>
            <h4>Moves: {moves}</h4>
        </div>
    )
}

export default Subheader;