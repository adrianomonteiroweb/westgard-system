import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IsContext from "../../context/IsContext";
import { selectMonthName } from "../../utils/functions";

function SessaoCadastroLotes() {
  const { laacState, setLaacState, laacPeriod, setLaacPeriod } =
    useContext(IsContext);

  const [dadosLotes, setDadosLotes] = useState({
    analise: "",
    numeroLote: "",
    media: "",
    desvioPadrao: "",
  });

  useEffect(() => {
    const dadosLocais = laacState[laacPeriod]?.batch || dadosLotes;
    setDadosLotes(dadosLocais || dadosLotes);
  }, [laacPeriod, laacState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosLotes({
      ...dadosLotes,
      [name]: value,
    });
  };

  const handleNextLote = () => {
    const updatedState = laacState;

    updatedState[laacPeriod].batch = dadosLotes;

    localStorage.setItem("laac_state", JSON.stringify(updatedState));
    setLaacState(updatedState);

    setDadosLotes({
      analise: "",
      numeroLote: "",
      media: "",
      desvioPadrao: "",
    });

    if (laacPeriod < 12) {
      setLaacPeriod(laacPeriod + 1);
    }
  };

  const handlePreviousLote = () => {
    if (laacPeriod > 1) {
      setLaacPeriod(laacPeriod - 1);
    }
  };

  const handleDeleteLote = () => {
    const shouldDelete = window.confirm(
      "Tem certeza de que deseja excluir este lote?"
    );

    if (shouldDelete) {
      const dadosLotes = [];

      const updatedState = { ...laacState };
      updatedState[laacPeriod].batch = dadosLotes;

      localStorage.setItem("laac_state", JSON.stringify(updatedState));
      setLaacState(updatedState);

      if (laacPeriod > 1) {
        setLaacPeriod(laacPeriod - 1);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 offset-md-1">
          <div className="text-center mb-1">
            <img
              src="laac-logo.png"
              className="img-fluid"
              alt="LAAC"
              style={{ maxWidth: "150px" }}
            />
            <h2 className="mt-1">Controle de Qualidade</h2>
          </div>
          <h2 className="mb-1">
            Sessão: Cadastro de Lotes ({selectMonthName[laacPeriod]})
          </h2>
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
                value={dadosLotes.analise}
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
                value={dadosLotes.numeroLote}
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
                value={dadosLotes.media}
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
                value={dadosLotes.desvioPadrao}
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
                Próximo
              </button>
              <Link
                to="/registro-analises"
                className="btn btn-secondary btn-sm ms-1"
              >
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
