import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { WorkoutFrequencyChart } from "./barchart";
import { WeightChart } from "./lineChart";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export function Stats() {

    const navigate = useNavigate()

    function handleGoBack(){
        navigate(-1)
    }


    return (
        <>  
            <div className="flex items-center gap-2">
                <button onClick={handleGoBack}>
                    <IoIosArrowBack />
                </button>
                <h1 className="text-2xl font-bold mb-1">Gráficos</h1>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 grid grid-cols-4 gap-4 mb-4">
                    <div className="col-span-3">
                        <WeightChart />
                    </div>
                    <div className="col-span-1 grid gap-3">
                        <Card>
                            <CardHeader>
                                <CardTitle>Peso atual</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>87 Kg</p>
                            </CardContent>
                            <CardFooter>
                                <p>Data da atualização:</p>
                                <p>12 de agosto de 2024</p>
                            </CardFooter>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Peso meta</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>80 Kg</p>
                            </CardContent>
                            <CardFooter>
                                <p className="mr-3">Data da definição:</p>
                                <p>09 de julho de 2024</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <WorkoutFrequencyChart />
            </div>
        </>
    );
}
