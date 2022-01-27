import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [playOnce, setPlayOnce] = useState(true);

  useEffect(() => {
    if (playOnce) {
      axios.get("https://restcountries.com/v3.1/all").then((res) => {
        setData(res.data);
        setPlayOnce(false);
      });
    }

    const sortedCountries = () => {
      const countryObj = Object.keys(data).map((i) => data[i]);
      const sortedArray = countryObj.sort((a, b) => {
        return b.population - a.population;
      });
      sortedArray.length = 30;
      console.log(sortedArray);
      setSortedData(sortedArray);
    };
    sortedCountries();
  }, [data, playOnce]);

  return (
    <div className='countries'>
      <ul className='countries-list'>
        {sortedData.map((country, name) => (
          <Card country={country} key={name} />
        ))}
      </ul>
    </div>
  );
};

export default Countries;
