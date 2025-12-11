// BookWorkDetail.jsx
import React, { useEffect, useMemo } from "react";
import axios from "axios";

function BookWorkDetail({ works }) {
  const [authorsName, setAuthorsName] = React.useState([]);

  const work = useMemo(() => {
    return Array.isArray(works) && works.length > 0 ? works[0] : {};
  }, [works]);

  useEffect(() => {
    if (!work?.authors || work.authors.length === 0) return;

    const fetchAuthors = async () => {
      try {
        const requests = work.authors.map((a) =>
          axios.get(`https://openlibrary.org${a.key}.json`)
        );

        const responses = await Promise.all(requests);
        const names = responses.map((res) => res.data.name);

        setAuthorsName(names);
      } catch (err) {
        console.error("Error fetching author names:", err);
      }
    };

    fetchAuthors();
  }, [work]);

  console.log(work.authors);
  return (
    <div style={styles.page}>
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbDim}>An edition of</span>{" "}
        <span>{work.title}</span>
        {work.publishDate && (
          <span style={styles.breadcrumbDim}>({work.publishDate})</span>
        )}
      </div>

      {/* Title & Author block */}
      <header style={styles.header}>
        <div style={styles.coverColumn}>
          <div style={styles.coverWrapper}>
            {work.coverImage ? (
              <img src={work.coverImage} alt={work.title} style={styles.cover} />
            ) : (
              <div style={styles.coverPlaceholder}>No cover</div>
            )}
          </div>
        </div>

        <div style={styles.mainInfo}>
          <h1 style={styles.title}>{work.title}</h1>
          {work.subtitle && <h2 style={styles.subtitle}>{work.subtitle}</h2>}

          {work.authors && (
            <p style={styles.author}>
              <span>by </span>
              {authorsName.map((a, i) => (
                <>
                  <strong key={i}>{a}</strong>
                  {i < work.authors.length - 1 && ", "}
                </>
              ))}
            </p>
          )}

          <div style={styles.metaRow}>
            {work.publisher && (
              <span>
                <strong>Publisher:</strong> {work.publisher}
              </span>
            )}
            {work.language && (
              <span>
                <strong>Language:</strong> {work.language}
              </span>
            )}
            {work.pages && (
              <span>
                <strong>Pages:</strong> {work.pages}
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

          {/* Book Details */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Book details</h3>

            <div style={styles.detailBlock}>
              <h4 style={styles.detailHeading}>Edition notes</h4>
              <p>{work.editionNotes || "Exhibition catalogue Jan.–Feb. 1983."}</p>
            </div>

            <div style={styles.detailBlock}>
              <h4 style={styles.detailHeading}>The physical object</h4>
              <p>
                <strong>Pagination:</strong> {work.pages ? `${work.pages} p.` : "14 p."}
              </p>
              <p>
                <strong>Number of pages:</strong> {work.pages || 14}
              </p>
            </div>

            <div style={styles.detailBlock}>
              <h4 style={styles.detailHeading}>Edition identifiers</h4>
              <p>
                <strong>Open Library:</strong> {work.editionId || "OL21464084M"}
              </p>
            </div>

            <div style={styles.detailBlock}>
              <h4 style={styles.detailHeading}>Work identifiers</h4>
              <p>
                <strong>Work ID:</strong> {work.workId || "OL13389498W"}
              </p>
            </div>
          </section>

          {/* Editions table (simplified) */}
          <section style={styles.section}>
            <h3 style={styles.sectionTitle}>Editions</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Edition</th>
                  <th style={styles.th}>Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.td}>
                    <strong>{work.title}</strong>
                    <div style={styles.smallMuted}>
                      {work.publishDate || "1983"},{" "}
                      {work.publisher || "Galerie 't Venster"}
                    </div>
                  </td>
                  <td style={styles.td}>Locate</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        {/* Right column - actions / rating / lists (dummy) */}
        <aside style={styles.rightColumn}>
          <section style={styles.sideSection}>
            <button style={styles.primaryButton}>Want to Read</button>
            <button style={styles.secondaryButton}>Currently Reading</button>
            <button style={styles.secondaryButton}>Already Read</button>
          </section>

          <section style={styles.sideSection}>
            <h4 style={styles.detailHeading}>My rating</h4>
            <div style={styles.starsRow}>★ ★ ★ ★ ★</div>
          </section>

          <section style={styles.sideSection}>
            <h4 style={styles.detailHeading}>My book notes</h4>
            <textarea
              placeholder="Add a private note about this edition..."
              rows={4}
              style={styles.textarea}
            />
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
