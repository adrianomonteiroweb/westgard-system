import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import IsContext from "../../context/IsContext";

function SessaoCadastroLotes() {
  const { period } = useContext(IsContext);

  const [novoLote, setNovoLote] = useState({
    analise: "",
    numeroLote: "",
    media: "",
    desvioPadrao: "",
  });

  const [lotes, setLotes] = useState([]);
  const [indicePeriodo, setIndicePeriodo] = useState(1);

  useEffect(() => {
    const dadosLocais = period[indicePeriodo]?.lotesDados || [];
    setLotes([...lotes, dadosLocais]);
    setNovoLote(dadosLocais[0] || {});
  }, [indicePeriodo, period]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoLote({
      ...novoLote,
      [name]: value,
    });
  };

  const handleSaveLote = () => {
    if (
      !novoLote.analise ||
      !novoLote.numeroLote ||
      !novoLote.media ||
      !novoLote.desvioPadrao
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const novosLotes = [...lotes];
    novosLotes.push(novoLote);

    const updatedPeriod = { ...period };
    updatedPeriod[period.selectedPeriod].lotesDados = novoLote;

    localStorage.setItem("laac", JSON.stringify(updatedPeriod));

    setLotes(novoLote);
    setNovoLote({
      analise: "",
      numeroLote: "",
      media: "",
      desvioPadrao: "",
    });
    setIndicePeriodo(indicePeriodo + 1);
  };

  const selectMonthName = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  const handleDeleteLote = () => {
    const shouldDelete = window.confirm(
      "Tem certeza de que deseja excluir este lote?"
    );

    if (shouldDelete) {
      const novoLote = [];

      const updatedPeriod = { ...period };
      updatedPeriod[indicePeriodo].lotesDados = novoLote;

      localStorage.setItem("laac", JSON.stringify(updatedPeriod));

      if (indicePeriodo > 1) {
        setIndicePeriodo(indicePeriodo - 1);
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
                onClick={handleSaveLote}
              >
                Salvar
              </button>
              <Link
                to="/registro-analises"
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
                    <td>{selectMonthName[period.selectedPeriod]}</td>
                    <td>{lote.analise}</td>
                    <td>{lote.numeroLote}</td>
                    <td>{lote.media}</td>
                    <td>{lote.desvioPadrao}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditLote(index)}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm ms-1"
                        onClick={() => handleDeleteLote(index)}
                      >
                        Excluir
                      </button>
                    </td>
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
