import { Line } from "react-chartjs-2";

export function AdminLineChart({ data, options }) {
  return <Line id="barchart" options={options} data={data} />;
}
