//Hooks
import React, { useState } from "react";

//Images
import logo from "../assets/img/logo.jpg";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CLIENT_RENEG_LIMIT } from "tls";

//style
import "../styles/userInput.css";

//icons
import { IoSearchOutline } from "react-icons/io5";

type UserInputProps = {
  onCityChange: (city: string) => void;
  setLatitude: (latitude: string) => void;
  setLongitude: (longitude: string) => void;
};

// type addressResult = {
//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };
// };
const UserInput: React.FC<UserInputProps> = ({
  onCityChange,
  setLatitude,
  setLongitude,
}) => {
  const [search, setSearch] = useState<string>("");
  // const [addresses, setAddresses] = useState<addressResult | null>(null);
  // const [show, setShow] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    if (!search) return;
    onCityChange(search);
    const location = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/${search}`);
        const data = await response.json();

        console.log(data);
        // setAddresses(data.results[1]);
        setLatitude(data.results[1].geometry.location.lat);
        setLongitude(data.results[1].geometry.location.lng);
        // setShow(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    location();
  };

  return (
    <>
      <div className="inputAndBtnAndLogo flex">
        {/* <img className="w-[150px] logo" src={logo} /> */}
        <div className="relative self-center inputAndBtn">
          <h1 className="text-[24px] text-center self-center heading">
            {/* Local Travel & Weather Dashboard */}
          </h1>
          <input
            className="searchInput w-[500px] h-[42px]  "
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
            value={search}
            placeholder="Enter an address, country, city"
            onChange={handleInputChange}
          />
          <IoSearchOutline className="searchBtn" onClick={handleSearchClick} />

          {/* <button
            className="bg-gray-100 px-4 py-2 text-gray hover:bg-white-100 sm:px-8 sm:py-3  rounded-full searchBtn"
            onClick={handleSearchClick}
          >
            Search
          </button> */}
          {/* <hr /> */}
        </div>
      </div>

      {/* {show && addresses && (
        <div className="map">
          <iframe
            className="iframe"
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
      )} */}
    </>
  );
};

export default UserInput;
