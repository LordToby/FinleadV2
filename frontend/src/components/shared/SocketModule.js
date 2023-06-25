// socketModule.js

import { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel, HttpTransportType } from '@microsoft/signalr';

const useSocketModule = () => {
  const [connection, setConnection] = useState();

  useEffect(() => {
    const configSocket = async () => {
      const socketConnection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl("http://localhost:7050/chatHub", {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
        })
        .build();
      
      socketConnection.on("receiveMessage", (message) => {
        console.log("Modtog besked fra server:", message);
      });

      await socketConnection.start();
      setConnection(socketConnection);
    }

    configSocket();

    // Clean up the socket connection when component unmounts
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);
  

  return {connection };
};

export default useSocketModule;
