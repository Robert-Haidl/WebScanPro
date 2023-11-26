import { Header } from "./header";

export interface FormResult {
    headers: Header[];
    certificate: string;
    error?: string;
}