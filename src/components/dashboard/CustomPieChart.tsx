import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

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
    { name: 'Admin', value: admin },
    { name: 'Vendor', value: vendor },
    { name: 'Customer', value: customer },
  ];

  return (
    <Card className="w-full  rounded-2xl  border-0 ">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-green-700">
          User Role Distribution
        </CardTitle>
        <CardDescription className="text-gray-500">
          Visual breakdown of user roles in the system
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center px-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={50}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              isAnimationActive={true}
              stroke="none"
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#f0fdf4', borderColor: '#10B981' }}
              labelStyle={{ color: '#065f46' }}
              formatter={(value: number) => [`${value} Users`, 'Count']}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex justify-center gap-6 text-sm text-gray-600 py-4">
        {chartData.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[idx] }}
            ></span>
            {item.name}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
