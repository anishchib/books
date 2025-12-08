import { use, useEffect, useState } from "react";

import "./App.css";
import BookList from "./BookList";
import axios, { AxiosError } from "axios";
import BookLoader from "./BookLoader";
import NavBar from "./NavBar";
import { ErrorMessage } from "./ErrorMessage";
function App() {
  const [author, setAuthor] = useState("");
  const [bookData, setBookData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error1, setError1] = useState(""); // const [query,setQuery] = useState('');
  // const query = "Anish";
  //const apiData = `https://openlibrary.org/search.json?author=${query}`;
  // const apiData = `https://openlibrary.org/search/authors.json?q=${query}`;
  // const getBooks = async () => {
  //   const authorData = await axios.get(apiData);
  //   console.log(authorData.data.docs);
  //   return authorData.data.docs;
  // };

  useEffect(() => {
    //const apiData = "https://openlibrary.org/search.json?author=Kushwant+Singh";

    const fetchBooks = async () => {
      try {
        setLoader(true);
        // console.log(author);
        const books = await axios.get(
          `https://openlibrary.org/search.json?author=${author}&sort=new`
        );
        if (books.data.numFound === 0) {
          throw new Error("No-Author");
        }
        setBookData(books.data.docs);
        // setLoader(false);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          //alert("no internet connection");

          setError1("No Internet Connection or Problem in Fetching the Data");
        } else if (error.message === "No-Author") {
          setError1("Author Books Data Not Found.....");
        } else if (
          error.code === "ERR_CANCELED" ||
          error.code === "ERR_ABORTED"
        ) {
          setError1("Request aborted by the client.");
        } else {
          // Other errors (e.g., setup issues)
          console.error("Error Message:", error.message);
        }
      } finally {
        setLoader(false);
        setError1("");
      }
    };
    fetchBooks();
  }, [author]);

  // const books = [
  //   {
  //     title: "The Jap Ji: the message of Guru Nanak.",
  //     authors: ["Nanak Singh", "Khushwant Singh"],
  //     publishYear: 1938,
  //     editions: 23,
  //     coverImage: "https://covers.openlibrary.org/b/id/240727-L.jpg",
  //   },
  // ];

  return (
    <>
      <NavBar author={author} setAuthor={setAuthor} count={bookData.length} />
      <div className="two-box-wrapper">
        <div className="box left-box">
          {loader && <BookLoader />}
          {!loader && !error1 && <BookList books={bookData} />}
          {error1 && <ErrorMessage message={error1} />}
        </div>
        <div className="box right-box">Right Box Content</div>
      </div>
      {/* {loader ? <BookLoader /> : <BookList books={bookData} />} */}
    </>
  );
}

export default App;
