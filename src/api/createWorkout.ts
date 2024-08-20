import { api } from "@/lib/axios";

export interface createWorkoutRequest {
    userId: string;              
    training: string;   
    name: string;  
    duration: number;      
    description?: string;   
}

interface createWorkoutResponse {
    data: createWorkoutRequest
}

export async function createWorkoutData({ userId, training, name, duration, description }: createWorkoutRequest): Promise<createWorkoutResponse> {
    const response = await api.post('/workouts', {
        userId,
        training,
        name,
        duration,
        description
    });

    return response.data.workout;
}
