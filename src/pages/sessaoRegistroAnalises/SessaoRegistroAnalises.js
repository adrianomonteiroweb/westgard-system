import React, { useContext, useEffect, useState } from "react";
import IsContext from "../../context/IsContext";
import { Link } from "react-router-dom";
import {
  selectMonthName,
  sortByIdFromLargest,
  sortByIdFromSmallest,
} from "../../utils/functions";

function SessaoRegistroAnalises() {
  const { period } = useContext(IsContext);

  const [dadosAnalysis, setDadosAnalysis] = useState({
    id: 0,
    date: "",
    analysis1: 0,
    analysis2: 0,
    analysis3: 0,
  });

  const [indicePeriodo, setIndicePeriodo] = useState(1);

  useEffect(() => {
    const dadosLocais = period[indicePeriodo]?.analisesDados || dadosAnalysis;
    setDadosAnalysis(dadosLocais, dadosAnalysis);
  }, [indicePeriodo, period]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDadosAnalysis({
      ...dadosAnalysis,
      [name]: name === "date" ? value : parseFloat(value),
    });
  };

  const handleNextAnalysis = () => {
    if (indicePeriodo < 12) {
      setIndicePeriodo(indicePeriodo + 1);
    }
  };

  const handleSaveAnalysis = () => {
    if (!dadosAnalysis.date || !dadosAnalysis.analysis1) {
      alert("Data e Análise 1 são dados obrigatórios.");
      return;
    }

    const findIfAlreadyExists = period[indicePeriodo].analisesDados.find(
      (a) => a.id === dadosAnalysis.id
    );

    let updatedPeriod = period;
    if (findIfAlreadyExists) {
      const filterWithoutAnalytic = period[indicePeriodo].analisesDados.filter(
        (a) => a.id !== dadosAnalysis.id
      );

      updatedPeriod[indicePeriodo].analisesDados = [
        ...filterWithoutAnalytic,
        dadosAnalysis,
      ];
    } else {
      dadosAnalysis.id =
        period[indicePeriodo].analisesDados.sort(sortByIdFromLargest)[0].id + 1;
      updatedPeriod[indicePeriodo].analisesDados.push(dadosAnalysis);
    }

    localStorage.setItem("laac", JSON.stringify(updatedPeriod));

    setDadosAnalysis({
      id: 0,
      date: "",
      analysis1: 0,
      analysis2: 0,
      analysis3: 0,
    });
  };

  const handlePreviousAnalysis = () => {
    if (indicePeriodo > 1) {
      setIndicePeriodo(indicePeriodo - 1);
    }
  };

  const handleEditAnalysis = (id) => {
    const analyticToUpdate = period[indicePeriodo].analisesDados.find(
      (a) => a.id === id
    );
    setDadosAnalysis(analyticToUpdate);
  };

  const handleDeleteAnalysis = (id) => {
    const filterWithoutAnalytic = period[indicePeriodo].analisesDados.filter(
      (a) => a.id !== id
    );

    const updatedPeriod = period;

    updatedPeriod[indicePeriodo].analisesDados = [...filterWithoutAnalytic];

    localStorage.setItem("laac", JSON.stringify(updatedPeriod));
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="text-center mb-2">
            <img
              src="laac-logo.png"
              className="img-fluid"
              alt="LAAC"
              style={{ maxWidth: "150px" }}
            />
            <h3 className="mt-1">Controle de Qualidade</h3>
          </div>
          <h4 className="mb-1">
            Sessão: Registro de Análises ({selectMonthName[indicePeriodo]})
          </h4>
          <form>
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Data:</td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={dadosAnalysis.date}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                    <td>Análise 1:</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        id="analysis1"
                        name="analysis1"
                        value={dadosAnalysis.analysis1}
                        onChange={handleInputChange}
                        required
                      />
                    </td>
                    <td>Análise 2:</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        id="analysis2"
                        name="analysis2"
                        value={dadosAnalysis.analysis2}
                        onChange={handleInputChange}
                      />
                    </td>
                    <td>Análise 3:</td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        id="analysis3"
                        name="analysis3"
                        value={dadosAnalysis.analysis3}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link
                        to="/cadastro-lotes"
                        className="btn btn-secondary btn-sm me-2"
                      >
                        Sessão Anterior
                      </Link>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-1"
                        onClick={handlePreviousAnalysis}
                      >
                        Anterior
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-1"
                        onClick={handleSaveAnalysis}
                      >
                        Adicionar
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm mt-1"
                        onClick={handleNextAnalysis}
                      >
                        Próximo
                      </button>
                    </td>
                    <td>
                      <Link
                        to="/resultados-analises"
                        className="btn btn-secondary btn-sm me-2"
                      >
                        Próxima Sessão
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          <div className="mt-2">
            <h4>Análises Cadastradas</h4>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nº</th>
                    <th scope="col">Data</th>
                    <th scope="col">Análises</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {period[indicePeriodo]?.analisesDados
                    .sort(sortByIdFromSmallest)
                    ?.map((isAnalysis, index) => (
                      <tr key={index}>
                        <td>{isAnalysis.id}</td>
                        <td>{isAnalysis.date}</td>
                        {isAnalysis.analysis1 > 0 && (
                          <td>{isAnalysis.analysis1}</td>
                        )}
                        {isAnalysis.analysis2 > 0 && (
                          <td>{isAnalysis.analysis2}</td>
                        )}
                        {isAnalysis.analysis3 > 0 && (
                          <td>{isAnalysis.analysis3}</td>
                        )}
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => handleEditAnalysis(isAnalysis.id)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteAnalysis(isAnalysis.id)}
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
    </div>
  );
}

export default SessaoRegistroAnalises;
