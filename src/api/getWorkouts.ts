import { api } from "@/lib/axios";

interface Workout {
    id: string;
    userId: string;
    training: string;
    name: string;
    duration: number;
    description: string;
    created_at: string;
}

interface GetUserWorkoutsRequest {
    userId: string;
}

export async function getUserWorkouts({ userId }: GetUserWorkoutsRequest): Promise<Workout[]> {
    const response = await api.get(`/workouts/${userId}`);
    return response.data.workouts;
}
