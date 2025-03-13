//Hooks
import React, { useState, useEffect, useRef } from "react";
//Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//Style
import "../styles/userInput.css";
//Packages
import Axios from "axios";
//Images
import logo from "../assets/img/logo.jpg"

interface UserInputProps {
  onCityChange: (city: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onCityChange }) => {
  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<any>(null);
  const [lat, setLat] = useState<number | string | any>("");
  const [lng, setLng] = useState<number | string | any>("");

  const disabled1 = search ? true : false;
  const disabled2 = lat || lng ? true : false;

  const myRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setSearch(newCity);
    onCityChange(newCity);
  };

  // useEffect(() => {
  //   if (search) {
  //     Axios.get(`http://localhost:8000/api/${search}`)
  //       .then((res) => {
  //         setAddresses(res.data.results[1]);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data: ", error);
  //       });
  //   }
  // }, [search]);
  const handleSearchClick = () => {
    if (search) {
      Axios.get(`http://localhost:8000/api/${search}`)
        .then((res) => {
          setAddresses(res.data.results[1]);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
    myRef.current.style.display = "block";
  };

  useEffect(() => {
    if (lat && lng) {
      Axios.get(`http://localhost:8000/ap/${lat}/${lng}`)
        .then((res) => {
          setLat(res.data.results[1].formatted_address);
          setLng(res.data.results[1].formatted_address);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [lat, lng]);
  return (
    <>
    <div className="header">
    <img className="logo"src={logo} />
    <div className="searchInput">
      <h1 className="title">Local Travel & Weather Dashboard</h1>
      {/* <h2 className="searchTitle">Search by address, country, or city</h2> */}
      {/* search by address */}
      <InputGroup className="mb-3">
        <Form.Control
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSearchClick();
            }
          }}
          className="inputSearch"
          placeholder=""
          aria-label=""
          aria-describedby=""
          value={search}
          placeholder="Enter an address, country, city"
          onChange={handleInputChange}
          disabled={disabled2}
        />
        <Button
          variant="outline-secondary"
          id="button-addon2"
          // onClick={() => void{
          //   // if (search === "") myRef.current.style.display = "none";
          //   // else myRef.current.style.display = "block";
          //   // myRef.current.style.display = "block";
          //   // setSearch("")

          // }}
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </InputGroup>
      <hr />
      </div>
      </div>


      {/* search by lat & lng  */}
      {/* <h2 className="searchTitle">Search By latitude and longitude</h2> */}
      {/* <InputGroup className="lat-lng"> */}
      {/* <InputGroup.Text>First and last name</InputGroup.Text> */}
      {/* <label htmlFor="lat">Latitude</label> */}
      {/* <Form.Control
          className="lat"
          id="lat"
          aria-label="Latitude"
          value={lat}
          onChange={(e) => {
            setLat(e.target.value);
          }}
          placeholder="latitude"
          disabled={disabled1}
        />
        <label htmlFor="lng">Longitude</label>
        <Form.Control
          className="lng"
          id="lng"
          aria-label="Longitude"
          value={lng}
          onChange={(e) => {
            setLng(e.target.value);
          }}
          placeholder="longitude"
          disabled={disabled1}
        />
      </InputGroup> */}

      <div className="results" ref={myRef}>
        {/* {addresses?.geometry?.location?.lat && (
          <h2>Country : {addresses.address_components.country}</h2>
        )} */}
        {/* <h2 > Country : {addresses?.address_components?.country}</h2> */}

        {/* {addresses?.geometry?.location?.lat && (
          <h2>City : {addresses.address_components.name}</h2>
        )} */}

        {/* <h2> City: {addresses?.address_components?.name}</h2> */}

        {/* {addresses?.geometry?.location?.lat && (
          <h1>lat :{parseFloat(addresses.geometry.location.lat)}</h1>
        )} */}
        {/* <h2> lat: {addresses?.geometry?.location?.lat}</h2> */}
        {/* 
        {addresses?.geometry?.location?.lat && (
          <h1>lng : {parseFloat(addresses.geometry.location.lng)}</h1>
        )} */}

        {/* <h2> lat: {addresses?.geometry?.location?.lng}</h2> */}

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

      {/* Lat and Lng */}
      <div>
        <h3 className={lat && lng ? "latAndLng" : "noLatOrLng"}>{lat}</h3>
      </div>
    </>
  );
};

export default UserInput;

// className={search === "" ? "noResults" : "results"}
