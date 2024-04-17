import { useState } from "react";
import Cookies from "universal-cookie";
import Navbar from "./Navbar";

function Checkout() {
  const cookies = new Cookies();

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const [order, setOrder] = useState(
    cookies.get("cart")
      ? cookies.get("cart")
      : {
          hd: 0,
          sd: 0,
          price: 0,
        }
  );

  if (/[^0-9.]/i.test(input)) {
    setInput(input.slice(0, -1));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setInput(parseFloat(input));

    if (input < order.price) {
      setMessage("Please pay more money");
      setInput("");
      return;
    }

    setMessage((order.price - input) * -1 + "$ Change");

    setInput("");

    try {
      // update db
      const response = await fetch(
        `https://store-website-backend.onrender.com/lists/`,
        {
          method: `POST`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!response.ok) {
        console.error(`A error has occurred: ${response.statusText}`);
        return;
      }
    } catch (e) {
      console.error("Fetch error: ", e);
    }
    setOrder({ hd: 0, sd: 0, price: 0 });
    cookies.set("cart", { hd: 0, sd: 0, price: 0 }, { path: "/" });
  };

  return (
    <>
      <Navbar />
      <h1>
        {order.hd + " Hotdogs"}
        <br />
        {order.sd + " Sodas"}
        <br />
        {order.price + "$"}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input type="submit" value="Buy" />
      </form>
      <p>{message}</p>
    </>
  );
}

export default Checkout;
