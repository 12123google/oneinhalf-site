import { useEffect, useMemo, useState } from "react";
import "./MapPage.css";

import mapImg from "../../assets/maps/dema.jpg";
import { POI } from "../../data/poi";

const LS_KEY = "oiah_visited_v1";

function loadVisited() {
  try {
    return new Set(JSON.parse(localStorage.getItem(LS_KEY) || "[]"));
  } catch {
    return new Set();
  }
}

function saveVisited(set) {
  localStorage.setItem(LS_KEY, JSON.stringify([...set]));
}

export default function MapPage() {
  const [activeId, setActiveId] = useState(null);
  const [visited, setVisited] = useState(() => loadVisited());

  useEffect(() => saveVisited(visited), [visited]);

  const active = useMemo(
    () => POI.find((p) => p.id === activeId) || null,
    [activeId]
  );

  const opened = useMemo(() => POI.filter((p) => visited.has(p.id)), [visited]);
  const lockedCount = POI.length - opened.length;

  const openPoi = (poi) => {
    setActiveId(poi.id);
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(poi.id);
      return next;
    });
  };

  const resetProgress = () => {
    setVisited(new Set());
    setActiveId(null);
    localStorage.removeItem(LS_KEY);
  };

  return (
    <div className="layout">
      {/* LEFT */}
      <section className="left">
        <div className="mapScroll">
          <div className="hud">
            <div className="hudTag">DEMA ARCHIVE</div>
            <div className="hudProg">
              Progress: <b>{visited.size}</b>/<b>{POI.length}</b>
            </div>
            <button className="hudBtn" onClick={resetProgress}>
              Reset
            </button>
          </div>

          <div className="mapCanvas" style={{ backgroundImage: `url(${mapImg})` }}>
            {POI.map((p) => {
              const isVisited = visited.has(p.id);
              const isActive = activeId === p.id;

              // hover label: либо название, либо "?"
              const label = isVisited ? p.title : "?";

              return (
                <button
                  key={p.id}
                  className={`poi ${isVisited ? "poi--visited" : "poi--locked"} ${
                    isActive ? "poi--active" : ""
                  }`}
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  onClick={() => openPoi(p)}
                  aria-label={isVisited ? p.title : "Unknown point"}
                  title={isVisited ? p.title : "Unknown"}
                >
                  <span className="poiLabel">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <aside className="right">
        {!active ? (
          <div className="empty">
            <div className="pill">BETA ARCHIVE</div>
            <h2>Select a point</h2>
            <p>
              Наведи на точку — увидишь название или “?”. Клик — открываешь файл.
              Прогресс сохраняется.
            </p>

            <div className="listTitle">Opened files</div>
            <div className="list">
              {opened.length === 0 ? (
                <div className="emptyHint">No files opened yet.</div>
              ) : (
                opened.map((p) => (
                  <button key={p.id} className="listItem" onClick={() => openPoi(p)}>
                    <span className="listName">{p.title}</span>
                    <span className="listEra">{p.era}</span>
                  </button>
                ))
              )}
            </div>

            <div className="lockedBox">
              <div className="lockedTitle">Locked</div>
              <div className="lockedText">{lockedCount} points hidden.</div>
            </div>
          </div>
        ) : (
          <div className="file">
            <div className="fileTop">
              <div>
                <div className="pill">FILE OPENED • {active.era}</div>
                <h2 className="fileTitle">{active.title}</h2>
              </div>

              <button className="close" onClick={() => setActiveId(null)}>
                Back
              </button>
            </div>

            <div className="meta">
              {active.tags?.map((t) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>

            {active.images?.length ? (
              <div className="gallery">
                {active.images.map((src, i) => (
                  <img key={i} className="img" src={src} alt={`${active.title} ${i + 1}`} />
                ))}
              </div>
            ) : (
              <div className="missing">
                No image yet. Добавь картинку в <code>src/assets/poi/</code> и импортни в{" "}
                <code>poi.js</code>.
              </div>
            )}

            <div className="lore">
              {Array.isArray(active.lore) ? (
                active.lore.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p>{active.lore}</p>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
