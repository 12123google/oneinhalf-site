import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gate.css";

const ACCESS_CODE = "ALWAYS";

export default function Gate() {
  const nav = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === ACCESS_CODE) {
      nav("/map");
      return;
    }
    setError(true);
    setTimeout(() => setError(false), 450);
  };

  return (
    <div className="gateWrap">
      <div className="gateCard">
        <div className="gateTopline">DEMA ARCHIVE // SIGNAL DETECTED</div>

        <h1 className="gateTitle">
          <span>We&apos;ve been here the whole time.</span>
          <span>You were asleep.</span>
          <span className="gateAccent">Time to wake up</span>
        </h1>

        <p className="gateDesc">
          The map remembers. The towers watch. Your steps will be counted.
        </p>

        <div className={`gateRow ${error ? "shake" : ""}`}>
          <input
            className="gateInput"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="ENTER CODE"
            autoComplete="off"
            spellCheck={false}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />

          <button className="gateBtn" onClick={submit}>
            Dive into the journey
          </button>
        </div>

        <div className="gateHint">
          <span className="gateDot" />
          Press the button — and don’t look away.
        </div>

        {error && <div className="gateError">Wrong code.</div>}
      </div>
    </div>
  );
}
