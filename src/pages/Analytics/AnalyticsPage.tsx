import "../common/WorkspacePage.css";

const audience = [
  { country: "United States", percent: "32%" },
  { country: "Singapore", percent: "18%" },
  { country: "Germany", percent: "14%" },
  { country: "Australia", percent: "11%" },
  { country: "Japan", percent: "9%" },
];

const sources = [
  { channel: "Marketplace search", sessions: "1,480", share: "54%" },
  { channel: "Direct referrals", sessions: "520", share: "19%" },
  { channel: "Portfolio link", sessions: "310", share: "11%" },
  { channel: "Social media", sessions: "260", share: "9%" },
  { channel: "Email campaigns", sessions: "170", share: "6%" },
];

export const AnalyticsPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>Analytics</h1>
            <p className="page-description">Understand how clients discover your services and where to focus promotion efforts.</p>
          </div>
          <div className="page-actions">
            <div className="filters-row">
              <select aria-label="Select range">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Year to date</option>
              </select>
            </div>
            <button className="page-btn page-btn--primary" type="button">
              Export report
            </button>
          </div>
        </header>

        <section className="page-grid page-grid--three">
          <article className="page-card" style={{ gap: "10px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Profile views</span>
            <strong style={{ fontSize: "2.2rem" }}>4,320</strong>
            <span style={{ color: "var(--success)", fontWeight: 600 }}>+24% vs last month</span>
          </article>
          <article className="page-card" style={{ gap: "10px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Service clicks</span>
            <strong style={{ fontSize: "2.2rem" }}>1,980</strong>
            <span style={{ color: "var(--brand)", fontWeight: 600 }}>Select high-performing tags</span>
          </article>
          <article className="page-card" style={{ gap: "10px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Request to order rate</span>
            <strong style={{ fontSize: "2.2rem" }}>38%</strong>
            <span style={{ color: "var(--warn)", fontWeight: 600 }}>Optimize proposals to reach 45%</span>
          </article>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Engagement heat map</h2>
              <p>Weekly snapshot of visits and hero interactions.</p>
            </div>
          </div>
          <div style={{ display: "grid", gap: "8px" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} style={{ display: "grid", gridTemplateColumns: "80px repeat(6, 1fr)", gap: "8px", alignItems: "center" }}>
                <span style={{ fontWeight: 600, color: "var(--text-sub)" }}>{day}</span>
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    key={`${day}-${index}`}
                    style={{
                      height: "18px",
                      borderRadius: "6px",
                      background: `rgba(0,153,255,${0.15 + Math.random() * 0.45})`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="page-grid">
          <article className="page-card">
            <div className="page-card__header">
              <div>
                <h2>Top countries</h2>
                <p>Distribution of client interest.</p>
              </div>
            </div>
            <ul className="list-timeline">
              {audience.map((entry) => (
                <li key={entry.country}>
                  <strong>{entry.country}</strong>
                  <span style={{ color: "var(--text-sub)" }}>{entry.percent}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="page-card">
            <div className="page-card__header">
              <div>
                <h2>Traffic sources</h2>
                <p>Where clients discovered your services.</p>
              </div>
            </div>
            <div className="page-grid">
              {sources.map((source) => (
                <div key={source.channel} className="page-card" style={{ gap: "6px" }}>
                  <strong>{source.channel}</strong>
                  <span style={{ color: "var(--text-sub)" }}>{source.sessions} sessions</span>
                  <div className="progress-bar" role="progressbar">
                    <div style={{ width: source.share }} />
                  </div>
                  <span style={{ color: "var(--brand)", fontWeight: 600 }}>{source.share} share</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

