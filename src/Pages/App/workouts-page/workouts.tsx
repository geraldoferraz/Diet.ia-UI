import { WorkoutCardTitle } from "./workoutCard";
import { WorkoutsRegisters } from "./workoutsRegisters";
import { WorkoutProvider } from "@/contexts/WorkoutContext";


export function Workouts(){
    return(
        <WorkoutProvider>
            <WorkoutCardTitle/>
            <WorkoutsRegisters />
        </WorkoutProvider>
    )
}