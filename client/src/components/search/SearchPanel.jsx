import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";

function SearchPanel() {
  // hooks
  const [value, setValue] = useSearch();

//   navigatsiya
const navigate = useNavigate();

  const handleSearch = async (e) => {
    console.log("click");
    e.preventDefault();
    try {
      let { data } = await axios.get(`/products/search/${value.keyword}`);
        setValue({...value,results:data});
        navigate('/search');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(value.results);

  return (
    <form className="d-flex " onSubmit={handleSearch}>
      <input
        type="text"
        className="form-control"
        placeholder="Qidirish"
        value={value.keyword}
        onChange={(e) => setValue({ ...value, keyword: e.target.value })}
      />
      <button className="btn btn-outline-primary">Qidirish</button>
    </form>
  );
}

export default SearchPanel;
