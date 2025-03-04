import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/userInput.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Axios from "axios";

const UserInput: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<any>(null);
  const myRef = useRef(null);

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
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={() => {
            // if (search === "") myRef.current.style.display = "none";
            // else myRef.current.style.display = "block";
          }}
        >
          Search
        </Button>
      </InputGroup>

      <div className={search === "" ? "noResults" : "results"} ref={myRef}>
        {/* {addresses?.geometry?.location?.lat && (
          <h2>Country : {addresses.address_components.country}</h2>
        )} */}
        <h2> Country : {addresses?.address_components?.country}</h2>

        {/* {addresses?.geometry?.location?.lat && (
          <h2>City : {addresses.address_components.name}</h2>
        )} */}

        <h2> City: {addresses?.address_components?.name}</h2>

        {/* {addresses?.geometry?.location?.lat && (
          <h1>lat :{parseFloat(addresses.geometry.location.lat)}</h1>
        )} */}
        <h2> lat: {addresses?.geometry?.location?.lat}</h2>
        {/* 
        {addresses?.geometry?.location?.lat && (
          <h1>lng : {parseFloat(addresses.geometry.location.lng)}</h1>
        )} */}

        <h2> lat: {addresses?.geometry?.location?.lng}</h2>

        <iframe
          width="425"
          height="350"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${addresses?.geometry?.location?.lng}%2C${addresses?.geometry?.location?.lat}%2C${addresses?.geometry?.location?.lng}%2C${addresses?.geometry?.location?.lat}&amp;layer=mapnik`}
          style={{ border: "1px solid black}" }}
        ></iframe>
        <br />
        <small>
          <a
            href={`https://www.openstreetmap.org/?#map=17/${addresses?.geometry?.location?.lat}/${addresses?.geometry?.location?.lng}`}
          >
            View Larger Map
          </a>
        </small>
      </div>
    </>
  );
};

export default UserInput;
