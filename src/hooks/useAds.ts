import { useQuery } from 'react-query';

import { useConfigStore } from '#src/stores/ConfigStore';
import ApiService from '#src/services/api.service';
import { getModule } from '#src/modules/container';
import { addQueryParams } from '#src/utils/formatting';

const CACHE_TIME = 60 * 1000 * 20;

/**
 * @deprecated Use adScheduleUrls.xml form the config instead.
 */
const useLegacyStandaloneAds = ({ adScheduleId, enabled }: { adScheduleId: string | null | undefined; enabled: boolean }) => {
  const apiService = getModule(ApiService);

  const { isLoading, data } = useQuery(['ad-schedule', adScheduleId], async () => apiService.getAdSchedule(adScheduleId), {
    enabled: enabled && !!adScheduleId,
    cacheTime: CACHE_TIME,
    staleTime: CACHE_TIME,
  });

  return {
    isLoading,
    data,
  };
};

export const useAds = ({ mediaId }: { mediaId: string }) => {
  const { adSchedule: adScheduleId, adScheduleUrls } = useConfigStore((s) => s.config);

  // adScheduleUrls.xml prop exists when ad-config is attached to the App Config
  const useAppBasedFlow = !!adScheduleUrls?.xml;

  const { data: adSchedule, isLoading: isAdScheduleLoading } = useLegacyStandaloneAds({ adScheduleId, enabled: !useAppBasedFlow });
  const adConfig = {
    client: 'vast',
    schedule: addQueryParams(adScheduleUrls?.xml || '', {
      media_id: mediaId,
    }),
  };

  return {
    isLoading: useAppBasedFlow ? false : isAdScheduleLoading,
    data: useAppBasedFlow ? adConfig : adSchedule,
  };
};
