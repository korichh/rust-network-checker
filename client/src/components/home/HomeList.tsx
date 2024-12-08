import { useEffect } from "react";
import { Ws } from "../../lib/ws";
import { usePingStore } from "../../lib/store";
import Loading from "../Loading";
import Icon from "../Icon";

export default function HomeList() {
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
        setIsLoading(true);
      } else if (message.startsWith("arp")) {
        setPingList(message.slice(3).split("\r\n").filter(str => str.length > 0))
        setIsLoading(false);
      } else {
        setLoadingText(message);
      }
    };

    Ws.onerror = (err) => console.error(err);
  }, [setIsLoading, setLoadingText, setPingList]);

  return (
    <div>
      <Loading isLoading={isLoading} text={loadingText} />
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
              {pingList.map(str => {
                let name = "device";
                if (str.startsWith("cur")) {
                  str = str.slice(3);
                  name += "-cur";
                }

                return (
                  <tr key={str} className="border-b border-secondary-light">
                    <td key={name} className="px-6 py-3"><Icon name={name} className={`w-[30px] h-[30px] fill-secondary-main`} /></td>
                    {str.split("|").map(item => (
                      <td key={item} className="px-6 py-3">{item}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>List is empty.</p>
      )}
    </div>
  )
}