import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FC, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { COLORS_ORDER } from "../../../constants";
import { IHomePart } from "../../../pages/Home/HomeSection/HomeSection.types";
import type { ChartData, ChartOptions } from "chart.js";

interface DoughnutProps {
  options: ChartOptions<"doughnut">;
  data: ChartData<"doughnut">;
}

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  count: number;
  barData: IHomePart[];
}

const DoughnutChart: FC<Props> = ({ count, barData }) => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  let color: number = -1;

  const handleColor = () => {
    color++;
  };

  useEffect(() => {
    setChartData({
      labels: barData.map((e) => {
        return ` ${e.value} ${((e.count * 100) / count).toFixed(1)}%`;
      }),
      datasets: [
        {
          label: "Doughnut",
          data: barData.map((row) => {
            return row.count;
          }),
          backgroundColor: barData.map((row) => {
            handleColor();
            return COLORS_ORDER[color];
          }),
          borderWidth: 1.5,
          borderRadius: 8.3,
          cutout: "80%",
        },
      ],
    });
    setChartOptions({
      indexAxis: "y" as const,
      responsive: true,
      usePointStyle: true,
      plugins: {
        legend: {
          display: true,
          position: "right",
          padding: 5,
          labels: {
            boxWidth: 20,
            boxHeight: 20,
            padding: 10,
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    });
  }, []);

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default DoughnutChart;
