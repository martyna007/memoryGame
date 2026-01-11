import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from "@react-corekit/use-interval";

import Header from './Header';
import Subheader from './Subheader';
import Card from './Card';
import GameOverModal from './GameOverModal';

import plantList from '../data/plants.json';

function GameContainer() {
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [win, setWin] = useState(false);

  useInterval(() => {
    setCount(c => c + 1);
  }, isRunning ? 1000 : null);

  const resetGame = useCallback(() => {
    setCards(prepareCards(plantList));
    setMoves(0);
    setCount(0);
    setWin(false);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  function prepareCards(list) {
    return [...list, ...list]
      .map((card, index) => ({
        ...card,
        id: `${card.matchCardId}-${index}-${Math.random()}`,
        isOpen: false,
        solved: false
      }))
      .sort(() => Math.random() - 0.5);
  }

  function handleClick(id) {
    const clicked = cards.find(c => c.id === id);
    if (!clicked || clicked.solved || clicked.isOpen) return;

    const openUnsolved = cards.filter(c => c.isOpen && !c.solved);

    // If two unmatched cards are open: close them and open the clicked card
    if (
      openUnsolved.length === 2 &&
      openUnsolved[0].matchCardId !== openUnsolved[1].matchCardId
    ) {
      setCards(prev =>
        prev.map(card => {
          if (card.id === id) {
            return { ...card, isOpen: true };
          }
          return card.solved ? card : { ...card, isOpen: false };
        })
      );

      if (!isRunning) setIsRunning(true);
      return;
    }

    // Normal open
    setCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, isOpen: true } : card
      )
    );

    if (!isRunning) setIsRunning(true);
  }

  useEffect(() => {
    const open = cards.filter(c => c.isOpen && !c.solved);
    if (open.length !== 2) return;

    setMoves(m => m + 1);

    if (open[0].matchCardId === open[1].matchCardId) {
      setCards(prev =>
        prev.map(card =>
          card.matchCardId === open[0].matchCardId
            ? { ...card, solved: true }
            : card
        )
      );
    }
  }, [cards]);

  useEffect(() => {
    if (cards.length && cards.every(card => card.solved)) {
      setIsRunning(false);
      setWin(true);
    }
  }, [cards]);

  return (
    <>
      <Header />
      <Subheader moves={moves} time={count} />

      <div className={`game-container ${win ? 'block-view' : ''}`}>
        {cards.map(card => (
          <Card
            key={card.id}
            cardInfo={card}
            clicked={handleClick}
          />
        ))}
      </div>

      {win && (
        <GameOverModal
          onClick={resetGame}
          time={count}
          moves={moves}
        />
      )}
    </>
  );
}

export default GameContainer;
