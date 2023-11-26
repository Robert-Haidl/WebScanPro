import { Header } from "./header";
import { HeaderType } from "./header-type";

export interface HeaderScanResult {
    type: HeaderType;
    value: string;
    status?: HeaderScanResultStatus;
    result?: string;
}

export enum HeaderScanResultStatus {
    SUCCESS = 'SUCCESS',
    WARNING = 'WARNING',
    FAILED = 'FAILED'
}