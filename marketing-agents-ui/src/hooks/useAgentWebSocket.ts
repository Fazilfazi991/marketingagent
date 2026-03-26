import { useState, useEffect, useRef } from 'react';

export const useAgentWebSocket = (clientId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/agents/${clientId}`);
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [data, ...prev].slice(0, 50));
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [clientId]);

  return { messages };
};
