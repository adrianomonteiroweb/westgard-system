import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SessaoRegistroAnalises() {
  const [newAnalysis, setNewAnalysis] = useState({
    date: "",
    analysis1: 0,
    analysis2: 0,
    analysis3: 0,
  });

  const [analisesDados, setAnalisesDados] = useState({});
  const [_periods, setPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    // Obter períodos disponíveis
    const availablePeriods = Object.keys(analisesDados);
    setPeriods(availablePeriods);

    // Definir o período atual como o primeiro período disponível
    if (availablePeriods.length > 0) {
      setCurrentPeriod(availablePeriods[0]);
    }
  }, [analisesDados]);

  useEffect(() => {
    // Atualizar análise atual quando o período ou o índice atual mudar
    if (currentPeriod && analisesDados[currentPeriod]) {
      setNewAnalysis(
        analisesDados[currentPeriod][currentIndex] || {
          date: "",
          analysis1: 0,
          analysis2: 0,
          analysis3: 0,
        }
      );
    }
  }, [currentPeriod, currentIndex, analisesDados]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewAnalysis({
      ...newAnalysis,
      [name]: name === "date" ? value : parseFloat(value),
    });
  };

  const handleNextAnalysis = () => {
    if (!newAnalysis.date || isNaN(newAnalysis.analysis1)) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Salvar análises existentes no período atual
    const currentPeriodData = analisesDados[currentPeriod] || [];
    const updatedPeriodData = [...currentPeriodData];

    if (editIndex === -1) {
      updatedPeriodData[currentIndex] = newAnalysis;
    } else {
      updatedPeriodData[editIndex] = newAnalysis;
    }

    setAnalisesDados({
      ...analisesDados,
      [currentPeriod]: updatedPeriodData,
    });

    setNewAnalysis({
      date: "",
      analysis1: 0,
      analysis2: 0,
      analysis3: 0,
    });

    setCurrentIndex(currentIndex + 1);
    setEditIndex(-1);
  };

  const handlePreviousAnalysis = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleEditAnalysis = (index) => {
    const analysisToEdit = analisesDados[currentPeriod][index];
    setNewAnalysis({ ...analysisToEdit });
    setEditIndex(index);
  };

  const handleDeleteAnalysis = (index) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esta análise?"
    );
    if (confirmDelete) {
      const currentPeriodData = analisesDados[currentPeriod] || [];
      const updatedPeriodData = [...currentPeriodData];
      updatedPeriodData.splice(index, 1);

      setAnalisesDados({
        ...analisesDados,
        [currentPeriod]: updatedPeriodData,
      });
    }
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
            <h2 className="mt-1">Controle de Qualidade</h2>
          </div>
          <h2 className="mb-1">Sessão: Registro de Análises</h2>
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
                        value={newAnalysis.date}
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
                        value={newAnalysis.analysis1}
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
                        value={newAnalysis.analysis2}
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
                        value={newAnalysis.analysis3}
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
                        onClick={handleNextAnalysis}
                      >
                        {currentIndex ===
                        (analisesDados[currentPeriod]?.length || 0)
                          ? "Salvar"
                          : "Próximo"}
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
            <h3>Análises Cadastradas ({currentPeriod})</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Análise 1</th>
                    <th scope="col">Análise 2</th>
                    <th scope="col">Análise 3</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {analisesDados[currentPeriod]?.map((isAnalysis, index) => (
                    <tr key={index}>
                      <td>{isAnalysis.date}</td>
                      <td>{isAnalysis.analysis1}</td>
                      <td>{isAnalysis.analysis2}</td>
                      <td>{isAnalysis.analysis3}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleEditAnalysis(index)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteAnalysis(index)}
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
