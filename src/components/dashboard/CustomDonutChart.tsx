'use client';

import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

// Sample data for monthly completed orders across 12 months
const chartData = [
  { month: 'January', orders: 5, fill: '#ff6347' },
  { month: 'February', orders: 2, fill: '#ffa07a' },
  { month: 'March', orders: 2, fill: '#20b2aa' },
  { month: 'April', orders: 3, fill: '#3cb371' },
  { month: 'May', orders: 9, fill: '#4682b4' },
  { month: 'June', orders: 2, fill: '#b0c4de' },
  { month: 'July', orders: 1, fill: '#ff7f50' },
  { month: 'August', orders: 3, fill: '#ffdab9' },
  { month: 'September', orders: 4, fill: '#8fbc8f' },
  { month: 'October', orders: 6, fill: '#6495ed' },
  { month: 'November', orders: 7, fill: '#cd5c5c' },
  { month: 'December', orders: 3, fill: '#40e0d0' },
];

const chartConfig = {
  orders: {
    label: 'Orders',
  },
  January: {
    label: 'January',
    color: '#ff6347',
  },
  February: {
    label: 'February',
    color: '#ffa07a',
  },
  March: {
    label: 'March',
    color: '#20b2aa',
  },
  April: {
    label: 'April',
    color: '#3cb371',
  },
  May: {
    label: 'May',
    color: '#4682b4',
  },
  June: {
    label: 'June',
    color: '#b0c4de',
  },
  July: {
    label: 'July',
    color: '#ff7f50',
  },
  August: {
    label: 'August',
    color: '#ffdab9',
  },
  September: {
    label: 'September',
    color: '#8fbc8f',
  },
  October: {
    label: 'October',
    color: '#6495ed',
  },
  November: {
    label: 'November',
    color: '#cd5c5c',
  },
  December: {
    label: 'December',
    color: '#40e0d0',
  },
} satisfies ChartConfig;

export function AdminDonutChart({ totalOrders }: { totalOrders: any }) {
  return (
    <Card
      className="flex flex-col"
      style={{ boxShadow: 'none', border: '0px solid transparent' }}
    >
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="orders"
              nameKey="month"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Orders
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <CardDescription>All completed orders in a donut chart</CardDescription>
      </CardFooter>
    </Card>
  );
}
