import { Header } from "./header";

export interface FormResult {
    url: string;
    finalUrl?: string;
    headers: Header[];
    certificate: string;
    error?: string;
}