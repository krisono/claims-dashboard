import { useEffect, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface UseWebSocketOptions {
  onClaimUpdate?: (claim: any) => void;
  onPalletUpdate?: (pallet: any) => void;
}

export function useWebSocket({ onClaimUpdate, onPalletUpdate }: UseWebSocketOptions = {}) {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      connectHeaders: {},
      debug: undefined,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = (frame) => {
      setConnected(true);

      // Subscribe to claims updates
      stompClient.subscribe('/topic/claims', (message) => {
        const claim = JSON.parse(message.body);
        if (onClaimUpdate) {
          onClaimUpdate(claim);
        }
      });

      // Subscribe to pallet updates
      stompClient.subscribe('/topic/pallets', (message) => {
        const pallet = JSON.parse(message.body);
        if (onPalletUpdate) {
          onPalletUpdate(pallet);
        }
      });
    };

    stompClient.onDisconnect = () => {
      setConnected(false);
    };

    stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      setConnected(false);
    };

    stompClient.activate();
    setClient(stompClient);

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [onClaimUpdate, onPalletUpdate]);

  const sendMessage = useCallback((destination: string, body: any) => {
    if (client && connected) {
      client.publish({
        destination,
        body: JSON.stringify(body),
      });
    }
  }, [client, connected]);

  return {
    connected,
    sendMessage,
  };
}
