import { Position } from "./position.model";

export interface Employee {
    id: number;
    name: string;
    registration_number: number;
    position: any;
    created_at: any;
    updated_at: any;
}

export interface EmployeeGet {
    id: number;
    name: string;
    registration_number: any;
    position: any;
    created_at: any;
    updated_at: any;
}