import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Product {
  id: number;
  name: string;
  stock: number;
}
interface ProductStockChartProps {
  products: Product[];
}

const ProductStockPieChart: React.FC<ProductStockChartProps > = ({ products }) => {
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Stock Quantity',
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
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Product Stock Levels' },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default ProductStockPieChart;
