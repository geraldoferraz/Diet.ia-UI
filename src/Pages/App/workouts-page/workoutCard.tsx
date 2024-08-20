import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
// import { FaCirclePlus } from "react-icons/fa6";
import { CreateWorkoutDialog } from "./createWorkout";

export function WorkoutCardTitle() {
    return (
        <>
            <Card className="mb-3">
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        Histórico de treinos
                        <Dialog>
                            <CreateWorkoutDialog />
                        </Dialog>
                    </CardTitle>
                </CardHeader>
            </Card>
        </>
    );
}
