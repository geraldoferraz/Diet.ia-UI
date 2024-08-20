import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

const data = [
    { date: '10/12', weight: 92 },
    { date: '11/12', weight: 67 },
    { date: '12/12', weight: 68 },
    { date: '13/12', weight: 80 },
    { date: '14/12', weight: 85.5 },
    { date: '15/12', weight: 89 },
    { date: '19/12', weight: 80 },
];

export function WeightChart() {
    return (
        <Card className="col-span-4 p-4">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium ml-4">Histórico de Peso</CardTitle>
                    <CardDescription className="ml-4">Acompanhe as mudanças no seu peso ao longo do tempo</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={data} style={{ fontSize: 12 }}>
                        <XAxis dataKey="date" tickLine={false} axisLine={false} dy={18} />
                        <YAxis stroke="#888" axisLine={false} tickLine={false} width={40} />
                        <CartesianGrid vertical={false} className="stroke-muted" />
                        <Line type="linear" strokeWidth={2} dataKey="weight" stroke="#7C3AED" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
