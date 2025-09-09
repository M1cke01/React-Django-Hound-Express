import { useEffect, useState } from "react";
import api from "../api";
import "../css/ListaGuias.css";

export default function ListaGuias ({refresh, onUpdate}) {
    const [guias, setGuias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cargarGuias = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get("/guias/");
            setGuias(res.data);
        } catch (err) {
            setError("Error cargando guías.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarGuias();
    }, [refresh]);

    const actualizarEstado = async (id, nuevoEstado) => {
        try {
            await api.patch(`/guias/${id}/`, { estado: nuevoEstado});
            setGuias(prev => prev.map(g => g.id === id ? { ...g, estado: nuevoEstado} : g));
            if (onUpdate) onUpdate();
        } catch (err) {
            console.error("Error actualizando estado", err);
            alert("No se pudo actualizar el estado. Revisa la consola");
        }
    };

    if (loading) return <div>Cargando guías...</div>;
    if (error) return <div>{error}</div>

    return (
        <div className="lista-guia">
            <h3>Lista de Guias</h3>
            <ul>
                {guias.map((g) => (
                    <li key={g.id}>
                        <strong>{g.origen}</strong>
                        <strong>{g.destino}</strong>
                        <div>Estado: {g.estado}</div>
                        <div>
                            <select value={g.estado} onChange={(e) => actualizarEstado(g.id, e.target.value)}>
                                <option value="activa">Activa</option>
                                <option value="transito">En tránsito</option>
                                <option value="entregada">Entregada</option>
                            </select>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}