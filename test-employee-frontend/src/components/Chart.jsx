import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Результаты тестирования',
    },
  },
};

const labels = ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'];



const Chart = ({chartData}) => {
    let data = {
        labels,
        datasets: [
          {
            label: 'Количество сотрудников',
            data: chartData,
            backgroundColor: 'rgba(177, 38, 80, .9)',
          }
        ],
      };
    
    return <>
        <Bar options={options} data={data} />
    </>
}

export default Chart;

