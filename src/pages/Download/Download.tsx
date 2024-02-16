import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Download.module.scss';

import appStore from '#src/assets/download/app_store.png';
import playStore from '#src/assets/download/play_store.png';
import amazonStore from '#src/assets/download/amazon_store.png';
import rokuStore from '#src/assets/download/roku_store.png';

const Download = () => {
  return (
    <div>
      <title>Download</title>
      <header className={styles.description}>
        <h2>Get Tankee now!</h2>
      </header>
      <main className={styles.main}>
        <div>
          <Link to={'https://apps.apple.com/us/app/tankee/id1339413435?ls=1'} className={styles.imageLink}>
            <img alt={appStore} src={appStore} className={styles.imageLink} />
          </Link>
          <h6 className={styles.description}>Tankee for iPhone, iPads & AppleTV</h6>
        </div>
        <div>
          <Link to={'https://play.google.com/store/apps/details?id=com.tankeeinc.tankee'}>
            <img alt={playStore} src={playStore} />
          </Link>
          <h6 className={styles.description}>Tankee for Android Phones & Tablets</h6>
        </div>
        <div>
          <Link to={'https://www.amazon.com/Tankee-Inc/dp/B07VQHV1M7/ref=sr_1_1?keywords=tankee&qid=1565427411&s=mobile-apps&sr=1-1'}>
            <img alt={amazonStore} src={amazonStore} />
          </Link>
          <h6 className={styles.description}>Tankee for Kindle Fire Tablets</h6>
        </div>
        <div>
          <Link to={'https://channelstore.roku.com/en-ot/details/accae28b3787770272483f98e0c8e043/tankee-minecraft-roblox-and-more'}>
            <img alt={rokuStore} src={rokuStore} />
          </Link>
          <h6 className={styles.description}>Tankee for Roku devices & TV&apos;s</h6>
        </div>
      </main>
    </div>
  );
};

export default Download;
