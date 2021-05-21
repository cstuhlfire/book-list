import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Subheading from "../components/Subheading";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
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
                        name="title"
                        placeholder="Title (required)"
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
                        <ListItem key={book._id}>
                          <Link to={"/search/" + book._id}>
                            <strong>
                              {book.title} by {book.author} id {book._id}
                            </strong>
                          </Link>
                          <DeleteBtn onClick={() => deleteBook(book._id)} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <h4>No Results to Display</h4>
                  )}
                </Col>
              </Row>
            </div>
          </Subheading>
    </div>
    );
  }


export default Search;