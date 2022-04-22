import React, { useState, useEffect } from 'react';

import styles from "./GamePage.module.css";

import Card from './Card';
import Footer from './Footer';

const cardImages = [
    { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
    { "src": "/img/sword-1.png", matched: false }
]

const GamePage = () => {

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
        setChoiceOne(null);
        setChoiceTwo(null);
    }

    const choiceHandler = card => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card;
                        }
                    })
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn() ,1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    useEffect(() => {
        shuffleCards();
    }, []);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(turns + 1);
        setDisabled(false);
    }

    return (
        <>
            <div className={styles.gamePage}>
                <div className={styles.header}>
                    <h1>Memory Game</h1>
                    <button onClick={shuffleCards}>New Game</button>
                    <p>Turns: {turns}</p>
                </div>

                <div className={styles.cards}>
                        {cards.map(item => 
                        <Card 
                            key={item.id} 
                            data={item} 
                            choiceHandler={choiceHandler} 
                            flipped={item === choiceOne || item === choiceTwo || item.matched}
                            disabled={disabled}
                        />)}
                </div>
                
                <Footer />
            </div>
        </>
    );
};

export default GamePage;