import { usePingStore } from "../lib/store";

export default function Timer() {
  const time = usePingStore((state) => state.time);

  return (
    <div className="fixed z-10 bottom-4 right-4 bg-white rounded-full shadow-[0_1px_10px_0_rgba(0,0,0,0.15)] px-4 py-2">
      <span>Time to refresh:</span>
      <span className="ml-1">{time}s</span>
    </div>
  );
}