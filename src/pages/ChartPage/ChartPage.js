import { useContext, useEffect, useState } from "react";
import { IoArrowUndoSharp, IoStorefrontSharp } from "react-icons/io5";
import { Table } from "react-bootstrap";

import "./chartPage.css";

import IsContext from "../../context/IsContext";

import LinkComponent from "../../components/links/LinkComponent";
import ChartComponent from "../../components/charts/ChartComponent";
import SpinnerComponent from "../../components/spinners/SpinnerComponent";

import { DPCalculate, checksShuntedRule, mediaCalculate, stage2ResultsFunction, stdevFunc } from "../../utils/functions";

const data = [
  ["x"],
];

const options = {
  hAxis: {
    title: "Dias",
    gridlines: {
      color: "transparent"
    }
  },
  vAxis: {
    title: "Médias",
  },
  pointSize: 5,
  legend: { position: "top" },
  chartArea: { width: "80%", height: "70%" },
  curveType: "function",
  lineWidth: 2,
  series: {
    0: { color: "#ff0000" }, // Vermelho para a primeira linha
    1: { color: "#ffff00" }, // Amarelo para a segunda linha
    2: { color: "green" }, // Verde para a terceira linha
    3: { color: "green" }, // Verde para a quarta linha
    4: { color: "green" }, // Verde para a quinta linha
    5: { color: "#ffff00" }, // Amarelo para a sexta linha
    6: { color: "#ff0000" }, // Vermelho para a sétima linha
  },
  hAxis: {
    gridlines: {
      color: "#ddd",
      count: 7
    }
  }
};

