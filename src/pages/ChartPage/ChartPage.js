import { Chart } from "react-google-charts";
import { Link } from "react-router-dom";

import "./chartPage.css";
import { useEffect } from "react";

const data = [
  ["x", "Nível 1", "Nível 2"],
];

const options = {
  hAxis: {
    title: "Dias"
  },
  vAxis: {
    title: "Médias",
    format: "decimal",
    gridlines: { color: "#333", minSpacing: 0.20 },
  },
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
        height="400px"
        data={data}
        options={options}
      />
      <Link to="/batch-registration" id="back-button-chart">Voltar</Link>
    </>
  );
}

export default ChartPage;