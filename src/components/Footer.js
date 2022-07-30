import React from 'react';

import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <>
            <div className={styles.footer}>
                <p>Made With <span>❤</span> By <a className='link' target="_blank" href='https://amirvalizadeh.netlify.app/'>ME</a>.</p>
            </div>
        </>
    );
};

export default Footer;