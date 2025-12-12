// BookWorkDetail.jsx
import React, { useEffect, useMemo } from "react";
import axios from "axios";

function BookWorkDetail({ works }) {
  const [authorsName, setAuthorsName] = React.useState([]);
  console.log(works.key);

  useEffect(() => {
    // const work = Array.isArray(works) && works.length > 0 ? works[0] : {};

    if (!works?.authors || works.authors.length === 0) return;

    const fetchAuthors = async () => {
      try {
        const requests = works.authors.map((a) =>
          axios.get(`https://openlibrary.org${a.key}.json`)
        );

        const responses = await Promise.all(requests);
        const names = responses.map((res) => res.data.name);
        if (!works?.isbn_13 || !works?.publishers) {
          return;
        }
        const isbn = works.isbn_13[0];
        const publisher = works.publishers[0];
        console.log(`${isbn} and ${publisher}`);

        setAuthorsName(names);
      } catch (err) {
        console.error("Error fetching author names:", err);
      }
    };

    fetchAuthors();
  }, [works]);

  console.log(works.authors);
  return (
    <div style={styles.page}>
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbDim}>An edition of</span>{" "}
        <span>{works.title}</span>
        {works.publishDate && (
          <span style={styles.breadcrumbDim}>({works.publishDate})</span>
        )}
      </div>

      {/* Title & Author block */}
      <header style={styles.header}>
        <div style={styles.coverColumn}>
          <div style={styles.coverWrapper}>
            {works.key ? (
              <img
                src={`https://covers.openlibrary.org/b/olid/${works.key.slice(-11)}-L.jpg`}
                alt={works.title}
                style={styles.cover}
              />
            ) : (
              <div style={styles.coverPlaceholder}>No cover</div>
            )}
          </div>
        </div>

        <div style={styles.mainInfo}>
          <h1 style={styles.title}>{works.title}</h1>
          {works.subtitle && <h2 style={styles.subtitle}>{works.subtitle}</h2>}

          {works.authors && (
            <p style={styles.author}>
              <span>by </span>
              {/* {authorsName.map((a, i) => (
                <React.Fragment key={i}>
                  <strong>{a}</strong>
                  {i < works.authors.length - 1 && ", "}
                </React.Fragment>
              ))} */}
              <strong>{authorsName.join(", ")}</strong>
            </p>
          )}

          <div style={styles.metaRow}>
            {works.publishers && (
              <span>
                <strong>Publisher:</strong> {works.publishers.join(", ")}
              </span>
            )}
            {works.languages && (
              <span>
                <strong>Language:</strong>{" "}
                {works.languages.map((lang) => lang.key).join(", ")}
              </span>
            )}
            {works.pagination && (
              <span>
                <strong>Pages:</strong> {works.pagination}
              </span>
            )}

            {works.works && (
              <span>
                <strong>Work ID: </strong>
                {works.works.map((w) => w.key).join(" , ") || "OL13389498W"}
              </span>
            )}

            {works.key && (
              <span>
                <strong>Edition ID:</strong> {works.key.slice(-11) || "OL21464084M"}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main layout: left details, right panel */}
      <div style={styles.layout}>
        {/* Left column - description + book details */}
        <div style={styles.leftColumn}>
          {/* Description / About */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>About this work</h3>
            <p style={styles.muted}>
              This work doesn&apos;t have a description yet. You can add one in
              your app UI.
            </p>
          </section>
        </div>

        {/* Right column - actions / rating / lists (dummy) */}
        <aside style={styles.rightColumn}>
          <section style={styles.sideSection}>
            <button style={styles.primaryButton}>Add to my books</button>
          </section>

          <section style={styles.sideSection}>
            <h4 style={styles.detailHeading}>My rating</h4>
            <div style={styles.starsRow}>★ ★ ★ ★ ★</div>
          </section>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px",
    color: "#222",
    backgroundColor: "#f8f8f8",
  },
  breadcrumb: {
    fontSize: "14px",
    marginBottom: "8px",
  },
  breadcrumbDim: {
    color: "#666",
  },
  header: {
    display: "flex",
    gap: "16px",
    padding: "16px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    marginBottom: "16px",
  },
  coverColumn: {
    width: "120px",
    flexShrink: 0,
  },
  coverWrapper: {
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "#fafafa",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cover: {
    width: "100%",
    display: "block",
  },
  coverPlaceholder: {
    fontSize: "12px",
    color: "#999",
    padding: "24px 8px",
    textAlign: "center",
  },
  mainInfo: {
    flex: 1,
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "24px",
  },
  subtitle: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    color: "#555",
  },
  author: {
    margin: "0 0 12px 0",
    fontSize: "14px",
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    fontSize: "13px",
    color: "#555",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 3fr) 260px",
    gap: "16px",
    marginTop: "8px",
  },
  leftColumn: {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  section: {
    marginBottom: "16px",
  },
  sectionTitle: {
    margin: "0 0 8px 0",
    fontSize: "18px",
  },
  muted: {
    color: "#666",
    fontSize: "14px",
  },
  detailBlock: {
    marginBottom: "12px",
    fontSize: "14px",
  },
  detailHeading: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: 600,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    padding: "8px 4px",
    fontWeight: 600,
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "8px 4px",
    verticalAlign: "top",
  },
  smallMuted: {
    fontSize: "12px",
    color: "#666",
  },
  sideSection: {
    backgroundColor: "#fff",
    padding: "12px",
    borderRadius: "4px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  primaryButton: {
    width: "100%",
    padding: "8px",
    marginBottom: "6px",
    backgroundColor: "#2b6cb0",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
  secondaryButton: {
    width: "100%",
    padding: "6px",
    marginBottom: "4px",
    backgroundColor: "#edf2f7",
    color: "#222",
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  starsRow: {
    fontSize: "18px",
    color: "#f6ad55",
  },
  textarea: {
    width: "100%",
    fontSize: "13px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    padding: "6px",
    resize: "vertical",
    fontFamily: "inherit",
  },
};

export default BookWorkDetail;
