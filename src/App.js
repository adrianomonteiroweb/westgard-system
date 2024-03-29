import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// css style
import "./App.css";

// provider
import IsProvider from "./context/IsProvider";

import SessaoDadosLaboratoriais from "./pages/sessaoDadosLaboratotiais/SessaoDadosLaboratoriais";
import SessaoCadastroLotes from "./pages/sessãoCadastroLotes/SessaoCadastroLotes";
import SessaoRegistroAnalises from "./pages/sessaoRegistroAnalises/SessaoRegistroAnalises";
import Sessao10PrimeirosDias from "./pages/sessao10PrimeirosDias/SessaoRegistroAnalises";

function App() {
  return (
    <IsProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={[<SessaoDadosLaboratoriais key={""} />]} />
            <Route
              path="/cadastro-lotes"
              element={[<SessaoCadastroLotes key={""} />]}
            />
            <Route
              path="/registro-analises"
              element={[<SessaoRegistroAnalises key={""} />]}
            />
            <Route
              path="/10-primeiros-resultados"
              element={[<Sessao10PrimeirosDias key={""} />]}
            />
          </Routes>
        </Router>
      </div>
    </IsProvider>
  );
}

export default App;
