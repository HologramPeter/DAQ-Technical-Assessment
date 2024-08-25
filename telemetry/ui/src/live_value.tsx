import "./App.css";

interface LastTemperatureProps {
  isValid: boolean;
  lastValue: number;
}

function LiveValue({ isValid, lastValue }: LastTemperatureProps) {
  if (lastValue === -500) {
    return (
      <header className="live-value" style={{ color: "white" }}>
        {"Await Connection..."}
      </header>
    );
  }

  var valueColour = "white";
  if (lastValue < 20 || lastValue > 80) {
    valueColour = "red";
  }else if (lastValue < 25 || lastValue > 75) {
    valueColour = "yellow";
  }else{
    valueColour = "green";
  }

  //to precision 3 keep 3 decimal place trailing zeros

  if (!isValid) {
    return (
      <header className="live-value invalid" style={{ color: valueColour }}>
        {`${lastValue.toPrecision(3)}°C`}
        <div className="remarks">Standby...</div>
      </header>
    );
  }

  return (
    <header className="live-value" style={{ color: valueColour }}>
      {`${lastValue.toPrecision(3)}°C`}
    </header>
  );
}

export default LiveValue;
