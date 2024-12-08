import { Ws } from "../lib/ws";
import Title from "../components/Title";
import Button from "../components/Button";
import HomeList from "../components/home/HomeList";

export default function Home() {
  function onClick(e: React.MouseEvent) {
    e.preventDefault();

    if (Ws && Ws.readyState === WebSocket.OPEN) {
      Ws.send("ping");
    } else {
      console.error("Ws is not connected.");
    }
  }

  return (
    <main className="flex-grow py-8 px-4">
      <div className="flex items-start justify-between mb-4">
        <Title text="LAN list" />
        <Button onClick={onClick} type="submit" text="Refresh" className="max-w-[100px]" />
      </div>
      <HomeList />
    </main>
  );
}
