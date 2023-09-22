import { Request } from "express"

interface USER {
    email: string,
    fullName: string,
    password: string,
    token?: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface UserRequest extends Request {
    user:USER //jwt user
}
