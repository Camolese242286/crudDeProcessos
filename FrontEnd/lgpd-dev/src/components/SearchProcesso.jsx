import React, { useState } from "react";
//import { debounce } from "lodash";

import { IoSearch } from "react-icons/io5";
import Search from "./Area/Search";
import "../styles/processos.css";

const SearchWithDebounce = ({ processos, setProcessosFiltrados }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      //Se o campo de busca está vazio, restaura todos os processos
      setProcessosFiltrados(processos);
      return;
    }

    const resultados = processos.filter((processo) =>
      processo?.nome?.toLowerCase().includes(value)
    );
    setProcessosFiltrados(resultados);
  };

  return (
    <div className="componente_Search">
      <input
        type="text"
        placeholder={
          processos.length === 0
            ? "Nenhum processo disponível"
            : "Buscar processo..."
        }
        value={query}
        onChange={handleSearch}
      />
      <span className="icon-search">
        <IoSearch size={25} />
      </span>
    </div>
  );
};

export default SearchWithDebounce;
