import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d from "../../modules/deckManager.js";
import * as c from "../../modules/cardManager.js";
import { HearthCard } from "../card/HearthCard.js";
import { DeckCard } from "./DeckCard.js";
import { SelectedCard } from "./SelectedCard.js";
import { deleteDeck } from "../../modules/deckManager";

import "./Collection.css";

export const Collection = ({ user }) => {
  const [userDecks, setUserDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [deckSelected, setDeckSelected] = useState(false);
  const navigate = useNavigate();
  //TODO: REPLACE STATIC ID WITH USER ID
  const userId = 1;

  const getUserDecks = (id) => {
    d.getAllUserDecks(id).then((decks) => {
      setUserDecks(decks);
    });
  };

  const getCards = () => {
    c.getAllCards().then((cards) => {
      setCards(cards);
    });
  };

  //TODO: change deckSelected state to an obj of key:value pairs where the key is the cardId and the value is the amt of that card. and increment/decrement based on if the key
  const handleCardClick = (card) => {
    if (deckSelected) {
      let tempDeck = { ...deckSelected };
      tempDeck.deckCards.push(card);
      setDeckSelected(tempDeck);
    } else {
      console.log(card);
    }
  };

  const handleDeckCardClick = (card, index) => {
    let tempDeck = { ...deckSelected };
    tempDeck.deckCards.splice(index, 1);
    setDeckSelected(tempDeck);
  };

  const handleDeckClick = (deck) => {
    setDeckSelected(deck);
  };

  const handleDeleteClick = (deck) => {
    deleteDeck(deck.id);
  };

  const handleDoneClick = () => {
    if (deckSelected) {
      if (deckSelected.id) {
        d.editDeck(deckSelected).then(() => {
          d.UpdateDeckCards(deckSelected).then(() => {
            getUserDecks(userId);
          });
          setDeckSelected(false);
        });
      } else {
        d.addDeck(deckSelected).then((res) => {
          deckSelected.id = res.id;
          d.UpdateDeckCards(deckSelected).then(() => {
            getUserDecks(userId);
          });
        });
        setDeckSelected(false);
      }
    } else {
      navigate("../menu");
    }
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...deckSelected };
    stateToChange[evt.target.id] = evt.target.value;
    setDeckSelected(stateToChange);
  };

  const handleNewDeckClick = () => {
    setDeckSelected({
      name: "New Deck",
      userId: userId,
      deckCode: Math.round(Math.random() * 9001).toString(),
      deckCards: [],
    });
  };

  useEffect(() => {
    getUserDecks(userId);
    getCards();
  }, []);

  return (
    <div className="collection-wrapper">
      <div className="card-display">
        <div className="card-list">
          {cards.map((card) => (
            <div
              className="collection-card"
              key={card.name + "container"}
              onClick={() => handleCardClick(card)}
            >
              <HearthCard card={card} key={card.id} />
            </div>
          ))}
        </div>
      </div>
      {deckSelected ? (
        <div className="deck-display">
          <input
            className="deck-display-title"
            id="name"
            onChange={handleFieldChange}
            value={deckSelected.name}
            required
            autoFocus
          />
          {deckSelected.deckCards.map((card, index) => (
            <div
              className="deck-selected-card"
              key={index + "-container"}
              onClick={() => handleDeckCardClick(card, index)}
            >
              <SelectedCard
                card={card}
                key={card.id}
                deckCards={deckSelected.deckCards}
                deckSelected={deckSelected}
                handleFieldChange={handleFieldChange}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="deck-display">
          <h2 className="deck-display-title">My Decks</h2>
          {userDecks?.map((deck) => (
            <div
              className="deck-card"
              key={deck.name + "container"}
              onClick={() => {
                handleDeckClick(deck);
              }}
            >
              <DeckCard
                deck={deck}
                key={deck.id}
                getUserDecks={() => getUserDecks()}
              />
              <a
                className="delete"
                href="#"
                onClick={() => handleDeleteClick(deck)}
              >
                X
              </a>
            </div>
          ))}
          <button
            className="new-deck-button"
            onClick={() => handleNewDeckClick()}
          >
            New Deck
          </button>
        </div>
      )}
      {deckSelected ? (
        <button className="finish-button" onClick={() => handleDoneClick()}>
          Done
        </button>
      ) : (
        <button className="finish-button" onClick={() => handleDoneClick()}>
          Back
        </button>
      )}

      <div className="search-wrapper"></div>
    </div>
  );
};