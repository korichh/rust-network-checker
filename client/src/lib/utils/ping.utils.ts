import { Ws } from "../ws";

export interface IPingItem {
  icon: string;
  ip: string;
  mac: string;
  type: string;
}

export function formatPingList(pingList: string): IPingItem[] {
  return pingList
    .slice(3)
    .split("\r\n")
    .filter(str => str.length > 0)
    .reduce<IPingItem[]>((acc, str) => {
      let icon = "device";
      if (str.startsWith("cur")) {
        str = str.slice(3);
        icon += "-cur";
      }

      const strSplit = str.split("|");
      acc.push({
        icon,
        ip: strSplit[0],
        mac: strSplit[1],
        type: strSplit[2],
      })

      return acc;
    }, []);
}

export function sendPing() {
  if (Ws && Ws.readyState === WebSocket.OPEN) {
    Ws.send("ping");
  } else {
    console.error("Ws is not connected.");
  }
}