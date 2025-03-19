//Hooks
import React, { useState } from "react";

//Images
import logo from "../assets/img/logo.jpg";

type UserInputProps = {
  onCityChange: (city: string) => void;
};

type addressResult = {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};
const UserInput: React.FC<UserInputProps> = ({ onCityChange }) => {
  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<addressResult | null>(null);
  const [show, setShow] = useState<boolean>(false);

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
        setAddresses(data.results[1]);
        setShow(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    location();
  };

  return (
    <>
      <div className="flex justify-around">
        <img className="w-[150px]" src={logo} />

        <div className="searchInput">
          <h1 className="text-[24px] text-center">
            Local Travel & Weather Dashboard
          </h1>
          <input
            className="w-[500px] h-[42px]"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
            value={search}
            placeholder="Enter an address, country, city"
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-100 px-4 py-2 text-gray hover:bg-red-400 sm:px-8 sm:py-3"
            onClick={handleSearchClick}
          >
            Search
          </button>

          <hr />
        </div>
        <img className="w-[150px]" src={logo} />
      </div>

      {show && addresses && (
        <div className="text-center">
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
      )}
    </>
  );
};

export default UserInput;
