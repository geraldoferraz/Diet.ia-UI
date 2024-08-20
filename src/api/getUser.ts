import { api } from "@/lib/axios";

interface getUserRequest {
    userId: string;
}

export interface getUserResponse {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    created_at: string;
}

export async function getUserData({ userId }: getUserRequest): Promise<getUserResponse> {
    const response = await api.get(`/users/id/${userId}`);
    return response.data.user;
}
