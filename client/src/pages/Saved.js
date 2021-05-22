import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
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
  
  function viewBook(link) {  
    console.log(link);  
    window.open(link, "_blank");
  }

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
            <h5 style={{margin: 10,}}>Saved Books</h5>
            <hr></hr>     
            <div style={{margin: 10}}>
              <Row>          
                <Col size="md-12">
                    <List>
                      {books.map(book => (
                        <ListItem key={book._id}>
                          <div style={{paddingBottom: 30}}>
                          <span>
                            <DeleteBtn onClick={() => deleteBook(book._id)} />
                            <FormBtn onClick={() => viewBook(book.link)}>View</FormBtn>
                             <h5>{book.title} by {book.author}</h5>
                          </span>  
                          </div>
                          <Row>
                              <Col size="md-2">
                                  {(book.image) ? (
                                    <img src={book.image} alt={book.title}/>
                                  ) : (<img src="" alt={book.title}/>)}
                              </Col>
                              <Col size="md-8">
                                  <p>{book.description}</p>
                              </Col>
                          </Row>

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
