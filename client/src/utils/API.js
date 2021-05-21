import axios from "axios";


export default {
  // Gets google books by search criterial
  getGoogleBooks: function(searchString) {
    // use a regular expression to replace spaces with +
    let noSpaceSearch = searchString.replace(/\s/g, '+');
    console.log(noSpaceSearch);
    let bookString = `https://www.googleapis.com/books/v1/volumes?q=${noSpaceSearch}&maxResults=20&printType=books`;
    // let bookString = `https://www.googleapis.com/books/v1/volumes?q=${noSpaceSearch}`;
    return axios.get(bookString);
  },
  // Gets all database books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
