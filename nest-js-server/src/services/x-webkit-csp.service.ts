import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class XWebkitCSPService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        var header = headers.find(h => h.type === HeaderType.X_WEBKIT_CSP);
        if(!!header) {
            header.result = 'Header is deprecated.';
            header.status = HeaderScanResultStatus.WARNING;
            return header;
        }   
        
        return { type: HeaderType.X_WEBKIT_CSP, value: null, result: 'Header not set.', status: HeaderScanResultStatus.SUCCESS };
    }
    
}