import { useContext, useEffect } from "react";
import { IoArrowUndoSharp, IoStorefrontSharp } from "react-icons/io5";

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
      <LinkComponent link={[IoArrowUndoSharp, "/batch-registration", "back-button-chart", "back-session", "Sessão Anterior"]} />
      <LinkComponent link={[IoStorefrontSharp, "/", "back-button-chart", "home-session", "Sessão Inicial"]} />
    </>
  );
}

export default ChartPage;