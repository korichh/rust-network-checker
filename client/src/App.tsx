import { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Api } from "./lib/api";
import { Ws } from "./lib/ws";
import { useOptionsStore, usePingStore } from "./lib/store";
import { formatPingList, sendPing } from "./lib/utils";
import Loading from "./components/Loading";
import Timer from "./components/Timer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Options from "./pages/Options";
import NotFound from "./pages/NotFound";

export default function App() {
  const options = useOptionsStore((store) => store.options);
  const setOptions = useOptionsStore((store) => store.setOptions);
  const isLoading = usePingStore((store) => store.isLoading);
  const setIsLoading = usePingStore((store) => store.setIsLoading);
  const loadingText = usePingStore((store) => store.loadingText);
  const setLoadingText = usePingStore((store) => store.setLoadingText);
  const refreshAllowed = usePingStore((store) => store.refreshAllowed);
  const setRefreshAllowed = usePingStore((store) => store.setRefreshAllowed);
  const setPingList = usePingStore((store) => store.setPingList);
  const setTime = usePingStore((state) => state.setTime);

  const pingIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const resData = await Api.getOptions({});
        setOptions(resData);

        setRefreshAllowed(false);
        sendPing();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [
    setOptions,
    setRefreshAllowed,
    setIsLoading
  ]);

  useEffect(() => {
    setTime(options?.interval || 0);

    if (!options?.interval || !refreshAllowed) {
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    pingIntervalRef.current = setInterval(() => {
      setRefreshAllowed(false);
      sendPing();
    }, options.interval * 1000);

    timerIntervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          return options.interval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [
    options?.interval,
    options?.subnet,
    options?.range_start,
    options?.range_end,
    options?.tasks_limit,
    refreshAllowed,
    setTime,
    setRefreshAllowed
  ]);

  useEffect(() => {
    Ws.onmessage = (e: MessageEvent) => {
      const message: string = e.data;

      if (message === "loading") {
        setLoadingText("");
        setIsLoading(true);
      } else if (message.startsWith("arp")) {
        setPingList(formatPingList(message));
        setIsLoading(false);
        setRefreshAllowed(true);
      } else {
        setLoadingText(message);
      }
    };

    return () => {
      Ws.onmessage = null;
    };
  }, [
    setLoadingText,
    setIsLoading,
    setPingList,
    setRefreshAllowed
  ]);

  return (
    <Router>
      <Loading isLoading={isLoading} text={loadingText} />
      <Timer />
      <div className="w-full min-h-full flex bg-default-light">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
