import { useContext, useEffect, useState } from "react";
import { IoArrowUndoSharp, IoStorefrontSharp } from "react-icons/io5";
import { Table } from "react-bootstrap";

import "./chartPage.css";
import LinkComponent from "../../components/links/LinkComponent";
import IsContext from "../../context/IsContext";
import ChartComponent from "../../components/charts/ChartComponent";
import SpinnerComponent from "../../components/spinners/SpinnerComponent";

const data = [
  ["x"],
];

const options = {
  hAxis: {
    title: "Dias",
    format: "short"
  },
  vAxis: {
    title: "Médias",
    format: "decimal",
    gridlines: { color: "#333", minSpacing: 0.20 },
  },
  pointSize: 6,
  legend: { position: "top" },
  isStacked: true,
};

const checkControls = (stage) => {
  let controls = [];

  Object.values(stage).map((nivel) => {
    if (Number(nivel.media) > 0) controls.push({
      ...nivel,
      cv: (Number(nivel.DP) / Number(nivel.media)) * 100
    });
  });

  return controls;
};

function ChartPage() {
  const { stage2, setStage2, stage3 } = useContext(IsContext);
  const [showLoading, setShowLoading] = useState(true);
  const [controls, setControls] = useState([]);
  const [errMed, setErrMed] = useState(0);

  const cv1 = (Number(stage2.nivel1.DP) / Number(stage2.nivel1.media)) * 100;
  const cv2 = (Number(stage2.nivel2.DP) / Number(stage2.nivel2.media)) * 100;

  const [err1, err2] = [
    cv1 ? cv1 * 1.65 : 0,
    cv2 ? cv2 * 1.65 : 0,
  ];
  
  useEffect(() => {
    const medias = JSON.parse(localStorage.getItem("stage3"));
    const checkDate = medias ? medias : stage3;

    let countControls = 0;

    if (
      err1 !== 0
      && err2 === 0
      && data[0].length < 2
    ) {
      data[0].push("Nível 1");

      countControls = 1;
    }

    if (
      err1 !== 0
      && err2 !== 0
      && data[0].length < 2
    ) {
      data[0].push("Nível 1", "Nível 2");

      countControls = 2;
    }

    setErrMed((err1 + err2) / countControls);
    
    if (data.length === 1) checkDate
      .map(({id, nivel1, nivel2, nivel3}) => {
        const n1 = Number(nivel1) / stage2.nivel1.media;
        const n2 = Number(nivel2) / stage2.nivel2.media;
        
        if (countControls === 1) data
          .push([id, Number(n1.toFixed(2))]);
        if (countControls === 2) data
          .push([id, Number(n1.toFixed(2)), Number(n2.toFixed(2))]);
      });

      
    setControls(checkControls(stage2));
    
    setTimeout(() => setShowLoading(false), 500);
  }, []);

  const renderLoadingFunc = () => showLoading && (<div className="loading-div"><SpinnerComponent /></div>);

  return (
    <>
      <div className="chart-div">
        <ChartComponent chart={[data, options]} />
      </div>
      <div className="table-div">
        <Table striped borded hover>
          <tbody>
            <tr>
              <th colSpan={2} className="col-table"><h6 className="title-table">Estatísticas do Mês</h6></th>
            </tr>
            <tr>
              <td className="col-table">
                <tr>
                  <td colSpan={2}><h6 className="title-table">Nível 1</h6></td>
                </tr>
                <tr>
                  <td>Média:</td>
                  <td>{stage2.nivel1.media}</td>
                </tr>
                <tr>
                  <td>DP:</td>
                  <td>{stage2.nivel1.DP}</td>
                </tr>
                <tr>
                  <td>CV:</td>
                  <td>{cv1.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Err. Aleatório:</td>
                  <td>{err1.toFixed(2)}</td>
                </tr>
                <tr className="media">
                  <td colSpan={2} className="title-table"><h6>Err. Aleatório Médio:</h6></td>
                </tr>
              </td>
              <td className="col-table">
                <tr>
                  <td colSpan={2}><h6 className="title-table">Nível 2</h6></td>
                </tr>
                <tr>
                  <td>Média:</td>
                  <td>{stage2.nivel2.media}</td>
                </tr>
                <tr>
                  <td>DP:</td>
                  <td>{stage2.nivel2.DP}</td>
                </tr>
                <tr>
                  <td>CV:</td>
                  <td>{cv2.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Err. Aleatório:</td>
                  <td>{err2.toFixed(2)}</td>
                </tr>
                <tr className="media">
                  <td colSpan={2} className="title-table"><h6>{errMed.toFixed(2)}%</h6></td>
                </tr>
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