import type {
  DocumentResponse,
  DocumentsApiResponse,
  ReminderResponse,
  RemindersApiResponse,
  ShareLinkResponse,
  ShareLinksApiResponse,
  TimelineEventResponse,
  TimelineEventsApiResponse,
} from "@caniello/contracts";
import { useCallback, useEffect, useState } from "react";

export type DashboardData = {
  reminders: ReminderResponse[];
  documents: DocumentResponse[];
  timelineEvents: TimelineEventResponse[];
  shareLinks: ShareLinkResponse[];
};

const emptyDashboardData: DashboardData = {
  reminders: [],
  documents: [],
  timelineEvents: [],
  shareLinks: [],
};

export function useDashboardData(enabled: boolean) {
  const [data, setData] = useState<DashboardData>(emptyDashboardData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setData(emptyDashboardData);
      setIsLoading(false);
      setHasLoadError(false);
      return;
    }

    let isMounted = true;

    async function loadDashboardData() {
      setData(emptyDashboardData);
      setIsLoading(true);
      setHasLoadError(false);

      try {
        const [
          remindersResponse,
          documentsResponse,
          timelineResponse,
          shareLinksResponse,
        ] = await Promise.all([
          fetch("/api/reminders"),
          fetch("/api/documents"),
          fetch("/api/timeline-events"),
          fetch("/api/share-links"),
        ]);
        const remindersBody =
          (await remindersResponse.json()) as RemindersApiResponse;
        const documentsBody =
          (await documentsResponse.json()) as DocumentsApiResponse;
        const timelineBody =
          (await timelineResponse.json()) as TimelineEventsApiResponse;
        const shareLinksBody =
          (await shareLinksResponse.json()) as ShareLinksApiResponse;

        if (
          !remindersResponse.ok ||
          !remindersBody.ok ||
          !documentsResponse.ok ||
          !documentsBody.ok ||
          !timelineResponse.ok ||
          !timelineBody.ok ||
          !shareLinksResponse.ok ||
          !shareLinksBody.ok
        ) {
          throw new Error("Dashboard data load failed.");
        }

        if (!isMounted) return;
        setData({
          reminders: remindersBody.reminders ?? [],
          documents: documentsBody.documents ?? [],
          timelineEvents: timelineBody.events ?? [],
          shareLinks: shareLinksBody.shareLinks ?? [],
        });
      } catch {
        if (isMounted) setHasLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, [enabled, reloadKey]);

  return { data, isLoading, hasLoadError, reload };
}
