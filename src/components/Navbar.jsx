import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="topnav">
        <button onClick={() => routeChange("/admin")}>Manager</button>
        <button onClick={() => routeChange("/")}>Shop</button>
        <button onClick={() => routeChange("/checkout")}>Checkout</button>
      </div>
    </>
  );
}

export default Navbar;
