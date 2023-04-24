import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";
import { IoArrowUndoSharp, IoStorefrontSharp } from "react-icons/io5";

import "./chartPage.css";
import { useEffect } from "react";

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
      <Link to="/batch-registration" id="back-button-chart">{<IoArrowUndoSharp className="back-session" />}Sessão Anterior</Link>
      <Link to="/" id="back-button-chart">{<IoStorefrontSharp className="home-session" />}Sessão Inicial</Link>
    </>
  );
}

export default ChartPage;