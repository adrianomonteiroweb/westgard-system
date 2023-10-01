import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SessaoCadastroLotes() {
  const [novoLote, setNovoLote] = useState({
    analise: "",
    numeroLote: "",
    media: "",
    desvioPadrao: "",
  });

  const [lotes, setLotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const lotesSalvos = JSON.parse(localStorage.getItem("lotesDados")) || [];
    setLotes(lotesSalvos);
    setNovoLote(lotesSalvos[currentIndex] || {});
  }, [currentIndex]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLote({
      ...novoLote,
      [name]: value,
    });
  };

  const handleNextLote = () => {
    if (
      !novoLote.analise ||
      !novoLote.numeroLote ||
      !novoLote.media ||
      !novoLote.desvioPadrao
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Salvar lote existente
    const novosLotes = [...lotes];
    novosLotes[currentIndex] = novoLote;
    setLotes(novosLotes);
    localStorage.setItem("lotesDados", JSON.stringify(novosLotes));

    setNovoLote({
      analise: "",
      numeroLote: "",
      media: "",
      desvioPadrao: "",
    });
    setCurrentIndex(currentIndex + 1);
  };

  const handlePreviousLote = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDeleteLote = () => {
    const shouldDelete = window.confirm(
      "Tem certeza de que deseja excluir este lote?"
    );

    if (shouldDelete) {
      const novosLotes = [...lotes];
      novosLotes.splice(currentIndex, 1);
      setLotes(novosLotes);
      localStorage.setItem("lotesDados", JSON.stringify(novosLotes));

      if (currentIndex > 0) {
        setCurrentIndex(novosLotes.length - 1);
      } else if (novosLotes.length > 0) {
        setCurrentIndex(0);
      }
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
          <form>
            <div className="mb-1">
              <label htmlFor="analise" className="form-label">
                Análise:
              </label>
              <input
                type="text"
                className="form-control"
                id="analise"
                name="analise"
                value={novoLote.analise}
                onChange={handleInputChange}
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
                name="numeroLote"
                value={novoLote.numeroLote}
                onChange={handleInputChange}
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
                name="media"
                value={novoLote.media}
                onChange={handleInputChange}
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
                name="desvioPadrao"
                value={novoLote.desvioPadrao}
                onChange={handleInputChange}
                required
                placeholder="Insira o desvio padrão"
              />
            </div>
            <div className="text-center">
              <Link to="/" className="btn btn-secondary btn-sm ms-1">
                Sessão Anterior
              </Link>
              <button
                type="button"
                className="btn btn-danger btn-sm ms-1"
                onClick={handleDeleteLote}
              >
                Excluir
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm ms-1"
                onClick={handlePreviousLote}
              >
                Anterior
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm ms-1"
                onClick={handleNextLote}
              >
                {currentIndex === lotes.length ? "Salvar" : "Próximo"}
              </button>
              <Link
                to="/cadastro-lotes"
                className="btn btn-secondary btn-sm ms-1"
              >
                Próxima Sessão
              </Link>
            </div>
          </form>
          <div className="mt-3">
            <h3>Lotes Cadastrados</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Período</th>
                  <th scope="col">Análise</th>
                  <th scope="col">Nº Lote</th>
                  <th scope="col">Média</th>
                  <th scope="col">DP</th>
                </tr>
              </thead>
              <tbody>
                {lotes.map((lote, index) => (
                  <tr key={index}>
                    <td>February 2023</td>
                    <td>{lote.analise}</td>
                    <td>{lote.numeroLote}</td>
                    <td>{lote.media}</td>
                    <td>{lote.desvioPadrao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessaoCadastroLotes;
