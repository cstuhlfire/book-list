import React, { useState, useEffect } from "react";
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

  // Loads all books and sets them to books
  function loadBooks() {
    API.getGoogleBooks(bookObject.searchString)
      .then(res => 
        setBooks(res.data.items)
      )
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setbookObject({...bookObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    API.getGoogleBooks(bookObject.searchString)
    .then(res => 
      setBooks(res.data.items)
    )
    .catch(err => console.log(err));

  };
  
  // function handleSave(event) {
  //   event.preventDefault();
  //   if (bookObject.title && bookObject.author) {
  //     API.saveBook({
  //       title: bookObject.title,
  //       author: bookObject.author,
  //       synopsis: bookObject.synopsis
  //     })
  //       .then(res => loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

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
                  {books.length ? (

                    <List>
                      {books.map(book => (
                        <ListItem key={1}>
                          <div>
                            <FormBtn onClick={handleFormSubmit}>Save</FormBtn>
                            <FormBtn onClick={handleFormSubmit}>View</FormBtn>
                          </div>
                          <div>
                            <strong>
                              {book.volumeInfo.title}
                            </strong>
                          </div>
                        </ListItem>
                      ))}
                    </List>
                    ) : (
                      <p>Search for books</p>
                    ) 
                  }
                </Col>
              </Row>
            </div>
          </Subheading>
    </div>
    );
  }


export default Search;
