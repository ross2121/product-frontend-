"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";  // Import Chart.js Line component
import {Chart,registerables } from 'chart.js';  // Import Chart.js and registerables
import axios from "axios";
import UserTable  from "./productdetails";


// Register the required components
Chart.register(...registerables);  
interface Product{
    stock:number,
    name:string
} 

export default function StockChart() {
  const [stockData, setStockData] = useState<number[]>([]); // Array to store stock levels
  const [productNames, setProductNames] = useState<string[]>([]); // Array to store product names
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/product/product");
        const products = response.data;

        // Extract stock levels and product names for the chart
        const stockLevels = products.map((product:Product) => product.stock);
        const names = products.map((product:Product) => product.name);

        setStockData(stockLevels);
        setProductNames(names);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const data = {
    labels: productNames, // Product names as labels
    datasets: [
      {
        label: "Stock Levels", // Label for the dataset
        data: stockData, // Stock levels data
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Light background color for the chart area
        borderColor: "rgba(75, 192, 192, 1)", // Border color for the line
        borderWidth: 1, // Thickness of the line
        fill: true, // Fill under the line
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at 0
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-medium my-6">Stock Level Insights</h2>
      {loading ? (
        <p>Loading stock data...</p>
      ) : (
        <div className="w-4/5">
          <Line data={data} options={options} /> {/* Render the line chart */}
        </div>
      )}
      <UserTable /> {/* Render the existing UserTable component */}
    </div>
  );
}
