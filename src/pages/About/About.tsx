import React from 'react';

import styles from './About.module.scss';

import MarkdownComponent from '#components/MarkdownComponent/MarkdownComponent';

const About = () => {
  const markdownPage = `# Coming soon`;

  return <MarkdownComponent className={styles.about} markdownString={markdownPage} />;
};

export default About;
