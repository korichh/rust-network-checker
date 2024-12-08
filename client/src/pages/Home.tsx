import { useEffect } from "react";
import { Ws } from "../lib/ws";
import { usePingStore } from "../lib/store";
import Title from "../components/Title";
import Button from "../components/Button";
import Loading from "../components/Loading";
import Icon from "../components/Icon";

export default function Home() {
  const isLoading = usePingStore((store) => store.isLoading);
  const setIsLoading = usePingStore((store) => store.setIsLoading);
  const loadingText = usePingStore((store) => store.loadingText);
  const setLoadingText = usePingStore((store) => store.setLoadingText);
  const pingList = usePingStore((store) => store.pingList);
  const setPingList = usePingStore((store) => store.setPingList);

  useEffect(() => {
    Ws.onmessage = (e: MessageEvent) => {
      const message: string = e.data;

      if (message === "loading") {
        setLoadingText("");
        setIsLoading((prev) => !prev);
      } else if (message.startsWith("arp")) {
        setPingList(message.slice(3).split("\r\n").filter(str => str.length > 0))
      } else {
        setLoadingText(message);
      }
    };

    Ws.onerror = (err) => console.error(err);
  }, [setIsLoading, setLoadingText, setPingList]);

  const refreshLanList = (e: React.MouseEvent) => {
    e.preventDefault();

    if (Ws && Ws.readyState === WebSocket.OPEN) {
      Ws.send("ping");
    } else {
      console.error("Ws is not connected.");
    }
  };

  return (
    <main className="flex-grow py-8 px-4">
      <Loading isLoading={isLoading} text={loadingText} />
      <div className="flex items-start justify-between mb-4">
        <Title text="LAN list" />
        <Button onClick={refreshLanList} type="submit" text="Refresh" className="max-w-[100px]" />
      </div>
      {pingList.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-light">
              <tr>
                <th className="text-left px-6 py-3"></th>
                <th className="text-left px-6 py-3">IP Address</th>
                <th className="text-left px-6 py-3">MAC Address</th>
                <th className="text-left px-6 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {pingList.map(str => (
                <tr key={str} className="border-b border-secondary-light">
                  <td className="px-6 py-3"><Icon name="device" className="w-[30px] h-[30px] fill-secondary-main" /></td>
                  {str.split("|").map(item => (
                    <td key={item} className="px-6 py-3">{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>List is empty.</p>
      )}
    </main>
  );
}
