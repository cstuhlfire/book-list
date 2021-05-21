import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Subheading from "../components/Subheading";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [bookObject, setbookObject] = useState({})

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
  
 
  function handleSaveSubmit(book) {
     console.log(book);
    if (book.volumeInfo.title) {
      API.saveBook({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        description: book.volumeInfo.description
      })
        .then(res => alert("Books saved"))
        .catch(err => console.log(err));
    }
  };
  console.log(books);
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
                            <FormBtn onClick={() => handleSaveSubmit(book)}>Save</FormBtn>
                            <FormBtn onClick={handleFormSubmit}>View</FormBtn>
                            </span>
                             <h5>{book.volumeInfo.title} by {book.volumeInfo.authors.map((author) => author+" ")}</h5>
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
