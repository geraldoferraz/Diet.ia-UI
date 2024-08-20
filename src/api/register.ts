import { api } from "@/lib/axios";

interface userRegisterRequest {
    name: string,
    email: string,
    password: string,
    age: number
}

interface userRegisterResponse {
    id: string;
}

export async function createUserData({ name, email, age, password }: userRegisterRequest): Promise<userRegisterResponse> {
    const response = await api.post('/users', {
        name,
        email,
        password,
        age
    })

    return response.data
}