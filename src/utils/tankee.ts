import type { Playlist } from '#types/playlist';

export const isRoundIcon = (playlist: Playlist) => {
  if (playlist.feedid) {
    return ['yGSsGFRL', 'zRc7ZRiM', 'pSbIBRsc'].includes(playlist.feedid);
  } else {
    return ['creators', 'games', 'tankee originals'].includes(playlist.title.toLowerCase());
  }
};

export const openInNewTab = (url: string) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
