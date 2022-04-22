import React from 'react';

import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <p>MADE WITH <span>❤</span> BY <a href='https://github.com/v-amirrr'>ME</a>.</p>
            </div>
        </>
    );
};

export default Footer;