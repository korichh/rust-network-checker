import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { Ws } from "../lib/ws";
import Loading from "../components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");
  const [pingList, setPingList] = useState<string[]>([]);

  useEffect(() => {
    Ws.onmessage = (e: MessageEvent) => {
      const message: string = e.data;

      if (message === "loading") {
        setIsLoading((prev) => !prev);
      } else if (message.startsWith("arp")) {
        setPingList(message.slice(3).split("\r\n"))
      } else {
        setLoadingText(message);
      }
    };

    Ws.onerror = (err) => console.error(err);
  }, []);

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
      <div className="flex items-start justify-between">
        <Title text="LAN list" />
        <Button onClick={refreshLanList} type="submit" text="Refresh" className="max-w-[100px]" />
      </div>
      {pingList.length > 0 ? (
        <ul>
          {pingList.map(str => (
            <li>{str}</li>
          ))}
        </ul>
      ) : (
        <p>List is empty.</p>
      )}
    </main>
  );
}
