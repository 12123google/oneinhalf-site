import { useEffect, useMemo, useState } from "react";
import { POIS } from "../../data/poi";
import mapImg from "../../assets/maps/dema.jpg";
import "./MapPage.css";

const STORAGE_KEY = "oiah_visited_v01";

export default function MapPage() {
  const total = POIS.length;

  const [activeId, setActiveId] = useState(null);
  const [visited, setVisited] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const active = useMemo(
    () => POIS.find((p) => p.id === activeId) || null,
    [activeId]
  );

  const visitedCount = visited.length;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }, [visited]);

  const openPoi = (id) => {
    setActiveId(id);
    setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const closePanel = () => setActiveId(null);

  return (
    <div className="mapWrap">
      <div className="mapTopbar">
        <div className="mapBrand">DEMA MAP // ARCHIVE MODE</div>
        <div className="mapProgress">
          PROGRESS: <span>{visitedCount}</span>/<span>{total}</span>
        </div>
      </div>

      <div className="mapStage">
        <div className="mapCanvas">
          <img className="mapImg" src={mapImg} alt="DEMA map" draggable={false} />

          {POIS.map((p) => {
            const isVisited = visited.includes(p.id);
            const isActive = activeId === p.id;

            return (
              <button
                key={p.id}
                className={[
                  "poiDot",
                  isVisited ? "is-visited" : "",
                  isActive ? "is-active" : "",
                ].join(" ")}
                style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
                onClick={() => openPoi(p.id)}
                aria-label={p.title}
              >
                <span className="poiPulse" />
                <span className="poiLabel">{p.title}</span>
              </button>
            );
          })}
        </div>

        <aside className={["poiPanel", active ? "is-open" : ""].join(" ")}>
          <div className="poiPanelInner">
            <button className="poiClose" onClick={closePanel} aria-label="Close">
              ✕
            </button>

            {!active ? (
              <div className="poiEmpty">
                <div className="poiEmptyKicker">NO FILE SELECTED</div>
                <div className="poiEmptyText">
                  Click a marker. The map will answer.
                </div>
              </div>
            ) : (
              <>
                <div className="poiMetaTop">
                  <div className="poiTitle">{active.title}</div>
                  <div className="poiSub">
                    <span className="poiEra">{active.era}</span>
                    <span className="poiStatus">{active.status}</span>
                  </div>
                </div>

                <div className="poiTags">
                  {active.tags?.map((t) => (
                    <span key={t} className="poiTag">{t}</span>
                  ))}
                </div>

                <div className="poiImages">
                  {active.images?.slice(0, 3).map((src) => (
                    <img key={src} className="poiImg" src={src} alt="" />
                  ))}
                </div>

                <div className="poiLore">
                  {active.lore?.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="poiTracks">
                  <div className="poiSectionTitle">RELATED TRACKS</div>
                  <ul>
                    {active.relatedTracks?.map((tr) => (
                      <li key={tr.title}>
                        <span className="trkTitle">{tr.title}</span>
                        <span className="trkEra">{tr.era}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
