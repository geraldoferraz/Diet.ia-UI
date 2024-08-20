import { createContext, useContext, useState } from "react";

interface WorkoutContextType {
    isWorkoutCreated: boolean;
    setWorkoutCreated: (created: boolean) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
    const [isWorkoutCreated, setIsWorkoutCreated] = useState(false);

    const value = {
        isWorkoutCreated,
        setWorkoutCreated: setIsWorkoutCreated,
    };

    return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContextWorkout() {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
}
