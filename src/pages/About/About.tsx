import React from 'react';

import styles from './About.module.scss';

import MarkdownComponent from '#components/MarkdownComponent/MarkdownComponent';

const About = () => {
  const markdownPage = `# About Us
Tankee is the first kids gaming network! Tankee is the Kidscreen Award Winner for Best Streaming Video Platform and SXSW Pitch Award Winner for Best Entertainment and Content Technology. Tankee is a safe and curated entertainment platform for kids. It features popular games, influencers, and original shows. Tankee is available on many devices so kids can enjoy it at home or on the go. With Tankee, parents can be confident that their kids are having fun in a safe and age-appropriate environment.

Here are some of the features of Tankee:

**Curated content**: All of the content on Tankee is carefully selected to be safe and appropriate for kids.

**Variety of content**: Tankee offers a wide variety of video content, including Minecraft let's play videos, Roblox challenges, Nintendo game play-throughs, hilarious reaction videos, and much more.

**Platform availability**: Tankee is available broadly on several devices, including iOS, Android, Roku, Comcast, Vizio, and Samsung TVs.

Millions of kids have found gaming videos they love watching on Tankee, and we're excited to entertain millions more. If you are looking for a safe and fun way for your kids to enjoy entertainment, Tankee is an excellent option.`;

  return <MarkdownComponent className={styles.about} markdownString={markdownPage} />;
};

export default About;
