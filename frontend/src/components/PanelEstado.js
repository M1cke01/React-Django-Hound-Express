import { useEffect, useState } from "react";
import api from "../api";
import "../css/PanelEstado.css";

export default function PanelEstado({ refresh }) {
    const [estadisticas, setEstadisticas] = useState(null);
    const [error, setError] = useState(null);

    const cargarDatos = async () => {
        setError (null);
        try {
            const res = await api.get("/guias/");
            const guias = res.data;
            setEstadisticas({
                total: guias.length,
                activas: guias.filter((g) => g.estado === "activa").length,
                transito: guias.filter((g) => g.estado === "transito").length,
                entregadas: guias.filter((g) => g.estado === "entregada").length,
            });
        } catch (err) {
            setError("No se pudo cargar estadísticas.");
            console.error(err);
        }
    };

    useEffect(() => {
        cargarDatos ();
    }, [refresh]);

    if(error) return <div>{error}</div>;
    if (!estadisticas) return <div>Cargando estadisticas...</div>;

    return (
        <div className="panel-estado">
            <h3>Panel de Estado</h3>
            <p>Total: {estadisticas.total}</p>
            <p>Activas: {estadisticas.activas}</p>
            <p>En tránsito: {estadisticas.transito}</p>
            <p>Entregadas: {estadisticas.entregadas}</p>
        </div>
    );
}