import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Product {
  id: number; 
  name: string;
  stock: number;
}

interface ProductStockChartProps {
  products: Product[];
}

const ProductStockChart: React.FC<ProductStockChartProps> = ({ products }) => {
  const data: ChartData<'bar'> = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Stock Level',
        data: products.map((product) => product.stock),
        backgroundColor: products.map((product) =>
          product.stock === 0 ? 'rgba(255, 0, 0, 0.7)' : 
          product.stock < 50 ? 'rgba(255, 99, 132, 0.5)' : 
          'rgba(75, 192, 192, 0.5)' 
        ),
        borderColor: products.map((product) =>
          product.stock === 0 ? 'rgba(255, 0, 0, 1)' : 
          product.stock < 50 ? 'rgba(255, 99, 132, 1)' : 
          'rgba(75, 192, 192, 1)' 
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ProductStockChart;
