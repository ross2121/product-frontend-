"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Tooltip, Legend);

interface Data {
  id: number;
  previousQuantity: number;
  newQuantity: number;
  updatedAt: string;
  productId: number;
}

const QuantityChart: React.FC<{ ProductId: number }> = ({ ProductId }) => {
  const [products, setProducts] = useState<Data[]>([]);
  const lowStockThreshold = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://product-2-g2b7.onrender.com/api/product/products/${ProductId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [ProductId]);

  const chartData = {
    labels: products.map((product) => product.updatedAt),
    datasets: [
      {
        label: 'Quantity over Time',
        data: products.map((product) => product.newQuantity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        pointBackgroundColor: products.map((product) =>
          product.newQuantity < lowStockThreshold ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'day' as const,
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantity',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<'line'>) => {
            const quantity = tooltipItem.raw as number;
            return quantity < lowStockThreshold
              ? `Low Stock: ${quantity}`
              : `Quantity: ${quantity}`;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default QuantityChart;
