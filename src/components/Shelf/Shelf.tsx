import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import styles from './Shelf.module.scss';

import useBreakpoint, { Breakpoint, Breakpoints } from '#src/hooks/useBreakpoint';
import ChevronLeft from '#src/icons/ChevronLeft';
import ChevronRight from '#src/icons/ChevronRight';
import type { AccessModel, ContentType } from '#types/Config';
import { isLocked } from '#src/utils/entitlements';
import TileDock from '#components/TileDock/TileDock';
import Card, { type PosterAspectRatio } from '#components/Card/Card';
import type { Playlist, PlaylistItem } from '#types/playlist';
import { mediaURL } from '#src/utils/formatting';
import { PersonalShelf } from '#src/config';
import { isRoundIcon } from '#src/utils/tankee';

export const tileBreakpoints: Breakpoints = {
  [Breakpoint.xs]: 1,
  [Breakpoint.sm]: 2,
  [Breakpoint.md]: 3,
  [Breakpoint.lg]: 4,
  [Breakpoint.xl]: 5,
};

export const featuredTileBreakpoints: Breakpoints = {
  [Breakpoint.xs]: 1,
  [Breakpoint.sm]: 1,
  [Breakpoint.md]: 1,
  [Breakpoint.lg]: 1,
  [Breakpoint.xl]: 1,
};

export type ShelfProps = {
  playlist: Playlist;
  type: ContentType;
  onCardHover?: (playlistItem: PlaylistItem) => void;
  watchHistory?: { [key: string]: number };
  enableTitle?: boolean;
  enableCardTitles?: boolean;
  featured?: boolean;
  loading?: boolean;
  error?: unknown;
  title?: string;
  accessModel: AccessModel;
  isLoggedIn: boolean;
  hasSubscription: boolean;
  posterAspect?: PosterAspectRatio;
  visibleTilesDelta?: number;
};

const Shelf = ({
  playlist,
  type,
  onCardHover,
  title,
  watchHistory,
  featured = false,
  loading = false,
  error = null,
  accessModel,
  isLoggedIn,
  hasSubscription,
  posterAspect,
  visibleTilesDelta = 0,
}: ShelfProps) => {
  const breakpoint: Breakpoint = useBreakpoint();
  const { t } = useTranslation('common');
  const [didSlideBefore, setDidSlideBefore] = useState(false);
  const tilesToShow: number = (featured ? featuredTileBreakpoints[breakpoint] : tileBreakpoints[breakpoint]) + visibleTilesDelta;
  const isRound = isRoundIcon(playlist);
  const posterAspectToUse = isRound ? '4:3' : posterAspect;
  const renderTile = useCallback(
    (item: PlaylistItem, isInView: boolean) => {
      const url = mediaURL({ media: item, playlistId: playlist.feedid, play: type === PersonalShelf.ContinueWatching });
      return (
        <Card
          key={item.mediaid}
          progress={watchHistory ? watchHistory[item.mediaid] : undefined}
          onHover={typeof onCardHover === 'function' ? () => onCardHover(item) : undefined}
          featured={featured}
          disabled={!isInView}
          loading={loading}
          isLocked={isLocked(accessModel, isLoggedIn, hasSubscription, item)}
          posterAspect={posterAspectToUse}
          item={item}
          url={url}
          isRound={isRound}
        />
      );
    },
    [watchHistory, onCardHover, featured, loading, accessModel, isLoggedIn, hasSubscription, playlist.feedid, type, isRound, posterAspectToUse],
  );

  const renderRightControl = useCallback(
    (doSlide: () => void) => (
      <div
        className={styles.chevron}
        role="button"
        tabIndex={0}
        aria-label={t('slide_right')}
        onKeyDown={(event: React.KeyboardEvent) => (event.key === 'Enter' || event.key === ' ') && handleSlide(doSlide)}
        onClick={() => handleSlide(doSlide)}
      >
        <ChevronRight />
      </div>
    ),
    [t],
  );

  const renderLeftControl = useCallback(
    (doSlide: () => void) => (
      <div
        className={classNames(styles.chevron, {
          [styles.disabled]: !didSlideBefore,
        })}
        role="button"
        tabIndex={didSlideBefore ? 0 : -1}
        aria-label={t('slide_left')}
        onKeyDown={(event: React.KeyboardEvent) => (event.key === 'Enter' || event.key === ' ') && handleSlide(doSlide)}
        onClick={() => handleSlide(doSlide)}
      >
        <ChevronLeft />
      </div>
    ),
    [didSlideBefore, t],
  );

  const renderPaginationDots = (index: number, pageIndex: number) => (
    <span key={pageIndex} className={classNames(styles.dot, { [styles.active]: index === pageIndex })} />
  );

  const handleSlide = (doSlide: () => void): void => {
    setDidSlideBefore(true);
    doSlide();
  };

  if (error || !playlist?.playlist) return <h2 className={styles.error}>Could not load items</h2>;

  return (
    <div className={classNames(styles.shelf, { [styles.featured]: featured })}>
      {!featured ? <h2 className={classNames(styles.title, { [styles.loading]: loading })}>{title || playlist.title}</h2> : null}
      <TileDock<PlaylistItem>
        items={playlist.playlist}
        tilesToShow={tilesToShow}
        wrapWithEmptyTiles={featured && playlist.playlist.length === 1}
        cycleMode={'restart'}
        showControls={!matchMedia('(hover: none)').matches && !loading}
        showDots={featured}
        transitionTime={'0.3s'}
        spacing={8}
        renderLeftControl={renderLeftControl}
        renderRightControl={renderRightControl}
        renderPaginationDots={renderPaginationDots}
        renderTile={renderTile}
      />
    </div>
  );
};

export default Shelf;
