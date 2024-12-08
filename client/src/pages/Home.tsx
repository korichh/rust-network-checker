import { usePingStore } from "../lib/store";
import { sendPing } from "../lib/utils";
import Title from "../components/Title";
import Button from "../components/Button";
import HomeList from "../components/home/HomeList";

export default function Home() {
  const setRefreshAllowed = usePingStore((state) => state.setRefreshAllowed);

  function onClick() {
    setRefreshAllowed(false);
    sendPing();
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
