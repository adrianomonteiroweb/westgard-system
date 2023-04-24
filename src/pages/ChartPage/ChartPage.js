import { Chart } from "react-google-charts";
import { IoArrowUndoSharp, IoStorefrontSharp } from "react-icons/io5";

import "./chartPage.css";
import { useEffect } from "react";
import LinkComponent from "../../components/links/LinkComponent";

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
  pointSize: 6
};

function ChartPage() {
  useEffect(() => {
    const medias = JSON.parse(localStorage.getItem("stage3"));
    
    if (data.length === 1) medias.map(({id, nivel1, nivel2}) => data.push([id, Number(nivel1), Number(nivel2)]));
  }, []);

  return (
    <>
      <Chart
        chartType="LineChart"
        width="100%"
        // height="400px"
        data={data}
        options={options}
      />
      <LinkComponent link={[IoArrowUndoSharp, "/batch-registration", "back-button-chart", "back-session", "Sessão Anterior"]} />
      <LinkComponent link={[IoStorefrontSharp, "/", "back-button-chart", "home-session", "Sessão Inicial"]} />
    </>
  );
}

export default ChartPage;