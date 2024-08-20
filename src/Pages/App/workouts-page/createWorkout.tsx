import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PiPlusCircleBold } from "react-icons/pi";
import { createWorkoutData } from "@/api/createWorkout";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FaCirclePlus } from "react-icons/fa6";
import { useContextWorkout } from "@/contexts/WorkoutContext";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createFormData = z.object({
    userId: z.string(),  
    training: z.string(),
    name: z.string(),
    duration: z.string(),
    description: z.string().optional()
}); 

type CreateFormData = z.infer<typeof createFormData>;

export function CreateWorkoutDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const { setWorkoutCreated } = useContextWorkout();
    
    const { register, handleSubmit, control, reset, formState: { isSubmitting } } = useForm<CreateFormData>();

    const { mutateAsync: createWorkout } = useMutation({
        mutationFn: createWorkoutData
    });

    async function handleCreateWorkout(data: CreateFormData) {
        try {
            const userIdFromStorage = localStorage.getItem('userId');

            if (!userIdFromStorage) {
                throw new Error("User ID não encontrado");
            }

            await createWorkout({
                userId: userIdFromStorage,
                training: data.training,
                name: data.name,
                duration: parseInt(data.duration, 10),
                description: data.description || undefined,
            });

            toast.success('Treino criado com sucesso!');
            setWorkoutCreated(true)
            reset()
            setIsOpen(false);
        } catch (error) {
            toast.error('Criação do treino inválida.');
            console.error('Error creating workout:', error);
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <FaCirclePlus className="w-6 h-6"/>
            </button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription className="text-lg text-white ml-4 mb-4">Crie um novo registro de treino</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(handleCreateWorkout)}>
                        <div className="space-y-6">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Exercício realizado</TableCell>
                                        <TableCell className="flex justify-end">
                                            <input 
                                                {...register("name")} 
                                                type="text" 
                                                className="w-[240px] p-3 bg-transparent border rounded-md focus:outline-none focus:ring-0" 
                                                placeholder="Nome do exercício" 
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Tempo de duração</TableCell>
                                        <TableCell className="flex justify-end">
                                            <input 
                                                {...register("duration")} 
                                                type="number" 
                                                className="w-[240px] p-3 rounded-md bg-transparent border focus:outline-none focus:ring-0" 
                                                placeholder="Duração em minutos" 
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Tipo de treino</TableCell>
                                        <TableCell className="flex justify-end">
                                            <div className="flex items-center gap-2">
                                                <Controller
                                                    name="training"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => (
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="w-[240px] p-5">
                                                                <SelectValue placeholder="Tipo de treino" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Cardio">Cardio</SelectItem>
                                                                <SelectItem value="Strength">Musculação</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-muted-foreground">Descrição</TableCell>
                                        <TableCell className="flex justify-end">
                                            <input 
                                                {...register("description")} 
                                                type="text" 
                                                className="w-[240px] p-3 bg-transparent border rounded-md focus:outline-none focus:ring-0" 
                                                placeholder="Detalhe seu treino" 
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableCell className="items-center">
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="flex justify-between gap-2 items-center mt-4"
                                        >
                                            Adicionar treino <PiPlusCircleBold className="w-4 h-4"/>
                                        </Button>
                                    </TableCell>

                                </TableBody>
                            </Table>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
