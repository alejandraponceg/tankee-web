import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Download.module.scss';

import appStore from '#src/assets/download/app_store.png';
import playStore from '#src/assets/download/play_store.png';
import amazonStore from '#src/assets/download/amazon_store.png';
import rokuStore from '#src/assets/download/roku_store.png';

const Download = () => {
  return (
    <div className={styles.search}>
      <title>Download</title>
      <header className={styles.header}>
        <h2>Get Tankee now!</h2>
      </header>
      <main className={styles.main}>
        <div>
          <Link to={'https://apps.apple.com/us/app/tankee/id1339413435?ls=1'}>
            <img alt={appStore} src={appStore} />
          </Link>
          <text>Tankee for iPhone, iPads & AppleTV</text>
        </div>
        <div>
          <Link to={'https://play.google.com/store/apps/details?id=com.tankeeinc.tankee'}>
            <img alt={playStore} src={playStore} />
          </Link>
          <text>Tankee for Android Phones & Tablets</text>
        </div>
        <div>
          <Link to={'https://www.amazon.com/Tankee-Inc/dp/B07VQHV1M7/ref=sr_1_1?keywords=tankee&qid=1565427411&s=mobile-apps&sr=1-1'}>
            <img alt={amazonStore} src={amazonStore} />
          </Link>
          <text>Tankee for Kindle Fire Tablets</text>
        </div>
        <div>
          <Link to={'https://channelstore.roku.com/en-ot/details/accae28b3787770272483f98e0c8e043/tankee-minecraft-roblox-and-more'}>
            <img alt={rokuStore} src={rokuStore} />
          </Link>
          <text>Tankee for Roku devices & TV&apos;s</text>
        </div>
      </main>
    </div>
  );
};

export default Download;
