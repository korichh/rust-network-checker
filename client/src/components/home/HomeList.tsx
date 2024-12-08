import { usePingStore } from "../../lib/store";
import Icon from "../Icon";

export default function HomeList() {
  const pingList = usePingStore((store) => store.pingList);

  return (
    <>
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
              {pingList.map(({ icon, ip, mac, type }) => (
                <tr key={ip} className="border-b border-secondary-light">
                  <td className="px-6 py-3"><Icon name={icon} className={`w-[30px] h-[30px] fill-secondary-main`} /></td>
                  <td className="px-6 py-3">{ip}</td>
                  <td className="px-6 py-3">{mac.toLowerCase()}</td>
                  <td className="px-6 py-3">{type.toLowerCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>List is empty.</p>
      )}
    </>
  )
}