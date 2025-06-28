import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function AdminPieChart({
  admin,
  vendor,
  customer,
}: {
  admin: number;
  vendor: number;
  customer: number;
}) {
  const chartData = [
    { role: 'admin', users: admin, fill: '#ebc80c' },
    { role: 'vendor', users: vendor, fill: '#2da5f3' },
    { role: 'customer', users: customer, fill: '#fa8232' },
  ];

  const chartConfig: ChartConfig = {
    users: {
      label: 'Users',
    },
    admin: {
      label: 'Admin',
      color: '#ebc80c',
    },
    vendor: {
      label: 'Vendor',
      color: '#2da5f3',
    },
    customer: {
      label: 'Customer',
      color: '#fa8232',
    },
  };

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
            <ChartTooltip
              content={<ChartTooltipContent nameKey="role" hideLabel />}
            />
            <Pie data={chartData} dataKey="users">
              <LabelList
                dataKey="role"
                position="inside"
                stroke="none"
                fill="black" // Adjust the color as needed
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label || value
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <CardDescription>
          All-time users pie chart based on role
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
