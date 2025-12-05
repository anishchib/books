import axios from "axios";
import { useEffect, useState } from "react";

export default function BookCard({
  title,
  authors = [],
  publishYear,
  editions,
  editionKey,
}) {
  //   const [ek, setEk] = useState("");

  //   useEffect(() => {
  //     const fetchEditionKey = async () => {
  //       const data = await axios.get(
  //         `https://openlibrary.org/search.json?title=${title}&fields=edition_key&limit=1`
  //       );
  //       console.log(data.data.docs[0].edition_key[0]);
  //       setEk(data.data.docs[0].edition_key[0]);
  //     };
  //     fetchEditionKey();
  //   }, [title]);
  return (
    <li className="book-card-item">
      {/* IMAGE SECTION */}
      <div className="book-card-image">
        <img
          src={`https://covers.openlibrary.org/b/olid/${editionKey}-L.jpg`}
          alt={title}
        />
      </div>

      {/* TEXT SECTION */}
      <div className="book-card-info">
        <h3 className="book-card-title">{title}</h3>

        <p className="book-card-authors">
          by{" "}
          {authors.map((name, index) => (
            <span key={index}>
              {name}
              {index < authors.length - 1 ? " and " : ""}
            </span>
          ))}
        </p>

        <p className="book-card-meta">
          First published in {publishYear} — <a href="#">{editions} editions</a>
        </p>

        {/* Buttons */}
        <div className="book-card-actions">
          <button className="borrow-btn">Borrow▼</button>

          <button className="want-btn">Want to Read ▼</button>
        </div>
      </div>
    </li>
  );
}
