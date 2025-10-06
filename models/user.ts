import { email, minLength, object, pipe, string, type InferOutput } from "valibot";
import bcrypt from "bcrypt";
const emailSchema = pipe(string(), email());
const passwordSchema = pipe(string(), minLength(6));

export const authSchema = object({
    email: emailSchema,
    password: passwordSchema
});

export enum Role {
    ADMIN = "admin",
    USER = "user"
}

export type User = InferOutput<typeof authSchema> & {
    id: number;
    role: Role;
    refreshToken?: string
};


const users: Map<string, User> = new Map();



export const createUser = async (email: string, password: string): Promise<User> => {
    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: Date.now(),
        email,
        password: HashedPassword,
        role: Role.USER
    }
    users.set(email, newUser);
    return newUser;
}



export const findUserByEmail = (email: string): User | undefined => {
    return users.get(email);
}

export const findUserById = (id: number): User | undefined => {
    return Array.from(users.values()).find((user) => user.id === id);
}

export const validatePassword = async (email: string, password: string): Promise<boolean> => {
    const user = findUserByEmail(email);
    if (!user) return false;
    return await bcrypt.compare(password, user.password);
}



export const removeToken = (email: string): boolean => {
    const foundUser = findUserByEmail(email);
    if (!foundUser) return false;

    users.set(email,{...foundUser, refreshToken:undefined})
    return true;
}