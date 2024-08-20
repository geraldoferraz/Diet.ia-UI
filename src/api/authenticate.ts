import { api } from "@/lib/axios";

interface GetUserAuthenticateRequest {
    email: string;
    password: string;
}

interface userAuthenticateResponse {
    id: string;
}

export async function userAuthenticate({ email, password }: GetUserAuthenticateRequest): Promise<userAuthenticateResponse> {
    const response = await api.post('/sessions', {
        email,
        password
    });

    return response.data;
}
