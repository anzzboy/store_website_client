import { useState } from "react";
import Cookies from "universal-cookie";

import Navbar from "./Navbar";

/* eslint-disable react/prop-types */
export function Button({ func, text }) {
  return (
    <>
      <button onClick={func}>{text}</button>
    </>
  );
}

function Home() {
  const cookies = new Cookies();

  const [order, setOrder] = useState(
    cookies.get("cart")
      ? cookies.get("cart")
      : {
          hd: 0,
          sd: 0,
          price: 0,
        }
  );

  const func = async (food) => {
    if (food == "hd") {
      cookies.set(
        "cart",
        {
          ...order,
          hd: order.hd + 1,
          price: order.hd * 3 + 3 + order.sd * 2,
        },
        { path: "/" }
      );
      setOrder({
        ...order,
        hd: order.hd + 1,
        price: order.hd * 3 + 3 + order.sd * 2,
      });
    } else if (food == "sd") {
      cookies.set(
        "cart",
        {
          ...order,
          sd: order.sd + 1,
          price: order.hd * 3 + 2 + order.sd * 2,
        },
        { path: "/" }
      );
      setOrder({
        ...order,
        sd: order.sd + 1,
        price: order.hd * 3 + 2 + order.sd * 2,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="grid-container">
        <div className="grid-item">
          <img
            src="https://cdn.pixabay.com/photo/2022/11/21/02/44/hot-dog-7605754_1280.jpg"
            alt="Hotdog Image"
          />
          <br />
          <Button func={() => func("hd")} text="Hotdog" />
          {" " + order.hd}
        </div>
        <div className="grid-item">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/21/01/39/coca-cola-2160843_1280.jpg"
            alt="Soda Image"
          />
          <br />
          <Button func={() => func("sd")} text="Soda" />
          {" " + order.sd}
        </div>
      </div>
      <div />
    </>
  );
}

export default Home;
