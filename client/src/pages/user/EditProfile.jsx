import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Jumbotron from "../../components/menu/Jumbotron";
import { useAuth } from "../../context/AuthContext";
import UserMenu from "./../../components/menu/UserMenu";

function EditProfile() {
  // hooks
  const [auth, setAuth] = useAuth();

  // states
  const [update, setUpdate] = useState();

  useEffect(() => {
    setUpdate(auth);
  }, []);

  async function updateProfile(e) {
    e.preventDefault();
    try {
      console.log("works");
      let { data } = await axios.put(`/edit/profile/${auth?.user?._id}`, {name: update,});

      const token = JSON.parse(localStorage.getItem('userinfo'));
      if (data) {
        setAuth({ ...update, user:data.name });
        localStorage.setItem("userinfo", JSON.stringify({user:data,token:token.token}));
        // setAuth({ ...update, user: data?.name });
        // localStorage.setItem("userinfo", JSON.stringify({user:data,token:token.token}));
      } else {
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Jumbotron />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 bg-light mt-2 mb-2">PROFILNI O`ZGARTIRISH</div>
            <form onSubmit={updateProfile}>
              <input
                type="text"
                className="form-control mt-2"
                onChange={(e) => setUpdate(e.target.value)}
                placeholder="ISM"
                value={update?.user?.name}
              />
              <input
                disabled
                type="text"
                className="form-control mt-2"
                placeholder="ISM"
                value={auth?.user?.login}
              />
              <input type="password" className="form-control mt-2" placeholder="Parolingizni kiriting" />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Iltimos, manzilingizni kiriting"
              />
              <div className="my-3">
                <button className="btn btn-outline-warning">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
