import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class XPoweredByService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.X_POWERED_BY);
        if(!!header) {
            header.result = 'Header should not be set because it exposes information about the server.';
            header.status = HeaderScanResultStatus.WARNING;
            return header;
        }  
        
        return { type: HeaderType.X_POWERED_BY, value: null, result: 'Header not set.', status: HeaderScanResultStatus.SUCCESS };
    }
    
}