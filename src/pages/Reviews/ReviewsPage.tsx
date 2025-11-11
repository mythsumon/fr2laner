import "../common/WorkspacePage.css";

const reviews = [
  {
    id: "rev-01",
    name: "Maya L.",
    rating: "★★★★★",
    date: "Sep 18, 2024",
    text: "Ava guided our team through fast iterations and delivered a logo system that our investors loved.",
  },
  {
    id: "rev-02",
    name: "Noah E.",
    rating: "★★★★★",
    date: "Sep 14, 2024",
    text: "Her documentation is impeccable—engineering integrated the new UI kit in record time.",
  },
  {
    id: "rev-03",
    name: "Sofia R.",
    rating: "★★★★☆",
    date: "Sep 10, 2024",
    text: "Strong design instincts and quick turnarounds. Requested a minor revision which was handled smoothly.",
  },
];

export const ReviewsPage = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div>
            <h1>Reviews</h1>
            <p className="page-description">
              Understand client sentiment, respond to feedback, and highlight praise in your marketing materials.
            </p>
          </div>
          <div className="page-actions">
            <div className="chip-group">
              <button className="chip chip--active" type="button">
                All
              </button>
              <button className="chip" type="button">
                5★
              </button>
              <button className="chip" type="button">
                4★
              </button>
              <button className="chip" type="button">
                With images
              </button>
            </div>
          </div>
        </header>

        <section className="page-card">
          <div className="rating-summary">
            <span className="rating-score">4.9</span>
            <div>
              <strong>230 total reviews</strong>
              <p style={{ margin: "6px 0 0", color: "var(--text-sub)" }}>Most recent feedback from September 2024</p>
              <div className="chip-group" style={{ marginTop: "12px" }}>
                <button className="chip chip--active" type="button">
                  Respond to latest
                </button>
                <button className="chip" type="button">
                  Request testimonial
                </button>
              </div>
            </div>
          </div>
          <div className="rating-bars" style={{ marginTop: "20px" }}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <li key={stars}>
                <span>{stars}★</span>
                <div className="rating-bars__track">
                  <div className="rating-bars__fill" style={{ width: `${stars === 5 ? 78 : stars === 4 ? 15 : 7}%` }} />
                </div>
                <span>{stars === 5 ? "78%" : stars === 4 ? "15%" : "7%"}</span>
              </li>
            ))}
          </div>
        </section>

        <section className="page-card">
          <div className="page-card__header">
            <div>
              <h2>Latest reviews</h2>
              <p>Reply within 24 hours to maintain your response badge.</p>
            </div>
            <div className="filters-row">
              <select aria-label="Sort reviews">
                <option>Newest</option>
                <option>Highest rated</option>
                <option>Lowest rated</option>
                <option>Most helpful</option>
              </select>
            </div>
          </div>
          <ul className="reviews-list">
            {reviews.map((review) => (
              <li key={review.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{review.name}</strong>
                    <span style={{ color: "var(--brand)", marginLeft: "8px" }}>{review.rating}</span>
                  </div>
                  <span style={{ color: "var(--text-sub)" }}>{review.date}</span>
                </div>
                <p style={{ margin: 0, color: "var(--text-sub)" }}>{review.text}</p>
                <div className="page-actions" style={{ gap: "8px" }}>
                  <button className="page-btn page-btn--ghost" type="button">
                    Reply
                  </button>
                  <button className="page-btn page-btn--ghost" type="button">
                    Mark as featured
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

