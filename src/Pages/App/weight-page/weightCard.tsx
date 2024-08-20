import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FaCalendarAlt, FaFlagCheckered } from "react-icons/fa";

export function WeightCard() {
    const currentWeight = 86;
    const targetWeight = 80;

    return (
        <Card className="shadow-lg rounded-lg">
            <CardHeader className="flex justify-between p-4 border-b ml-1">
                <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <CardTitle className="text-lg">
                        Peso atual: {currentWeight} Kg
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="w-4 h-4 mt-1" />
                    <p className="text-base">Data de registro:</p>
                </div>
                <p className="text-sm text-muted-foreground pl-6">12 de agosto de 2024</p>
            </CardContent>

            <CardFooter className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3 pb-2">
                    <FaFlagCheckered className="w-4 h-4" />
                    <p>Peso meta: {targetWeight} Kg</p>
                </div>
            </CardFooter>
        </Card>
    );
}
