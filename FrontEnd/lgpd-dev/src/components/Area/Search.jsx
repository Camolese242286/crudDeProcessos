import React, { useState } from "react";
// import style from "@/components";
import { IoSearch } from "react-icons/io5";
import "../../styles/StyleArea/area.css";

const Search = ({ areas, setAreasFiltrados }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setAreasFiltrados(areas);
      return;
    }

    const resultados = areas.filter((area) =>
      area?.nome?.toLowerCase().includes(value)
    );
    setAreasFiltrados(resultados);
  };

  return (
    <div>
      {/* <input
        className="input_container"
        type="text"
        placeholder={
          areas.length === 0 ? "Nenhuma área disponível" : "Buscar area..."
        }
        value={query}
        onChange={handleSearch}
      />
      <span className="icon">
        <IoSearch size={25} />
      </span> */}

      <div class="input-container">
        <input type="text" placeholder="Buscar" />
        <span class="icon"><IoSearch size={25} /></span>
      </div>
    </div>
  );
};
export default Search;
