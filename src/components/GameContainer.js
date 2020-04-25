import React, { useState, useEffect } from 'react';

import Header from './Header'
import Subheader from './Subheader'
import Card from './Card'

import plantList from '../data/plants.json'

function GameContainer() {
  const [cards, setCards] = useState([]);
  const [cardsOpen, cardOpensNumber] = useState(0);
  const [moves, addMove] = useState(0);
  const [score, addPoint] = useState(0);
  const [win, setWin] = useState(false);

  useEffect(() => {
    setCards(prepareCards(plantList))
    addMove(0)
    addPoint(0)
    setWin(false)
  }, [win])


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
    console.log(clickedCard);

    if (currentOpenCards === 0) {
      //startTimer();
      cardOpensNumber(1);

    } else if (currentOpenCards === 1) {
      addMove(moves + 1);
      cardOpensNumber(2)
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
      //stopTimer();
      setWin(true)
    }
  }

  return (
    <>
      <Header />
      <Subheader moves={moves} score={score} />
      <div>
        {cards.map((card, index) => (
          <Card key={index} cardInfo={card} clicked={handleClick} />
        ))}
      </div>
    </>
  )
}

export default GameContainer;