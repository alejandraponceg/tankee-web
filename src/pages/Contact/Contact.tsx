import React from 'react';

import styles from './Contact.module.scss';

import MarkdownComponent from '#components/MarkdownComponent/MarkdownComponent';

const Contact = () => {
  const markdownPage = `# Coming soon`;

  return <MarkdownComponent className={styles.contact} markdownString={markdownPage} />;
};

export default Contact;
