//Hooks
import React, { useState, useRef } from "react";
//Bootstrap
import "bootstrap/dist/css/bootstrap.css";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//Tailwind

//Style
import "../styles/userInput.css";
//Images
import logo from "../assets/img/logo.jpg";

interface UserInputProps {
  onCityChange: (city: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ onCityChange }) => {

  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<any>(null);

  const myRef = useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    if (search) {
      onCityChange(search);
      const location = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/${search}`);
          const data = await response.json();
          console.log(data);
          setAddresses(data.results[1]);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };
      location();
    }
    myRef.current.style.display = "block";
  };

  return (
    <>

      <div className="header">
        <img className="logo" src={logo} />
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
            />
            {/* <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={handleSearchClick}
            >
              Search
            </Button> */}
           <button className="bg-sky-300 px-4 py-2 text-gray hover:bg-sky-700 sm:px-8 sm:py-3"  onClick={handleSearchClick}>Search</button>
          </InputGroup>
          <hr />
        </div>
      </div>

      <div className="results" ref={myRef}>
        <iframe
          width="425"
          height="350"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=
          ${addresses?.geometry?.location?.lng}%2C
          ${addresses?.geometry?.location?.lat}%2C
          ${addresses?.geometry?.location?.lng}%2C
          ${addresses?.geometry?.location?.lat}&amp;layer=mapnik`}
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
