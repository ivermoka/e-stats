import React from "react";
import { Chart as ChartJS, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend);

export const LineChart = ({ data, options }) => {
  return <Line id="linechart" data={data} options={options} />;
};