function ChartPage() {
  const { stage2, setStage2, stage3 } = useContext(IsContext);
  const [showLoading, setShowLoading] = useState(true);
  const [results, setResults] = useState(false);
  const [cvs, setCvs] = useState({});
  const [errors, setErrors] = useState({});
  const [errMed, setErrMed] = useState(JSON.parse(localStorage.getItem("errAelMed")) || 0);

  useEffect(() => {
    const medias = JSON.parse(localStorage.getItem("stage3"));
    console.log("chartPage | line 43 | ", medias, stage3);
    const media1 = mediaCalculate(stage3, "nivel1");
    const media2 = mediaCalculate(stage3, "nivel2");
    const media3 = mediaCalculate(stage3, "nivel3");
    
    const dp1 = DPCalculate(stage3, "nivel1");
    const dp2 = DPCalculate(stage3, "nivel2");
    const dp3 = DPCalculate(stage3, "nivel3");

    setCvs(
      {
        cv1: (dp1 / media1) * 100,
        cv2: (dp2 / media2) * 100,
        cv3: (dp3 / media3) * 100
      }
    );

    setErrors({
      err1: cvs.cv1 ? cvs.cv1 * 1.65 : 0,
      err2: cvs.cv2 ? cvs.cv2 * 1.65 : 0,
      err3: cvs.cv3 ? cvs.cv3 * 1.65 : 0
    });

    setStage2({
      nivel1: { ...stage2.nivel1, media: media1.toFixed(2), DP: dp1.toFixed(2) },
      nivel2: { ...stage2.nivel2, media: media2.toFixed(2), DP: dp2.toFixed(2) },
      nivel3: { ...stage2.nivel3, media: media3.toFixed(2), DP: dp3.toFixed(2) }
    });
  }, []);

  useEffect(() => {
    if (
      errors.err1 > 0
      && errors.err2 === 0
      && errors.err3 === 0
      && data[0].length < 2
    ) {
      data[0].push("Nível 1");

      setErrMed(errors.err1);
    }

    if (
      errors.err1 > 0
      && errors.err2 > 0
      && errors.err3 === 0
      && data[0].length < 2
    ) {
      data[0].push("Nível 1", "Nível 2");

      setErrMed((errors.err1 + errors.err2) / 2);
    }

    if (
      errors.err1 > 0
      && errors.err2 > 0
      && errors.err3 > 0
      && data[0].length < 2
    ) {
      data[0].push("Nível 1", "Nível 2", "Nível 3");

      setErrMed((errors.err1 + errors.err2 + errors.err3) / 3);
    }

    if (data.length === 1) stage3
      .map(({id, nivel1, nivel2, nivel3}) => {
        const n1 = Number(nivel1) / stage2.nivel1.media;
        const n2 = Number(nivel2) / stage2.nivel2.media;
        const n3 = Number(nivel3) / stage2.nivel3.media;
        
        if (data[0].length === 2) data
          .push([id, Number(n1.toFixed(2))]);
        if (data[0].length === 3) data
          .push([id, Number(n1.toFixed(2)), Number(n2.toFixed(2))]);
        if (data[0].length === 4) data
          .push([id, Number(n1.toFixed(2)), Number(n2.toFixed(2)), Number(n3.toFixed(2))]);
      });
    
    setResults(stage2ResultsFunction(stage2));

    setTimeout(() => setShowLoading(false), 500);

    console.log("chartPage | line 134 | ", checksShuntedRule(stage2ResultsFunction(stage2), 1.51));
  }, [stage2]);

  useEffect(() => localStorage.setItem("errAelMed", JSON.stringify(errMed)), [errMed]);

  const renderLoadingFunc = () => showLoading && (<div className="loading-div"><SpinnerComponent /></div>);

  
  if (results) return (
    <>
      <div className="chart-div">
        <Table className="results">
          <tbody>
            <tr>
              <td>
                <tr className="line-result red">
                  {`+3s | ${results.nivel1.s3bigger.toFixed(2)}`}
                </tr>
                <tr className="line-result yellow">
                  {`+2s | ${results.nivel1.s2bigger.toFixed(2)}`}
                </tr>
                <tr className="line-result blue">
                  {`+1s | ${results.nivel1.s1bigger.toFixed(2)}`}
                </tr>
                <tr className="line-result green">Xm</tr>
                <tr className="line-result blue">
                  {`-1s | ${results.nivel1.s1less.toFixed(2)}`}
                </tr>
                <tr className="line-result yellow">
                  {`-2s | ${results.nivel1.s2less.toFixed(2)}`}
                </tr>
                <tr className="line-result red">
                  {`-3s | ${results.nivel1.s3less.toFixed(2)}`}
                </tr>
              </td>
            </tr>
          </tbody>
        </Table>
        <ChartComponent chart={[data, options]} />
      </div>
      <div className="table-div">
        <Table striped borded hover>
          <tbody>
            <tr>
              <th colSpan={data[0].length - 1} className="col-table"><h6 className="title-table">Estatísticas do Mês</h6></th>
            </tr>
            <tr className="niveis-statics">
              {
                data[0].map((nivel, index) => index > 0 && (
                  <td key={index}  className="col-table">
                    <tr>
                      <td colSpan={2}><h6 className="title-table">{`${nivel}`}</h6></td>
                    </tr>
                    <tr>
                      <td>Média:</td>
                      <td>{stage2[`nivel${index}`].media}</td>
                    </tr>
                    <tr>
                      <td>DP:</td>
                      <td>{stage2[`nivel${index}`].DP}</td>
                    </tr>
                    <tr>
                      <td>CV:</td>
                      <td>{cvs[`cv${1}`].toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Err.:</td>
                      <td>{errors[`err${index}`].toFixed(2)}%</td>
                    </tr>
                  </td>
                ))
              }
            </tr>
            <tr className="media">
              <td colSpan={data[0].length - 1} className="title-table">
                <h6>Err. Aleatório Médio: {errMed.toFixed(2)}%</h6>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="links-div">
        <LinkComponent link={[IoArrowUndoSharp, "/batch-registration", "back-button-chart", "back-session", "Sessão Anterior"]} />
        <LinkComponent link={[IoStorefrontSharp, "/", "back-button-chart", "home-session", "Sessão Inicial"]} />
      </div>
      {renderLoadingFunc()}
    </>
  );
}

export default ChartPage;