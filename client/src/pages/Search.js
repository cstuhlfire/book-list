import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Subheading from "../components/Subheading";

function Search() {
  // Setting our component's initial state
  let [books, setBooks] = useState([])
  let [bookObject, setbookObject] = useState({})

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setbookObject({...bookObject, [name]: value})
  };

  // When the form is submitted, use the saveBooks method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();

    API.getGoogleBooks(bookObject.searchString)
    .then(res => {
      if (res.data.items === undefined) {
        books = [];
      }
      else {
        setBooks(res.data.items);
      }
    })
    .catch(err => console.log(err));
  };
  
  // parse book object data to validate and create an object that can be saved
  function parseSaveBook(currentBook) {
    let index = 0;
    let title = "";
    let authorList = "";
    let description = "";
    let image = "";
    let bookLink = "";
    
    // parse the book object data
    if (currentBook.volumeInfo.hasOwnProperty("title")) {
      title = currentBook.volumeInfo.title;
    }

    if (currentBook.volumeInfo.hasOwnProperty("authors")) {
      if (currentBook.volumeInfo.authors.length > 1) {
        authorList += currentBook.volumeInfo.authors.map((author) => " "+author);
      } else {
        authorList = currentBook.volumeInfo.authors[index];
      }
    }

    if (currentBook.volumeInfo.hasOwnProperty("description")) {
      description = currentBook.volumeInfo.description;
    }

    if (currentBook.volumeInfo.hasOwnProperty("imageLinks")) {
      image = currentBook.volumeInfo.imageLinks.smallThumbnail;
    }

    if (currentBook.volumeInfo.hasOwnProperty("infoLink")) {
      bookLink = currentBook.volumeInfo.infoLink;
    }

    // create object
    let saveBookObj = {
      id: currentBook.id,
      title: title.trim(),
      author: authorList.trim(),
      description: description.trim(),
      image: image.trim(),
      link: bookLink.trim()
    }

    return saveBookObj;
  }

  function handleSaveSubmit(event) {
     let index = 0;
     let saveBook = books.filter((book) => book.id === event.target.value);
     let currentBook = saveBook[index];

     let saveBookObj = parseSaveBook(currentBook);

    if (saveBookObj.title) {
      API.saveBook({
        id: saveBookObj.id,
        title: saveBookObj.title,
        author: saveBookObj.author,
        description: saveBookObj.description,
        image: saveBookObj.image,
        link: saveBookObj.link
      })
        .then(res => console.log("Book saved"))
        .catch(err => console.log(err));
    }
  };

  function handleViewSubmit(event) {
    let index = 0;
    let saveBook = books.filter((book) => book.id === event.target.value);
    let currentBook = saveBook[index];

    let saveBookObj = parseSaveBook(currentBook);
    window.open(saveBookObj.link, "_blank");
   };

    return (
      <div className="container">
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>Google Books Search</h2>
              <h5>Search Google Books and Build the Ultimate Book List</h5>
            </Jumbotron>
          </Col>
         </Row> 

          <Subheading>
            <h5 style={{margin: 10,}}>Book Search</h5>
            <hr></hr>
            <div style={{margin: 10}}>
              <Row >
                <Col size="md-12">
                    <form>
                      <Input
                        onChange={handleInputChange}
                        name="searchString"
                        placeholder="Book search string"
                      />
                      <FormBtn onClick={handleFormSubmit}
                      >Search
                      </FormBtn>
                    </form>
                </Col>
              </Row>
            </div>
          </Subheading>
 
          <Subheading>
            <h5 style={{margin: 10,}}>Results</h5>
            <hr></hr>     
            <div style={{margin: 10}}>
              <Row>          
                <Col size="md-12">
                  {books.length > 0 ? (
                    <List>
                      {books.map(book => (
                        
                         <ListItem key={book.id}>
                         <div style={{paddingBottom: 30}}>
                            <span>
                            <FormBtn value={book.id} onClick={handleSaveSubmit}>Save</FormBtn>
                            <FormBtn value={book.id} onClick={handleViewSubmit}>View</FormBtn>
                            </span>
                              {book.volumeInfo.hasOwnProperty("authors") ? (
                                <h5>{book.volumeInfo.title} by {book.volumeInfo.authors.map((author) => author+" ")}</h5>
                              ) : <h5>{book.volumeInfo.title}</h5>}
                          </div>
                          <Row>
                              <Col size="md-2">
                                  {(book.volumeInfo.hasOwnProperty("imageLinks")) ? (
                                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt={book.volumeInfo.title}/>
                                  ) : (<img src="" alt={book.volumeInfo.title}/>)}
                              </Col>
                              <Col size="md-8">
                                  <p>{book.volumeInfo.description}</p>
                              </Col>
                          </Row>
                        </ListItem>
                      ))}
                    </List>
                    ) : (<p>Search results</p>) 
                  }
                </Col>
              </Row>
            </div>
          </Subheading>
    </div>
    );
  }


export default Search;
