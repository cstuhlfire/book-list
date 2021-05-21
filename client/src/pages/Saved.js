import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import Subheading from "../components/Subheading";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])

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
            <h5 style={{margin: 10,}}>Saved Books</h5>
            <hr></hr>     
            <div style={{margin: 10}}>
              <Row>          
                <Col size="md-12">
                    <List>
                      {books.map(book => (
                        <ListItem key={book._id}>
                            <strong>
                              {book.title} by {book.author}
                            </strong>
                          <DeleteBtn onClick={() => deleteBook(book._id)} />
                        </ListItem>
                      ))}
                    </List>
                </Col>
              </Row>
            </div>
          </Subheading>
    </div>
    );
  }


export default Search;
