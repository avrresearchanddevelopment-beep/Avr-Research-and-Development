"use client";

import { useEffect, useState } from "react";
import { SNAPSHOT, loadLive, setting, type Cms } from "@/lib/cms";

/**
 * Site content from the Google Sheet.
 *
 * First render = the content bundled at build time (so pages are instant and
 * search engines see real text). Right after, the latest content is fetched
 * from the sheet and swapped in. If that request fails the bundled content
 * simply stays.
 */
export function useCms() {
  const [cms, setCms] = useState<Cms>(SNAPSHOT);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadLive().then((fresh) => {
      if (!cancelled && fresh) {
        setCms(fresh);
        setLive(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Text setting from the "Settings" tab, with a fallback. */
  const s = (key: string, fallback = "") => setting(cms.settings, key, fallback);
  return { cms, live, s };
}
