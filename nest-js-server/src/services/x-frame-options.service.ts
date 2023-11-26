import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class XFrameOptionsService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.X_FRAME_OPTIONS);
        if(!!header) {
            header.result = 'Header is set (good for old browsers) - but pls also use frame-ancestors CSP directive.';
            header.status = HeaderScanResultStatus.SUCCESS;
            return header;        }   
        
        return { type: HeaderType.X_FRAME_OPTIONS, value: null, result: 'Header not set.', status: HeaderScanResultStatus.WARNING };
    }
    
}