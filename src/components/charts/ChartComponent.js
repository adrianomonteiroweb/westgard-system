import PropTypes from "prop-types";
import { Chart } from "react-google-charts";

function ChartComponent({ chart: [data, options]}) {
  return (
    <Chart
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