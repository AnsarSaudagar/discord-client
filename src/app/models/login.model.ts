export interface LoginResponse{
    token : string;
    expiresIn: number;
}

export interface LoginCredentials{
    email :string;
    password: string;
}