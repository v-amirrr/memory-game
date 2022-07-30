import React from 'react';

import styles from "./Card.module.css";

import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'tween' } },
    exit: { opacity: 0, transition: { duration: 0.4, type: 'tween' } }
};

const Card = ({ data, choiceHandler, flipped, disabled }) => {

    const cardClick = () => {
        if (!disabled) {
            choiceHandler(data);
        }
    }

    return (
        <>
            <motion.div whileTap={{ scale: 0.9 }} className={styles.card} initial='hidden' animate='visible' exit='exit' variants={cardVariants}>
                    <img className={flipped ? styles.cardFrontFlipped : styles.cardFront} src="/img/cover.jpg" onClick={cardClick} />
                    <img className={flipped ? styles.cardBackFlipped : styles.cardBack} src={data.src} />
            </motion.div>
        </>
    );
};

export default Card;