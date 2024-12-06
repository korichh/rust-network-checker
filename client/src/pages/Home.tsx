import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { Ws } from "../lib/ws";
import Loading from "../components/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isArp, setIsArp] = useState<boolean>(false);
  const [pingMessage, setPingMessage] = useState<string>("");

  useEffect(() => {
    Ws.onmessage = (e: MessageEvent) => {
      const message: string = e.data;

      if (message === "loading") {
        setIsLoading((prev) => !prev);
      } else if (message === "arp") {
        setIsArp((prev) => !prev);
      } else {
        setPingMessage(message);
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
      <Loading isLoading={isLoading} text={pingMessage} />
      <div className="flex items-start justify-between">
        <Title text="LAN list" />
        <Button onClick={refreshLanList} type="submit" text="Refresh" className="max-w-[100px]" />
      </div>
      {isArp && pingMessage}
    </main>
  );
}
