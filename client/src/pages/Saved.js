import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import Subheading from "../components/Subheading";

function Saved() {
  const [books, setBooks] = useState({})
 
  useEffect(() => {

    API.getBooks()
      .then(res => setBooks(res.data))
      .catch(err => console.log(err));
  }, [])

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

            </Col>
          </Row>
        </div>
      </Subheading>
    </div>
    );
  }


export default Saved;
