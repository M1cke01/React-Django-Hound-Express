import { useState } from 'react';
/*import './App.css';*/
import PanelEstado from './components/PanelEstado';
import ListaGuias from './components/ListaGuias';
import FormularioRegistro from './components/FormularioRegistro';

function App() {
  const [actualizar, setActualizar] = useState(false);

  const triggerRefresh = () => {
    setActualizar(!actualizar)
  }

  return (
    <div>
      <h1>Sistema de guias</h1>
        <FormularioRegistro onNuevaGuia={triggerRefresh} />
        <ListaGuias refresh={actualizar} onUpdate={triggerRefresh} />
      <div>
        <PanelEstado refresh={actualizar} />
      </div>
    </div>
  );
}

export default App;
