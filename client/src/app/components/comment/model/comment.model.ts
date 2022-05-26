import { User } from "./user.model";

export interface Comment {
    user?: User,
    flightId?: string;
    comment?: string;
    date?: Date,
    id?: number;
}