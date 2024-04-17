import { useState, useEffect } from "react";

import Navbar from "./Navbar";

export function App() {
  const [tem, setTem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://store-website-backend.onrender.com/lists/`
      );
      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
      const data = await response.json();
      setTem(data);
      console.log(tem);
    }
    fetchData();
    return;
  });

  let totalMoney = 0;
  tem.map((obj) => {
    totalMoney += obj.price;
  });

  let totalHd = 0;
  tem.map((obj) => {
    totalHd += obj.hd;
  });

  let totalSd = 0;
  tem.map((obj) => {
    totalSd += obj.sd;
  });

  return (
    <>
      <h2>
        {totalHd + " Hotdogs sold"} <br />
        {totalSd + " Sodas sold"} <br />
        {totalMoney + " Monys made"} <br />
      </h2>
    </>
  );
}

function Admin() {
  const [verified, setVerified] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input == "password") {
      setVerified(true);
    }
    setInput("");
  };

  return (
    <>
      <Navbar />
      {verified ? (
        <App />
      ) : (
        <>
          <h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <input type="submit" value="Submit" />
            </form>
          </h1>
        </>
      )}
    </>
  );
}

export default Admin;
