import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './CardGrid.module.scss';

import useBreakpoint, { Breakpoint, Breakpoints } from '#src/hooks/useBreakpoint';
import { isLocked } from '#src/utils/entitlements';
import Card from '#components/Card/Card';
import type { AccessModel } from '#types/Config';
import type { Playlist, PlaylistItem } from '#types/playlist';
import { parseAspectRatio, parseTilesDelta } from '#src/utils/collection';
import InfiniteScrollLoader from '#components/InfiniteScrollLoader/InfiniteScrollLoader';
import { isRoundIcon } from '#src/utils/tankee';

const INITIAL_ROW_COUNT = 6;
const LOAD_ROWS_COUNT = 4;

const defaultCols: Breakpoints = {
  [Breakpoint.xs]: 2,
  [Breakpoint.sm]: 2,
  [Breakpoint.md]: 3,
  [Breakpoint.lg]: 4,
  [Breakpoint.xl]: 5,
};

type CardGridProps = {
  playlist: Playlist;
  watchHistory?: { [key: string]: number };
  isLoading: boolean;
  cols?: Breakpoints;
  currentCardItem?: PlaylistItem;
  currentCardLabel?: string;
  accessModel: AccessModel;
  isLoggedIn: boolean;
  hasSubscription: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
  onCardHover?: (item: PlaylistItem) => void;
  getUrl: (item: PlaylistItem) => string;
};

function CardGrid({
  playlist,
  watchHistory,
  isLoading = false,
  cols = defaultCols,
  currentCardItem,
  currentCardLabel,
  accessModel,
  isLoggedIn,
  hasSubscription,
  hasMore,
  getUrl,
  loadMore,
  onCardHover,
}: CardGridProps) {
  const breakpoint: Breakpoint = useBreakpoint();
  const isRound = isRoundIcon(playlist);
  const posterAspect = isRound ? '4:3' : parseAspectRatio(playlist.cardImageAspectRatio || playlist.shelfImageAspectRatio);
  const visibleTiles = cols[breakpoint] + parseTilesDelta(posterAspect);
  const [rowCount, setRowCount] = useState(INITIAL_ROW_COUNT);

  const defaultLoadMore = () => setRowCount((current) => current + LOAD_ROWS_COUNT);
  const defaultHasMore = rowCount * visibleTiles < playlist.playlist.length;

  useEffect(() => {
    // reset row count when the page changes
    setRowCount(INITIAL_ROW_COUNT);
  }, [playlist.feedid]);

  const renderTile = (playlistItem: PlaylistItem) => {
    const { mediaid } = playlistItem;

    return (
      <div className={styles.cell} key={mediaid} role="row">
        <div role="cell">
          <Card
            progress={watchHistory ? watchHistory[mediaid] : undefined}
            url={getUrl(playlistItem)}
            onHover={typeof onCardHover === 'function' ? () => onCardHover(playlistItem) : undefined}
            loading={isLoading}
            isCurrent={currentCardItem && currentCardItem.mediaid === mediaid}
            currentLabel={currentCardLabel}
            isLocked={isLocked(accessModel, isLoggedIn, hasSubscription, playlistItem)}
            posterAspect={posterAspect}
            item={playlistItem}
            isRound={isRound}
          />
        </div>
      </div>
    );
  };

  return (
    <InfiniteScroll pageStart={0} loadMore={loadMore ?? defaultLoadMore} hasMore={hasMore ?? defaultHasMore} loader={<InfiniteScrollLoader key="loader" />}>
      <div className={classNames(styles.container, styles[`cols-${visibleTiles}`])} role="grid">
        {/* When loadMore is present -> we get accumulated data (playlist.playlist) from the outside (we do it for series) 
            When not -> we hide some cards visually to save some computing resources spent on rendering */}
        {(loadMore ? playlist.playlist : playlist.playlist.slice(0, rowCount * visibleTiles)).map(renderTile)}
      </div>
    </InfiniteScroll>
  );
}

export default CardGrid;
