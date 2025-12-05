import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BookList from "./BookList";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const apiData = "https://openlibrary.org/search.json?author=Kushwant+Singh";
  // const getBooks = async () => {
  //   const authorData = await axios.get(apiData);
  //   console.log(authorData.data.docs);
  //   return authorData.data.docs;
  // };
  useEffect(() => {
    //const apiData = "https://openlibrary.org/search.json?author=Kushwant+Singh";
    const fetchBooks = async () => {
      const books = await axios.get(apiData);
      setData(books.data.docs);
    };
    fetchBooks();
  }, []);

  const books = [
    {
      title: "The Jap Ji: the message of Guru Nanak.",
      authors: ["Nanak Singh", "Khushwant Singh"],
      publishYear: 1938,
      editions: 23,
      coverImage: "https://covers.openlibrary.org/b/id/240727-L.jpg",
    },
  ];
  return <BookList books={data} />;
}

export default App;
