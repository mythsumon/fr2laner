import "../common/WorkspacePage.css";

const payoutHistory = [
  { id: "hist-1", date: "Sep 14, 2024", amount: "$620", status: "Completed", method: "DBS • SGD" },
  { id: "hist-2", date: "Aug 30, 2024", amount: "$1,120", status: "Completed", method: "Wise • USD" },
  { id: "hist-3", date: "Aug 12, 2024", amount: "$880", status: "Completed", method: "PayPal" },
  { id: "hist-4", date: "Jul 29, 2024", amount: "$540", status: "Processing", method: "DBS • SGD" },
];

export const PayoutsPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>Payouts</h1>
            <p className="page-description">
              Manage how you receive earnings, track completed transfers, and ensure your payout methods stay verified.
            </p>
          </div>
          <div className="page-actions">
            <button className="page-btn page-btn--ghost" type="button">
              Add payout method
            </button>
            <button className="page-btn page-btn--primary" type="button">
              Withdraw funds
            </button>
          </div>
        </header>

        <section className="page-grid page-grid--two">
          <article className="page-card" style={{ gap: "12px" }}>
            <span style={{ color: "var(--text-sub)", fontWeight: 600 }}>Available balance</span>
            <strong style={{ fontSize: "2.4rem" }}>$1,420</strong>
            <span style={{ color: "var(--text-sub)" }}>Next automatic payout on Sep 28</span>
            <div className="section-divider" />
            <div style={{ display: "grid", gap: "6px" }}>
              <span style={{ fontWeight: 600 }}>Pending clearance</span>
              <span style={{ color: "var(--text-sub)" }}>$560 – releases within 5 days of delivery</span>
            </div>
          </article>

          <article className="page-card">
            <div className="page-card__header">
              <div>
                <h2>Preferred methods</h2>
                <p>Update your default destination any time.</p>
              </div>
            </div>
            <div className="two-column">
              <div>
                <strong>DBS Savings • SGD</strong>
                <p style={{ margin: "4px 0 0", color: "var(--text-sub)" }}>Ends in 4321 · Primary</p>
              </div>
              <button className="page-btn page-btn--ghost" type="button">
                Edit
              </button>
              <div>
                <strong>Wise Multi-currency</strong>
                <p style={{ margin: "4px 0 0", color: "var(--text-sub)" }}>USD + EUR</p>
              </div>
              <button className="page-btn page-btn--ghost" type="button">
                Set as default
              </button>
            </div>
          </article>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Recent payouts</h2>
              <p>Transfers completed in the past 90 days.</p>
            </div>
            <div className="filters-row">
              <select aria-label="Filter payouts">
                <option>All statuses</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <ul className="timeline-compact">
            {payoutHistory.map((row) => (
              <li key={row.id}>
                <div>
                  <strong>{row.amount}</strong>
                  <p style={{ margin: "4px 0 0", color: "var(--text-sub)" }}>{row.method}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ display: "block", color: "var(--text-sub)" }}>{row.date}</span>
                  <span className={`status-pill ${row.status === "Completed" ? "status-pill--success" : "status-pill--pending"}`}>
                    {row.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

