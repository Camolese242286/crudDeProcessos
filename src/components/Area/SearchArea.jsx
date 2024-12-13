import React, { useState } from "react";

import { IoSearch } from "react-icons/io5";

const SearchWithArea = ({ areas, setAreasFiltrados }) => {
    const [query, setQuery] = useState("");

    const handleSearchArea = (event) => {
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
            <input
                type="text"
                placeholder={areas.length === 0 ? "Nenhuma área disponível" : "Buscar area..."}
                value={query}
                onChange={handleSearchArea}
                style={{
                    padding: "10px",
                    marginBottom: "20px",
                    fontSize: "14px",
                    width: "20%",
                    position: "fixed",
                    left: "90em",
                    borderRadius: "15px",
                    top: "11.5em",
                    border: "1px solid #8000FF",
                    fontStyle: "italic",
                }}
            />
            <span className="icon-searchArea">
                <IoSearch size={25} />
            </span>
        </div>
    )
}
export default SearchWithArea;