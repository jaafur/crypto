import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ coinHistory, currentPrice, coinName }) => {
  const chartRef = useRef(null);
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const timestamp = coinHistory?.data?.history[i].timestamp * 1000;
    const date = new Date(timestamp).toLocaleDateString();
    coinTimestamp.push(date);
  }
 
  
  useEffect(() => {
   
  
    const labels = coinTimestamp;
    const data = coinPrice;

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Data',
          data: data,
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartConfig = {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            auto: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChart = new Chart(chartRef.current, chartConfig);

  
    return () => {
      myChart.destroy();
    };
  }, [coinHistory]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;


