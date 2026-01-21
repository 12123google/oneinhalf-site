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
    // автофокус на инпут
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault(); // супер важно, чтобы не было перезагрузки

    const v = code.trim().toUpperCase();

    if (v === "ALWAYS") {
      setError("");
      // ничего не сохраняем — каждый раз надо вводить код
     window.location.href = "/map";

      return;
    }

    // ошибка + тряска
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

          <div className={`gateHint ${error ? "is-error" : ""}`}>
            {error ? (
              <>
                <span className="dot danger" /> {error}
              </>
            ) : (
              <>
                <span className="dot" /> Press the button — and don’t look away.
              </>
            )}
          </div>
        </form>

        <div className="gateFoot">
          Hint: the archive opens{" "}
          <span className="mono">ALWAYS</span>.
        </div>
      </div>
    </div>
  );
}
