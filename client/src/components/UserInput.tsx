import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/userInput.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Axios from "axios";

const UserInput: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<any>(null);

  useEffect(() => {
    Axios.get(`http://localhost:8000/api/:${search}`)
      .then((res) => {
        console.log(res.data.results[1].formatted_address);

        setAddresses(res.data.results[1]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [search]);

  return (
    <>
      <h1 className="title">Local Travel & Weather Dashboard</h1>

      <InputGroup className="mb-3">
        <Form.Control
          className="inputSearch"
          placeholder=""
          aria-label=""
          aria-describedby=""
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>

      <div className={search === "" ? "noResults" : "results"}>
        {addresses?.geometry?.location?.lat && (
          <h2>Country : {addresses.address_components.country}</h2>
        )}
        {addresses?.geometry?.location?.lat && (
          <h2>City : {addresses.address_components.name}</h2>
        )}
        {addresses?.geometry?.location?.lat && (
          <h1>lat :{parseFloat(addresses.geometry.location.lat)}</h1>
        )}
        {addresses?.geometry?.location?.lat && (
          <h1>lng : {parseFloat(addresses.geometry.location.lng)}</h1>
        )}
  
      </div>
    </>
  );
};

export default UserInput;
