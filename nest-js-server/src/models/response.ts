import { HeaderScanResult } from "./header-scan-result";

export interface Response {
    url: string;
    headers?: HeaderScanResult[];
    certificate?: string;
    error?: string;
}