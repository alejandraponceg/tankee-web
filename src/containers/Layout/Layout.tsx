import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router';
import shallow from 'zustand/shallow';
import classNames from 'classnames';

import styles from './Layout.module.scss';

import { useAccountStore } from '#src/stores/AccountStore';
import { useUIStore } from '#src/stores/UIStore';
import { useConfigStore } from '#src/stores/ConfigStore';
import useSearchQueryUpdater from '#src/hooks/useSearchQueryUpdater';
import Button from '#components/Button/Button';
import MarkdownComponent from '#components/MarkdownComponent/MarkdownComponent';
import Header from '#components/Header/Header';
import Sidebar from '#components/Sidebar/Sidebar';
import MenuButton from '#components/MenuButton/MenuButton';
import UserMenu from '#components/UserMenu/UserMenu';
import { addQueryParam } from '#src/utils/location';
import { getSupportedLanguages } from '#src/i18n/config';
import { ACCESS_MODEL } from '#src/config';
import { useProfileStore } from '#src/stores/ProfileStore';
import { useProfiles, useSelectProfile } from '#src/hooks/useProfiles';
import { IS_DEVELOPMENT_BUILD } from '#src/utils/common';
import ProfileController from '#src/stores/ProfileController';
import { getModule } from '#src/modules/container';
import Footer from '#components/Footer/Footer';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common');

  const { config, accessModel, clientId } = useConfigStore(({ config, accessModel, clientId }) => ({ config, accessModel, clientId }), shallow);
  const isLoggedIn = !!useAccountStore(({ user }) => user);
  const favoritesEnabled = !!config.features?.favoritesList;
  const { menu, assets, siteName, description, styling, features } = config;
  const metaDescription = description || t('default_description');

  const profileController = getModule(ProfileController, false);

  const { searchPlaylist } = features || {};
  const { footerText } = styling || {};
  const supportedLanguages = useMemo(() => getSupportedLanguages(), []);
  const currentLanguage = useMemo(() => supportedLanguages.find(({ code }) => code === i18n.language), [i18n.language, supportedLanguages]);

  const {
    query: { data: { responseData: { collection: profiles = [] } = {} } = {} },
    profilesEnabled,
  } = useProfiles();

  const selectProfile = useSelectProfile();

  const { searchQuery, searchActive, userMenuOpen, languageMenuOpen } = useUIStore(
    ({ searchQuery, searchActive, userMenuOpen, languageMenuOpen }) => ({
      languageMenuOpen,
      searchQuery,
      searchActive,
      userMenuOpen,
    }),
    shallow,
  );
  const { updateSearchQuery, resetSearchQuery } = useSearchQueryUpdater();
  const { profile } = useProfileStore();

  const searchInputRef = useRef<HTMLInputElement>(null) as React.MutableRefObject<HTMLInputElement>;

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const banner = assets.banner;

  useEffect(() => {
    if (isLoggedIn && profilesEnabled && !profiles?.length) {
      profileController?.unpersistProfile();
    }
    // Trigger once on the initial page load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchActive]);

  const searchButtonClickHandler = () => {
    useUIStore.setState({
      searchActive: true,
      preSearchPage: location,
    });
  };

  const closeSearchButtonClickHandler = () => {
    resetSearchQuery();

    useUIStore.setState({
      searchActive: false,
    });
  };

  const loginButtonClickHandler = () => {
    navigate(addQueryParam(location, 'u', 'login'));
  };

  const signUpButtonClickHandler = () => {
    navigate(addQueryParam(location, 'u', 'create-account'));
  };

  const downloadButtonClickHandler = () => {
    navigate('/t/download/');
  };

  const homeClickHandler = () => {
    navigate('/');
  };

  const kidSafeClickHandler = () => {
    window.location.href = 'https://www.kidsafeseal.com/certifiedproducts/tankee_app.html';
  };

  const aboutUsClickHandler = () => {
    navigate('/t/about/');
  };

  const contactUsClickHandler = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfRfZum1LbqrjEzIRZFcwu0BMl6v-GNlE3bZdHdO1_icBso_A/viewform?embedded=true';
  };

  const disclaimersClickHandler = () => {
    navigate('/t/disclaimers/');
  };

  const termsClickHandler = () => {
    navigate('/t/terms/');
  };

  const privacyClickHandler = () => {
    navigate('/t/privacy/');
  };

  const originalsClickHandler = () => {
    navigate('/p/pSbIBRsc/');
  };

  const gamesClickHandler = () => {
    navigate('/p/yGSsGFRL/');
  };

  const creatorsClickHandler = () => {
    navigate('/p/zRc7ZRiM/');
  };

  const languageClickHandler = async (code: string) => {
    await i18n.changeLanguage(code);
  };

  // useCallbacks are used here to fix a bug in the Popover when using a Reactive onClose callback
  const openUserMenu = useCallback(() => useUIStore.setState({ userMenuOpen: true }), []);
  const closeUserMenu = useCallback(() => useUIStore.setState({ userMenuOpen: false }), []);
  const openLanguageMenu = useCallback(() => useUIStore.setState({ languageMenuOpen: true }), []);
  const closeLanguageMenu = useCallback(() => useUIStore.setState({ languageMenuOpen: false }), []);

  const renderUserActions = () => {
    if (!clientId) return null;

    return isLoggedIn ? (
      <UserMenu showPaymentsItem={accessModel !== ACCESS_MODEL.AVOD} favoritesEnabled={favoritesEnabled} />
    ) : (
      <div className={styles.buttonContainer}>
        <Button fullWidth onClick={loginButtonClickHandler} label={t('sign_in')} />
        <Button variant="contained" color="primary" onClick={signUpButtonClickHandler} label={t('sign_up')} fullWidth />
      </div>
    );
  };

  return (
    <div className={styles.layout}>
      <Helmet>
        <title>{siteName}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:title" content={siteName} />
        <meta name="twitter:title" content={siteName} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          httpEquiv="Content-Security-Policy"
          content={`
                      default-src 'self';
                      img-src https://img.jwplayer.com https://cdn.jwplayer.com https://assets-jpcust.jwpsrv.com http://prd.jwpltx.com http://ping-meta-prd.jwpltx.com https://development.tankee.com https://tankee.com 'self';
                      frame-src https://docs.google.com;
                      worker-src https://www.google.com/recaptcha/api2/webworker.js 'self' data: blob: *;
                      connect-src https://analytics.google.com https://stats.g.doubleclick.net https://cdn.jwplayer.com https://ihe.jwpltx.com https://assets-jpcust.jwpsrv.com  https://videos-cloudfront-usp.jwpsrv.com;
                      script-src-elem https://www.googletagmanager.com https://cdn.jwplayer.com http://ssl.p.jwpcdn.com http://www.gstatic.com;
                      media-src 'self' data: blob: *;
                      style-src 'unsafe-inline';
                      style-src-elem https://development.tankee.com https://tankee.com 'unsafe-inline';
                `}
        />
      </Helmet>
      <div className={styles.main}>
        <Header
          onMenuButtonClick={() => setSideBarOpen(true)}
          downloadButtonClick={downloadButtonClickHandler}
          logoSrc={banner}
          searchEnabled={!!searchPlaylist}
          searchBarProps={{
            query: searchQuery,
            onQueryChange: (event) => updateSearchQuery(event.target.value),
            onClearButtonClick: () => updateSearchQuery(''),
            inputRef: searchInputRef,
          }}
          searchActive={searchActive}
          onSearchButtonClick={searchButtonClickHandler}
          onCloseSearchButtonClick={closeSearchButtonClickHandler}
          onLoginButtonClick={loginButtonClickHandler}
          onSignUpButtonClick={signUpButtonClickHandler}
          onLanguageClick={languageClickHandler}
          supportedLanguages={supportedLanguages}
          currentLanguage={currentLanguage}
          isLoggedIn={isLoggedIn}
          userMenuOpen={userMenuOpen}
          languageMenuOpen={languageMenuOpen}
          openUserMenu={openUserMenu}
          closeUserMenu={closeUserMenu}
          openLanguageMenu={openLanguageMenu}
          closeLanguageMenu={closeLanguageMenu}
          canLogin={!!clientId}
          showPaymentsMenuItem={accessModel !== ACCESS_MODEL.AVOD}
          favoritesEnabled={favoritesEnabled}
          profilesData={{
            currentProfile: profile,
            profiles,
            profilesEnabled,
            selectProfile: ({ avatarUrl, id }) => selectProfile.mutate({ id, avatarUrl }),
            isSelectingProfile: !!selectProfile.isLoading,
          }}
        >
          <Button label={t('home')} to="/" variant="text" />
          {menu.map((item) => (
            <Button key={item.contentId} label={item.label} to={`/p/${item.contentId}`} variant="text" />
          ))}
        </Header>
        <Sidebar isOpen={sideBarOpen} onClose={() => setSideBarOpen(false)}>
          <MenuButton label={t('home')} to="/" tabIndex={sideBarOpen ? 0 : -1} />
          {menu.map((item) => (
            <MenuButton key={item.contentId} label={item.label} to={`/p/${item.contentId}`} tabIndex={sideBarOpen ? 0 : -1} />
          ))}
          <hr className={styles.divider} />
          {renderUserActions()}
        </Sidebar>
        <Outlet />
        <Footer
          onLogoClick={homeClickHandler}
          onGetAppClick={downloadButtonClickHandler}
          onKidsSafeClick={kidSafeClickHandler}
          onAboutUsClick={aboutUsClickHandler}
          onContactClick={contactUsClickHandler}
          onDisclaimersClick={disclaimersClickHandler}
          onTermsClick={termsClickHandler}
          onPrivacyClick={privacyClickHandler}
          onOriginalsClick={originalsClickHandler}
          onGamesClick={gamesClickHandler}
          onCreatorsClick={creatorsClickHandler}
        />
      </div>
      {!!footerText && (
        <MarkdownComponent
          // The extra style below is just to fix the footer on mobile when the dev selector is shown
          className={classNames(styles.footer, { [styles.testFixMargin]: IS_DEVELOPMENT_BUILD })}
          markdownString={footerText}
          inline
        />
      )}
    </div>
  );
};

export default Layout;
