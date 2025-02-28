import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/userInput.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect} from "react";
import Axios from "Axios";


const UserInput = () => {
      useEffect(() => {
    Axios.get(
      `http://localhost:8000/api`  
    ).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="title">Local Travel & Weather Dashboard</h1>

      <InputGroup className="mb-3">
        <Form.Control
          className="inputSearch"
          placeholder=""
          aria-label=""
          aria-describedby=""
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    
       
    </>
  );
};
export default UserInput;
