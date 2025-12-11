import { useEffect, useEffectEvent, useState } from "react";

import "./App.css";
import BookList from "./BookList";
import axios, { AxiosError } from "axios";
import BookLoader from "./BookLoader";
import NavBar from "./NavBar";
import { ErrorMessage } from "./ErrorMessage";
import BookWorkDetail from "./BookWorkDetail";

function App() {
  // const work = {
  //   title: "Anish Kapoor.",
  //   author: "Galerie 't Venster (Rotterdam, Netherlands)",
  //   publishDate: "1983",
  //   publisher: "Galerie 't Venster",
  //   language: "Undetermined",
  //   pages: 14,
  //   coverImage: "", // add cover URL if you have
  //   editionId: "OL21464084M",
  //   workId: "OL13389498W",
  //   editionNotes: "Exhibition catalogue Jan.–Feb. 1983.",
  // };

  const [author, setAuthor] = useState("");
  const [bookData, setBookData] = useState([]);

  const [count, setCount] = useState(0);
  //const { selectedTitle, setSelectedTitle } = useState("");
  // concount,st [loader, setLoader] = useState(false);
  // const [error1, setError1] = useState(""); // const [query,setQuery] = useState('');
  const [status, setStatus] = useState("idle");
  const [workdDetails, setWorkDetails] = useState([]);
  // const query = "Anish";
  //const apiData = `https://openlibrary.org/search.json?author=${query}`;
  // const apiData = `https://openlibrary.org/search/authors.json?q=${query}`;
  // const getBooks = async () => {
  //   const authorData = await axios.get(apiData);
  //   console.log(authorData.data.docs);
  //   return authorData.data.docs;
  // };
  const [selectedWork, setSelectedWork] = useState("");

  const handleSelectBook = (key) => {
    setSelectedWork(key);
    console.log("Selected Book:", key);
  };

  useEffect(() => {
    document.title = `Books by ${author || "Author"}`;
  }, [author]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchWorks = async () => {
      try {
        const works = await axios.get(
          `https://openlibrary.org${selectedWork}/editions.json`,
          { signal: controller.signal }
        );
        console.log(works.data.entries);
        setWorkDetails(works.data.entries);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };
    fetchWorks();
    return () => {
      // Cleanup ifcont needed
      controller.abort();
    };
  }, [selectedWork]);

  useEffect(() => {
    //const apiData = "https://openlibrary.org/search.json?author=Kushwant+Singh";
    //https://openlibrary.org/search.json?author=${encodeURIComponent(authorName)}
    //https://openlibrary.org/search.json?q=${author}&sort=new
    const controller = new AbortController();
    const fetchBooks = async () => {
      try {
        setStatus("loading");
        console.log(author);
        const books = await axios.get(
          `https://openlibrary.org/search.json?q=${author}&sort=new`,
          { signal: controller.signal }
        );
        console.log(books.data.numFound);
        setCount(books.data.numFound);
        if (books.data.numFound === 0) {
          throw new Error("No-Author");
        }
        setBookData(books.data.docs);
        setStatus("idle");
        // setLoader(false);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          //alert("no internet connection");

          setStatus("error");
        } else if (error.message === "No-Author") {
          //console.log(error.message);

          setStatus("error");
          console.log(status);
        } else if (
          error.code === "ERR_CANCELED" ||
          error.code === "ERR_ABORTED"
        ) {
          setStatus("error");
        } else {
          // Other errors (e.g., setup issues)
          setStatus("Error");
          console.error("Error Message:", error.message);
        }
      } finally {
        // console.log(error1);
      }
    };
    fetchBooks();
    return () => {
      // Cleanup if needed
      controller.abort();
    };
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
      <NavBar author={author} setAuthor={setAuthor} count={count} />
      <div className="two-box-wrapper">
        <div className="box left-box">
          {status === "loading" && <BookLoader />}
          {status === "idle" && (
            <BookList books={bookData} onSelectBook={handleSelectBook} />
          )}
          {status === "error" && <ErrorMessage message={status} />}
        </div>
        <div className="box right-box">
          {/* {selectedWork && <p>{selectedWork}</p>} */}
          {/* <BookWorkDetail work={work} /> */}
          <BookWorkDetail work={workdDetails} />
        </div>
      </div>
      {/* {loader ? <BookLoader /> : <BookList books={bookData} />} */}
    </>
  );
}

export default App;
