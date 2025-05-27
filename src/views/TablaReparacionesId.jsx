import React, { useState } from "react";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Input } from "@mui/material";

function TablaReparacionesId() {
  const [cajaBusqueda, setCajaBusqueda] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCajaBusqueda((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    console.log(name, value);
  };

  const handleSubmit = () =>{

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ci">ID:</label>
          <Input
            id="ci"
            name="ci"
            onChange={handleChange}
            placeholder="Ingrese id de su reparacion para realizar la busqueda"
            sx={{ width: "500px" }}
          />
          <Button
            variant="contained"
            color="info"
            size="small"
            type="submit"
            endIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TablaReparacionesId;
