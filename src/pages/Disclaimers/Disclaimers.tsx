import React from 'react';

import styles from './Disclaimers.module.scss';

import MarkdownComponent from '#components/MarkdownComponent/MarkdownComponent';

const Disclaimers = () => {
  const markdownPage = `# Disclaimers

ROBLOX is a federally-registered trademark of Roblox Corporation. Tankee is not affiliated with Roblox Corporation, and Roblox Corporation has not authorized or had any involvement with the production of any Roblox-themed programming produced or distributed by Tankee.`;

  return <MarkdownComponent className={styles.about} markdownString={markdownPage} />;
};

export default Disclaimers;
