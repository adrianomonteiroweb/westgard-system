import { useContext, useEffect } from "react";
import { IoArrowUndoSharp, IoStorefrontSharp } from "react-icons/io5";
import { Table } from "react-bootstrap";

import "./chartPage.css";
import LinkComponent from "../../components/links/LinkComponent";
import IsContext from "../../context/IsContext";
import ChartComponent from "../../components/charts/ChartComponent";

const data = [
  ["x", "Nível 1", "Nível 2"],
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

function ChartPage() {
  const { stage2, setStage2 } = useContext(IsContext);

  const cv1 = (stage2.nivel1.DP / stage2.nivel1.media) * 100;
  const cv2 = (stage2.nivel2.DP / stage2.nivel2.media) * 100;

  const err1 = cv1 * 1.65;
  const err2 = cv2 * 1.65;

  const errMed = (err1 + err2) / 2;

  useEffect(() => {
    const medias = JSON.parse(localStorage.getItem("stage3"));
    
    if (data.length === 1) medias
      .map(({id, nivel1, nivel2}) => {
        const n1 = Number(nivel1) / stage2.nivel1.media;
        const n2 = Number(nivel2) / stage2.nivel2.media;
        
        data
          .push([id, Number(n1.toFixed(2)), Number(n2.toFixed(2))]);
      });
  }, []);

  return (
    <>
      <ChartComponent chart={[data, options]} />
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
    </>
  );
}

export default ChartPage;