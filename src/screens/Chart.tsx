import React, { useEffect } from 'react';
import ChartJS, { ChartConfiguration } from 'chart.js/auto';
import { Expense } from '../components/types';

interface ChartProps {
  expenses: Expense[];
}

const ExpenseChart: React.FC<ChartProps> = ({ expenses }) => {
  useEffect(() => {
    const categories: string[] = [];
    const amounts: number[] = [];

    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = expense.amount;

      const categoryIndex = categories.findIndex((c) => c === category);

      if (categoryIndex === -1) {
        categories.push(category);
        amounts.push(amount);
      } else {
        amounts[categoryIndex] += amount;
      }
    });

    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: categories,
        datasets: [{
          label: 'Total Amount per Category',
          data: amounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
          ],
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const ctx = document.getElementById('expense-chart') as HTMLCanvasElement;
    const chart = new ChartJS(ctx, chartConfig);

    return () => {
      chart.destroy();
    };
  }, [expenses]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Expense Chart</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <canvas id="expense-chart" />
      </div>
    </div>
  );
};

export default ExpenseChart;
