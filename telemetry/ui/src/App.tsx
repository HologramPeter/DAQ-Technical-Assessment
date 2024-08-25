import { useState, useEffect } from "react";
import LiveValue from "./live_value";
import RedbackLogo from "./redback_logo.jpg";
import "./App.css";
import useWebSocket, { ReadyState } from "react-use-websocket";

const WS_URL = "ws://localhost:8080";

interface VehicleInfo{
  is_valid: boolean;
  last_battery_temperature: number;
  last_timestamp: number;
}

function App() {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [lastTemperature, setLastTemperature] = useState<number>(-500);
  const {
    lastJsonMessage,
    readyState,
  }: { lastJsonMessage: VehicleInfo | null; readyState: ReadyState } =
    useWebSocket(WS_URL, {
      share: false,
      shouldReconnect: () => true,
    });

  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        console.log("Connected to streaming service");
        break;
      case ReadyState.CLOSED:
        console.log("Disconnected from streaming service");
        break;
      default:
        break;
    }
  }, [readyState]);

  useEffect(() => {
    console.log("Received: ", lastJsonMessage);
    if (lastJsonMessage === null) {
      return;
    }
    setLastTemperature(lastJsonMessage["last_battery_temperature"]);
    setIsValid(lastJsonMessage["is_valid"]);
  }, [lastJsonMessage]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={RedbackLogo}
          className="redback-logo"
          alt="Redback Racing Logo"
        />
        <p className="value-title">Live Battery Temperature</p>
        <LiveValue isValid={isValid} lastValue={lastTemperature}  />
      </header>
    </div>
  );
}

export default App;
