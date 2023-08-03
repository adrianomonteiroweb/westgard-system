import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

function ChartComponent({ chart: [data, options]}) {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    setChartKey(prevKey => prevKey + 1);
  }, [data]);

  return (
    <Chart
      key={chartKey}
      chartType="LineChart"
      width="100%"
      data={data}
      options={options}
    />
  );
}


ChartComponent.propTypes = {
  chart: PropTypes.array.isRequired,
};

export default ChartComponent;