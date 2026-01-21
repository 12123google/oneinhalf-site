import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gate.css";

export default function Gate() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const v = code.trim().toUpperCase();

    if (v === "ALWAYS") {
      setError("");
      navigate("/map");
      return;
    }

    setError("ACCESS DENIED");
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  };

  return (
    <div className="gateWrap">
      <div className={`gateCard ${shake ? "is-shaking" : ""}`}>
        <div className="gateKicker">DEMA ARCHIVE // SIGNAL DETECTED</div>

        <h1 className="gateTitle">
          We&apos;ve been here the whole time.
          <br />
          You were asleep.
          <br />
          <span className="gateAccent">Time to wake up</span>
        </h1>

        <p className="gateLead">
          The map remembers. The towers watch. Your steps will be counted.
        </p>

        <form className="gateForm" onSubmit={onSubmit}>
          <label className="gateLabel" htmlFor="code">
            Clearance code
          </label>

          <div className="gateRow">
            <input
              id="code"
              ref={inputRef}
              className="gateInput"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (error) setError("");
              }}
              placeholder="TYPE HERE…"
              autoComplete="off"
              spellCheck={false}
            />

            <button className="gateBtn" type="submit">
              Enter
            </button>
          </div>

          {error && (
            <div className="gateError">
              <span className="dot danger" /> {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
