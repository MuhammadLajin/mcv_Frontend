export interface userResponse {
    address: string;
    birthDate: string;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    password: string;
    telephoneNumber: string;
    userName: string;
}
export interface createUserRequest {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    telephoneNumber: string;
    address: string;
    birthDate: string;
    email: string;
}
