import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, ticker }) {
  const options = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        position: "right",
        ticks: {
          callback: function (value, index, values) {
            return value + " $";
          },
        },
      },
    },
    plugins: {
      legend: {
        //The legend is the box that contains the labels for each dataset.
        display: false,
      },
      title: {
        display: true,
        text: ticker.toUpperCase(),
      },
      tooltip: {
        //the tooltip is the box that appears when you hover over a point on the chart.
        enabled: false,
      },
    },
  };
  return <Line options={options} data={chartData} />;
}

export default LineChart;
