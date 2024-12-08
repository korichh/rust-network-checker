export const Ws = (() => {
  const baseURL = "ws://127.0.0.1:5000/ws"

  return new WebSocket(baseURL);
})();

Ws.onerror = console.error;
