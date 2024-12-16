import React, { useState } from "react";
//import { debounce } from "lodash";

import { IoSearch } from "react-icons/io5";

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
        // style={{
        //   padding: "10px",
        //   marginBottom: "20px",
        //   fontSize: "14px",
        //   width: "200px",
        // //   position: "relative",
        //   left: "88em",
        //   borderRadius: "15px",
        //   top: "1em",
        //   border: "1px solid #8000FF",
        //   fontStyle: "italic",
        // }}
      />
      <span className="icon-search">
        <IoSearch size={25} />
      </span>

      {/*}<ul>
                {filteredData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>*/}
    </div>
  );
};

export default SearchWithDebounce;
