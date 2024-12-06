import { useEffect, useState } from "react";

export default function test() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000/ws");
    setSocket(ws);

    ws.onmessage = (e: MessageEvent) => {
      const newMessage = e.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    ws.onerror = (err) => {
      console.error(err);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput("");
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Home</h1>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <ul className="list-disc list-inside mt-2">
          {messages.map((message, index) => (
            <li key={index} className="text-lg">
              {message}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Send a Message</h2>
        <div className="flex space-x-2 mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Type your message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
