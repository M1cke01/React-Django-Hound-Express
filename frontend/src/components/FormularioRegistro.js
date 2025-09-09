import React, {useState} from "react";
import api from "../api";
import "../css/FormularioRegistro.css";

function FormularioRegistro({ onNuevaGuia}) {
    const [codigo, setCodigo] = useState("");
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/guias/", {
                codigo,
                origen,
                destino,
                estado: "activa"
            });
            setCodigo("");
            setOrigen("");
            setDestino("");
            if (onNuevaGuia) onNuevaGuia();
        } catch (error) {
            console.error("Error al crear guía:", error.response.data);
            alert("Error: revisa los datos ingresados");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="formulario-registro">
            <input 
                type="text"
                placeholder="Código"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
            />
            <input 
                type="text"
                placeholder="Origen"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                required
            />
            <input 
                type="text"
                placeholder="Destino"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                required
            />
            <button type="submit">Registrar Guía</button>
        </form>
    );
}

export default FormularioRegistro;