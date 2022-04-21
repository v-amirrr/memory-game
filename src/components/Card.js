import React from 'react';

import styles from "./Card.module.css";

const Card = ({ data, choiceHandler, flipped, disabled }) => {

    const cardClick = () => {
        if (!disabled) {
            choiceHandler(data);
        }
    }

    return (
        <>
            <div className={styles.card}>
                    <img className={flipped ? styles.cardFrontFlipped : styles.cardFront} src="/img/cover.jpg" onClick={cardClick} />
                    <img className={flipped ? styles.cardBackFlipped : styles.cardBack} src={data.src} />
            </div>
        </>
    );
};

export default Card;