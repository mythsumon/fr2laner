import "../common/WorkspacePage.css";

export const SettingsPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>Settings</h1>
            <p className="page-description">Configure your profile, notifications, and account security all in one place.</p>
          </div>
          <div className="page-actions">
            <button className="page-btn page-btn--ghost" type="button">
              Preview profile
            </button>
            <button className="page-btn page-btn--primary" type="button">
              Save changes
            </button>
          </div>
        </header>

        <nav className="toggle-group" role="tablist" aria-label="Settings sections">
          <button className="active" type="button">
            General
          </button>
          <button type="button">Notifications</button>
          <button type="button">Security</button>
          <button type="button">Billing</button>
        </nav>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Profile details</h2>
              <p>Information visible to clients browsing your services.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Display name
              <input defaultValue="Ava Kim" />
            </label>
            <label>
              Professional title
              <input defaultValue="UI/UX Designer & Brand Specialist" />
            </label>
            <label>
              Location
              <select defaultValue="Singapore">
                <option>Singapore</option>
                <option>United States</option>
                <option>Germany</option>
              </select>
            </label>
            <label>
              Languages
              <input defaultValue="English, Korean" />
            </label>
            <label style={{ gridColumn: "1 / -1" }}>
              About
              <textarea rows={4} defaultValue="I design digital experiences that balance clarity, delight, and measurable results." />
            </label>
          </div>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Notification preferences</h2>
              <p>Choose how you stay informed about new messages and orders.</p>
            </div>
          </div>
          <div className="two-column">
            <label>
              <input type="checkbox" defaultChecked /> Email me when I receive a new message
            </label>
            <label>
              <input type="checkbox" defaultChecked /> Push notification for order updates
            </label>
            <label>
              <input type="checkbox" /> Weekly digest of analytics
            </label>
            <label>
              <input type="checkbox" /> Product updates & feature launches
            </label>
          </div>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Security</h2>
              <p>Keep your account protected with two-step verification and alerts.</p>
            </div>
            <button className="page-btn page-btn--ghost" type="button">
              Manage devices
            </button>
          </div>
          <div className="two-column">
            <label>
              <span style={{ fontWeight: 600 }}>Two-factor authentication</span>
              <p style={{ margin: "6px 0 0", color: "var(--text-sub)" }}>Get a verification code by SMS or Authenticator app.</p>
              <button className="page-btn page-btn--primary" type="button" style={{ marginTop: "12px" }}>
                Enable 2FA
              </button>
            </label>
            <label>
              <span style={{ fontWeight: 600 }}>Login alerts</span>
              <p style={{ margin: "6px 0 0", color: "var(--text-sub)" }}>Receive an email when a new device signs in.</p>
              <div style={{ marginTop: "12px" }}>
                <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <input type="checkbox" defaultChecked /> Email alert
                </label>
                <label style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "8px" }}>
                  <input type="checkbox" /> SMS alert
                </label>
              </div>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

