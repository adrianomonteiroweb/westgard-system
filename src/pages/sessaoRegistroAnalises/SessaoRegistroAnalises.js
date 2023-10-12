import React, { useContext, useEffect, useState } from "react";
import IsContext from "../../context/IsContext";
import { Link } from "react-router-dom";
import {
  selectMonthName,
  sortByIdFromLargest,
  sortByIdFromSmallest,
} from "../../utils/functions";

function SessaoRegistroAnalises() {
  const { laacState, setLaacState, laacPeriod, setLaacPeriod } =
    useContext(IsContext);

  const [dadosAnalysis, setDadosAnalysis] = useState({
    id: 0,
    date: "",
    analysis1: 0,
    analysis2: 0,
    analysis3: 0,
  });

  useEffect(() => {
    const dadosLocais = laacState[laacPeriod]?.values || dadosAnalysis;
    setDadosAnalysis(dadosLocais, dadosAnalysis);
  }, [laacPeriod, laacState]);

  const isDateInCorrectMonth = (date) => {
    const selectedDate = new Date(date);
    const selectedMonth = selectedDate.getMonth() + 1;

    return selectedMonth === laacPeriod;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "date" && !isDateInCorrectMonth(value)) {
      alert(`A data deve estar no mês ${selectMonthName[laacPeriod]}`);
      return;
    }

    setDadosAnalysis({
      ...dadosAnalysis,
      [name]: name === "date" ? value : parseFloat(value),
    });
  };

  const handleNextAnalysis = () => {
    if (laacPeriod < 12) {
      setLaacPeriod(laacPeriod + 1);
    }
  };

  const handleSaveAnalysis = () => {
    if (!dadosAnalysis.date) {
      alert("Data é um dado obrigatório.");
      return;
    }

    const findIfAlreadyExists = laacState[laacPeriod].values.find(
      (a) => a.id === dadosAnalysis.id
    );

    let updatedState = laacState;
    if (findIfAlreadyExists) {
      const filterWithoutAnalytic = laacState[laacPeriod].values.filter(
        (a) => a.id !== dadosAnalysis.id
      );

      updatedState[laacPeriod].values = [
        ...filterWithoutAnalytic,
        dadosAnalysis,
      ];
    } else {
      const next_id = laacState[laacPeriod].values;
      if (next_id.length < 1) {
        dadosAnalysis.id = laacState[laacPeriod].values.length + 1;
      } else {
        dadosAnalysis.id =
          laacState[laacPeriod].values.sort(sortByIdFromLargest)[0].id + 1;
      }
      updatedState[laacPeriod].values.push(dadosAnalysis);
    }

    localStorage.setItem("laac_state", JSON.stringify(updatedState));
    setLaacState(updatedState);

    setDadosAnalysis({
      id: 0,
      date: "",
      analysis1: 0,
      analysis2: 0,
      analysis3: 0,
    });
  };

  const handlePreviousAnalysis = () => {
    if (laacPeriod > 1) {
      setLaacPeriod(laacPeriod - 1);
    }
  };

  const handleEditAnalysis = (id) => {
    const analyticToUpdate = laacState[laacPeriod].values.find(
      (a) => a.id === id
    );
    setDadosAnalysis(analyticToUpdate);
  };

  const handleDeleteAnalysis = (id) => {
    const filterWithoutAnalytic = laacState[laacPeriod].values.filter(
      (a) => a.id !== id
    );

    const updatedState = laacState;

    updatedState[laacPeriod].values = [...filterWithoutAnalytic];

    localStorage.setItem("laac_state", JSON.stringify(updatedState));
    setLaacState(updatedState);
    setDadosAnalysis({
      id: 0,
      date: "",
      analysis1: 0,
      analysis2: 0,
      analysis3: 0,
    });
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
            Sessão: Registro de Análises ({selectMonthName[laacPeriod]})
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
                        max={`${new Date().getFullYear()}-${String(
                          laacPeriod
                        ).padStart(2, "0")}-${new Date(
                          new Date().getFullYear(),
                          laacPeriod,
                          0
                        ).getDate()}`}
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
                        to="/10-primeiros-resultados"
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
                  {laacState[laacPeriod]?.values
                    .sort(sortByIdFromSmallest)
                    ?.map((isAnalysis, index) => (
                      <tr key={index}>
                        <td>{isAnalysis.id}</td>
                        <td>{isAnalysis.date}</td>
                        <td>{isAnalysis.analysis1}</td>
                        <td>{isAnalysis.analysis2}</td>
                        <td>{isAnalysis.analysis3}</td>
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
