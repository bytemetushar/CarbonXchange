import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface PortfolioChartProps {
  data: number[];
  labels: string[];
  height?: number;
}

export default function PortfolioChart({ data, labels, height = 256 }: PortfolioChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Portfolio Value",
            data,
            borderColor: "hsl(99, 37%, 25%)",
            backgroundColor: "hsl(99, 37%, 25%, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return "$" + (Number(value) / 1000) + "K";
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, labels]);

  return (
    <div style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
