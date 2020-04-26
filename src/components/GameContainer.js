import React, { useState, useEffect } from 'react';
import { useInterval } from "@react-corekit/use-interval";

import Header from './Header'
import Subheader from './Subheader'
import Card from './Card'
import GameOverModal from './GameOverModal'

import plantList from '../data/plants.json'
//TODO: add choose your background and choose category

function GameContainer() {
  const [cards, setCards] = useState([]);
  const [cardsOpen, cardOpensNumber] = useState(0);
  const [moves, addMove] = useState(0);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useInterval(
    () => {
      setCount(count + 1);
    },
    isRunning ? 1000 : null
  );

  useEffect(() => {
    setCards(prepareCards(plantList))
    addMove(0)
    setCount(0);
    setWin(false)
    setGameOver(false)
  }, [gameOver])


  function prepareCards(list) {
    let completeList = [...list];

    completeList = completeList.concat([...list])
    completeList = JSON.parse(JSON.stringify(completeList));

    completeList.forEach(function (card) {
      card.id = Math.floor((Math.random() * 1000) + 1)
    });
    completeList.sort(() => Math.random() - 0.5);

    return completeList;
  }

  function handleClick(id) {
    let newCards = cards;
    let clickedCard = newCards.find((card) => { return card.id === id; });
    let currentOpenCards = cardsOpen;
    console.log(currentOpenCards);

    if (currentOpenCards === 0) {
      cardOpensNumber(1);
      setIsRunning(true);
    } else if (currentOpenCards === 1) {
      addMove(moves + 1);
      cardOpensNumber(2)
      console.log(clickedCard);
      console.log(cards.find((card) => { return (card.isOpen && !card.solved) }));
      checkMatch(clickedCard, cards.find((card) => { return (card.isOpen && !card.solved) }));
    } else if (currentOpenCards === 2) {
      cardOpensNumber(1)
      allCardsDown();
    }
    clickedCard.isOpen = true;
  }

  function checkMatch(card1, card2) {
    if (card1.cardId === card2.cardId && card1.id !== card2.id) {
      card1.isOpen = true;
      let newCards = cards;
      newCards.find((card) => { return card.id === card1.id }).solved = true;
      newCards.find((card) => { return card.id === card2.id }).solved = true;

      cardOpensNumber(0)
      setCards(newCards)

      checkWin();
    }
  }

  function allCardsDown() {
    let newCards = cards;

    newCards.forEach((card) => {
      card.isOpen = false;
      if (card.solved) card.isOpen = true;
    });
    setCards(newCards);
  }

  function checkWin() {
    let tempWin = true;
    cards.forEach((card) => {
      if (!card.solved) {
        tempWin = false;
        return;
      }
    });
    if (tempWin) {
      setIsRunning(false);
      console.log(count);
      setWin(true);
    }
  }

  function restartGame() {
    setGameOver(true);
  }

  return (
    <>
      <Header />
      <Subheader moves={moves} time={count}/>
      <div className={"game-container " + (win ? "block-view" : " ")}>
        {cards.map((card, index) => (
          <Card key={index} cardInfo={card} clicked={handleClick} />
        ))}
      </div>
      {win ? <GameOverModal onClick={restartGame} time={count} moves={moves}/> : null}
    </>
  )
}

export default GameContainer;