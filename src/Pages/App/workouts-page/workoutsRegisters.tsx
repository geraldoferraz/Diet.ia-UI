import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { WorkoutTableRow } from "./workoutTableRow";
import { getUserWorkouts } from "@/api/getWorkouts";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useContextWorkout } from "@/contexts/WorkoutContext";
import { useEffect } from "react";

export function WorkoutsRegisters(){
    const userId = localStorage.getItem('userId');
    const { isWorkoutCreated, setWorkoutCreated } = useContextWorkout();

    const { data: workouts, refetch, isLoading } = useQuery({
        queryKey: ['workouts', userId],
        queryFn: () => getUserWorkouts({ userId: userId || '' }),
        enabled: !!userId,
        refetchOnMount: true
    })

    useEffect(() => {
        if(isWorkoutCreated){
            refetch();
            setWorkoutCreated(false)
        }
    }, [isWorkoutCreated, refetch, setWorkoutCreated])

    return(
        <>
            <Helmet title="Pedidos"/>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]"></TableHead>
                                <TableHead>Exercício realizado</TableHead>
                                <TableHead className="w-[340px]">Identificador</TableHead>
                                <TableHead className="w-[200px]">Data da realização</TableHead>
                                <TableHead className="w-[180px]">Tipo de treino</TableHead>
                                <TableHead className="w-[180px]">Tempo de duração</TableHead>
                                <TableHead className="w-[100px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {isLoading ? (
                                Array.from({ length: 10 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton className="h-8 w-full" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                workouts?.map((workout) => (
                                    <WorkoutTableRow key={workout.id} workout={workout} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
        </>
    )
}