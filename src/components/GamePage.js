import React, { useState, useEffect } from 'react';

import styles from "./GamePage.module.css";

import Card from './Card';
import Footer from './Footer';

import { motion, AnimatePresence } from 'framer-motion';

const cardImages = [
    { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
    { "src": "/img/sword-1.png", matched: false }
]

const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const cardsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

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
            <motion.div className={styles.gamePage} initial='hidden' animate='visible' exit='exit' variants={pageVariants}>
                <div className={styles.header}>
                    <h1>memory game</h1>
                    <motion.button onClick={shuffleCards} whileTap={{ scale: 0.9 }}>New Game</motion.button>
                    <p>Turns: {turns}</p>
                </div>
                
                <motion.div key="card" className={styles.cards} variants={cardsVariants}>
                    {
                        cards.map(item => 
                            <Card 
                                key={item.id} 
                                data={item} 
                                choiceHandler={choiceHandler} 
                                flipped={item === choiceOne || item === choiceTwo || item.matched}
                                disabled={disabled}
                            />
                        )
                    }
                </motion.div>
            </motion.div>
        </>
    );
};

export default GamePage;