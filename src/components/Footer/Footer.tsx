import React from 'react';

import styles from './Footer.module.scss';

import logo from '#src/assets/footer/logo.svg';
import getApp from '#src/assets/footer/getApp.svg';
import kidSafe from '#src/assets/footer/kidSafe.png';

type Props = {
  onLogoClick?: () => void;
  onGetAppClick?: () => void;
  onKidsSafeClick?: () => void;
  onAboutUsClick?: () => void;
  onContactClick?: () => void;
  onDisclaimersClick?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
  onOriginalsClick?: () => void;
  onGamesClick?: () => void;
  onCreatorsClick?: () => void;
};

const Footer: React.FC<Props> = ({
  onLogoClick,
  onGetAppClick,
  onKidsSafeClick,
  onAboutUsClick,
  onContactClick,
  onDisclaimersClick,
  onTermsClick,
  onPrivacyClick,
  onOriginalsClick,
  onGamesClick,
  onCreatorsClick,
}) => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.cards}>
        <div className={styles.cardImages}>
          <div>
            <img src={logo} alt={logo} className={styles.logo} onClick={onLogoClick} />
          </div>
          <div>
            <img src={getApp} alt={getApp} className={styles.getApp} onClick={onGetAppClick} />
          </div>
          <div>
            <img src={kidSafe} alt={kidSafe} className={styles.kidSafe} onClick={onKidsSafeClick} />
          </div>
        </div>
        <div className={styles.cardAbout}>
          <h6 className={styles.aboutHeader}>About</h6>
          <h6 className={styles.aboutUs} onClick={onAboutUsClick}>
            About Tankee
          </h6>
          <h6 className={styles.contact} onClick={onContactClick}>
            Contact Us
          </h6>
        </div>
        <div className={styles.card}>
          <h6 className={styles.legal}>Legal</h6>
          <h6 className={styles.disclaimers} onClick={onDisclaimersClick}>
            Disclaimers
          </h6>
          <h6 className={styles.terms} onClick={onTermsClick}>
            Terms of Use
          </h6>
          <h6 className={styles.privacy} onClick={onPrivacyClick}>
            Privacy Policy
          </h6>
        </div>
        <div className={styles.card}>
          <h6 className={styles.links}>Quick Links</h6>
          <h6 className={styles.originals} onClick={onOriginalsClick}>
            Tankee Original Series
          </h6>
          <h6 className={styles.games} onClick={onGamesClick}>
            Game Channels
          </h6>
          <h6 className={styles.creators} onClick={onCreatorsClick}>
            Creator Channels
          </h6>
        </div>
      </div>
      <h6 className={styles.copy}>&copy;2024 Copyright | All rights reserved</h6>
    </footer>
  );
};
export default Footer;
