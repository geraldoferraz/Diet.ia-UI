import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";

const data = [
    { month: 'Janeiro', workouts: 10 },
    { month: 'Fevereiro', workouts: 15 },
    { month: 'Março', workouts: 8 },
    { month: 'Abril', workouts: 12 },
    { month: 'Maio', workouts: 18 },
    { month: 'Junho', workouts: 14 },
    { month: 'Julho', workouts: 20 },
    { month: 'Agosto', workouts: 16 },
    { month: 'Setembro', workouts: 22 },
    { month: 'Outubro', workouts: 19 },
    { month: 'Novembro', workouts: 23 },
    { month: 'Dezembro', workouts: 17 },
];

export function WorkoutFrequencyChart() {
    return (
        <Card className="col-span-4">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium ml-4">Frequência de Treinos</CardTitle>
                    <CardDescription className="ml-4">Acompanhe a quantidade de treinos realizados em cada mês</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={data} className="w-full h-full">
                        <XAxis dataKey="month" />
                        <YAxis tick={{ fontSize: 13 }}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="workouts" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
