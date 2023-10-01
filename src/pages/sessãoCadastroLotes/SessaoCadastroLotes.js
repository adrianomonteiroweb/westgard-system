import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SessaoCadastroLotes() {
  const [lotes, setLotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [novoLote, setNovoLote] = useState({
    analise: "",
    numeroLote: "",
    media: "",
    desvioPadrao: "",
  });

  useEffect(() => {
    const lotesSalvos = JSON.parse(localStorage.getItem("lotesDados"));
    if (lotesSalvos) {
      setLotes(lotesSalvos);
    }
  }, []);

  const persistirDados = () => {
    localStorage.setItem("lotesDados", JSON.stringify(lotes));
  };

  useEffect(() => {
    persistirDados();
  }, [lotes]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      novoLote.analise.trim() &&
      novoLote.numeroLote.trim() &&
      novoLote.media.trim() &&
      novoLote.desvioPadrao.trim()
    ) {
      setLotes([...lotes, novoLote]);
      setNovoLote({
        analise: "",
        numeroLote: "",
        media: "",
        desvioPadrao: "",
      });
    }
  };

  const handlePreviousLote = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setNovoLote(lotes[currentIndex - 1]);
    }
  };

  const handleNextLote = () => {
    if (currentIndex < lotes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setNovoLote(lotes[currentIndex + 1]);
    } else {
      setCurrentIndex(currentIndex + 1);
      setNovoLote({
        analise: "",
        numeroLote: "",
        media: "",
        desvioPadrao: "",
      });
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="text-center mb-3">
            <h2 className="mt-1">Controle de Qualidade</h2>
          </div>
          <h2 className="mb-1">Sessão: Cadastro de Lotes</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-1">
              <label htmlFor="analise" className="form-label">
                Análise:
              </label>
              <input
                type="text"
                className="form-control"
                id="analise"
                value={novoLote.analise}
                onChange={(e) =>
                  setNovoLote({ ...novoLote, analise: e.target.value })
                }
                required
                placeholder="Insira a análise"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="numeroLote" className="form-label">
                Número de Lote:
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroLote"
                value={novoLote.numeroLote}
                onChange={(e) =>
                  setNovoLote({ ...novoLote, numeroLote: e.target.value })
                }
                required
                placeholder="Insira o número de lote"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="media" className="form-label">
                Média:
              </label>
              <input
                type="text"
                className="form-control"
                id="media"
                value={novoLote.media}
                onChange={(e) =>
                  setNovoLote({ ...novoLote, media: e.target.value })
                }
                required
                placeholder="Insira a média"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="desvioPadrao" className="form-label">
                Desvio Padrão:
              </label>
              <input
                type="text"
                className="form-control"
                id="desvioPadrao"
                value={novoLote.desvioPadrao}
                onChange={(e) =>
                  setNovoLote({ ...novoLote, desvioPadrao: e.target.value })
                }
                required
                placeholder="Insira o desvio padrão"
              />
            </div>
            <div className="text-center">
              <Link to="/" className="btn btn-secondary ms-1">
                Sessão Anterior
              </Link>
              <button
                type="button"
                className="btn btn-primary ms-1"
                onClick={handlePreviousLote}
              >
                Período Anterior
              </button>
              <button
                type="button"
                className="btn btn-primary ms-1"
                onClick={handleNextLote}
              >
                Próximo Período
              </button>
              <Link to="/cadastro-lotes" className="btn btn-secondary ms-1">
                Próxima Sessão
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SessaoCadastroLotes;
