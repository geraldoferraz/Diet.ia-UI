import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
  

export function WeightCardTitle(){

    const navigate = useNavigate()

    function handleStatsNavigation(){
        navigate('/statistics')
    }

    return(
        <>
            <Card className="mb-3">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        Estatísticas dos alimentos
                        <Button className="flex justify-between items-center gap-3 text-base" onClick={handleStatsNavigation}>
                            Veja as estatísticas
                        </Button>
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    )
}