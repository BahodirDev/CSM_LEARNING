import { Badge } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCarts } from "../../context/Carts";
import SearchPanel from "../search/SearchPanel";
import { useSelector } from "react-redux";

function Navbar() {
  //
  const { categories } = useSelector((state) => state.categories);

  // context
  const [auth, setAuth] = useAuth();
  const [carts, setCarst] = useCarts();

  // logout function
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("userinfo");
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-light p-3 shadow">
      <ul className="nav ">
        <li className="nav-item">
          <NavLink to={"/"} className="nav-link">
            ASOSIY
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/shop"} className="nav-link">
            SHOP
          </NavLink>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            CATEGORIES
          </a>
          <ul class="dropdown-menu">
            <li className="nav-link text-center m-auto">
              {categories
                ? categories?.map((p, ind) => {
                    return (
                      <>
                        <NavLink to={`/category/${p.slug}`} className="link" style={{ color: "black"}} key={ind}>
                          {p.name}
                          <br />
                        </NavLink>
                        <br />
                      </>
                    );
                  })
                : "Hech narsa topilmadi ???"}
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink to={"/carts"} className="nav-link">
            <Badge count={carts.length}>
              <i class="fa-sharp fa-solid fa-bag-shopping icons_size"></i>
            </Badge>
          </NavLink>
        </li>

        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink to={"/login"} className="nav-link">
                LOGIN
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/register"} className="nav-link">
                REGISTER
              </NavLink>
            </li>
          </>
        ) : (
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {auth?.user?.name}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li className="nav-item">
                <NavLink
                  to={`/${
                    auth?.user?.isAdmin == true
                      ? "admin/dashboard"
                      : "user/dashboard"
                  }`}
                  className="nav-link"
                >
                  DASHBOARD
                </NavLink>
                <NavLink to={"/login"} onClick={logout} className="nav-link">
                  CHIQISH
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <li className="nav-item mx-3">
          <SearchPanel />
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
