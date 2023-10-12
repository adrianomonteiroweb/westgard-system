import React, { useContext, useEffect, useState } from "react";
import IsContext from "../../context/IsContext";
import { Link } from "react-router-dom";
import {
  mediascalculate,
  selectMonthName,
  standardDeviationCalculate,
} from "../../utils/functions";

function Sessao10PrimeirosDias() {
  const { laacState, laacPeriod, setLaacPeriod } = useContext(IsContext);

  const [first10DaysAnalysisMedia1, setFirst10DaysAnalysisMedia1] = useState(
    mediascalculate(laacState[laacPeriod].values).mediaAnalysis1 || 0
  );
  const [first10DaysAnalysisDP1, setFirst10DaysAnalysisDP1] = useState(
    standardDeviationCalculate(laacState[laacPeriod].values)
      .standardDeviationAnalysis1 || 0
  );

  const [first10DaysAnalysisMedia2, setFirst10DaysAnalysisMedia2] = useState(
    mediascalculate(laacState[laacPeriod].values).mediaAnalysis2 || 0
  );
  const [first10DaysAnalysisDP2, setFirst10DaysAnalysisDP2] = useState(
    standardDeviationCalculate(laacState[laacPeriod].values)
      .standardDeviationAnalysis2 || 0
  );

  const [first10DaysAnalysisMedia3, setFirst10DaysAnalysisMedia3] = useState(
    mediascalculate(laacState[laacPeriod].values).mediaAnalysis3 || 0
  );
  const [first10DaysAnalysisDP3, setFirst10DaysAnalysisDP3] = useState(
    standardDeviationCalculate(laacState[laacPeriod].values)
      .standardDeviationAnalysis3 || 0
  );

  const isDateInCorrectMonth = (date) => {
    const selectedDate = new Date(date);
    const selectedMonth = selectedDate.getMonth() + 1;

    return selectedMonth === laacPeriod;
  };

  const handleNextAnalysis = () => {
    if (laacPeriod < 12) {
      setLaacPeriod(laacPeriod + 1);
    }
  };

  const handlePreviousAnalysis = () => {
    if (laacPeriod > 1) {
      setLaacPeriod(laacPeriod - 1);
    }
  };

  const renderAnalysisCollun = (media, dp) => (
    <td>
      <tr>Média: {media}</tr>
      <tr>DP: {dp}</tr>
    </td>
  );

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
            Sessão: 10 primeiros dias ({selectMonthName[laacPeriod]})
          </h4>
          <form>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <th>Análise 1</th>
                  {first10DaysAnalysisMedia2 !== 0 &&
                    first10DaysAnalysisDP2 !== 0 && <th>Análise 2</th>}
                  {first10DaysAnalysisMedia3 !== 0 &&
                    first10DaysAnalysisDP3 !== 0 && <th>Análise 3</th>}
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <tr>Média: {first10DaysAnalysisMedia1}</tr>
                      <tr>DP: {first10DaysAnalysisDP1}</tr>
                    </td>
                    {first10DaysAnalysisMedia2 !== 0 &&
                      first10DaysAnalysisDP2 !== 0 &&
                      renderAnalysisCollun(
                        mediascalculate(laacState[laacPeriod].values)
                          .mediaAnalysis2,
                        standardDeviationCalculate(laacState[laacPeriod].values)
                          .standardDeviationAnalysis2
                      )}
                    {first10DaysAnalysisMedia3 !== 0 &&
                      first10DaysAnalysisDP3 !== 0 &&
                      renderAnalysisCollun(
                        mediascalculate(laacState[laacPeriod].values)
                          .mediaAnalysis3,
                        standardDeviationCalculate(laacState[laacPeriod].values)
                          .standardDeviationAnalysis3
                      )}
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          <div>
            <Link
              to="/registro-analises"
              className="btn btn-secondary btn-sm me-2"
            >
              Sessão Anterior
            </Link>
            <button
              type="button"
              className="btn btn-primary btn-sm mt-1"
              onClick={handlePreviousAnalysis}
            >
              Anterior
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm mt-1"
              onClick={handleNextAnalysis}
            >
              Próximo
            </button>
            <Link to="/grafico" className="btn btn-secondary btn-sm me-2">
              Próxima Sessão
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sessao10PrimeirosDias;
