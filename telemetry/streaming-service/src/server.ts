import net from "net";
import { WebSocket, WebSocketServer } from "ws";

interface VehicleInfo{
  is_valid: boolean;
  last_battery_temperature: number;
  last_timestamp: number;
}

interface VehicleData {
  battery_temperature: number;
  timestamp: number;
}

const TCP_PORT = 12000;
const WS_PORT = 8080;
const tcpServer = net.createServer();
const websocketServer = new WebSocketServer({ port: WS_PORT });

var vehicleData: VehicleData = {
  battery_temperature: -500,
  timestamp: -500,
};

tcpServer.on("connection", (socket) => {
  console.log("TCP client connected");

  socket.on("data", (msg) => {
    console.log(`Received: ${msg.toString()}`);

    //try to parse jsonData
    //if error, send an error message to the client
    //if no error, send the data to the client
    var is_valid = false;
    try {
      vehicleData = JSON.parse(msg.toString());
      is_valid = true;
    } catch (error) {}

    const vehicleInfo: VehicleInfo = {
      is_valid: is_valid,
      last_battery_temperature: vehicleData.battery_temperature,
      last_timestamp: vehicleData.timestamp,
    };

    // Send JSON over WS to frontend clients
    websocketServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(vehicleInfo));
      }
    });
  });

  socket.on("end", () => {
    console.log("Closing connection with the TCP client");
  });

  socket.on("error", (err) => {
    console.log("TCP client error: ", err);
  });
});

websocketServer.on("listening", () =>
  console.log(`Websocket server started on port ${WS_PORT}`)
);

websocketServer.on("connection", async (ws: WebSocket) => {
  console.log("Frontend websocket client connected");
  const vehicleInfo: VehicleInfo = {
    is_valid: false,
    last_battery_temperature: vehicleData.battery_temperature,
    last_timestamp: vehicleData.timestamp,
  };
  ws.send(JSON.stringify(vehicleInfo));
  ws.on("error", console.error);
});

tcpServer.listen(TCP_PORT, () => {
  console.log(`TCP server listening on port ${TCP_PORT}`);
});
