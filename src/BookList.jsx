import BookCard from "./BookCard";

export default function BookList({ books }) {
  console.log(books);
  return (
    <ul className="book-card-list">
      {books.map((book, index) => (
        <BookCard
          key={index}
          title={book.title}
          authors={book.author_name}
          publishYear={book.first_publish_year}
          editions={book.edition_count}
          editionKey={book.cover_edition_key}
        />
      ))}
    </ul>
  );
}
