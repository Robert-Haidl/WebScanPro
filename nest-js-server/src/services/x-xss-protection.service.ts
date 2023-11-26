import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class XXSSProtectionService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.X_XSS_PROTECTION);
        if(!!header) {
            if(header.value !== "0") {
                header.result = 'Use CSP to disable inline Javascript instead of X-XSS-Protection.';
                header.status = HeaderScanResultStatus.WARNING;
                return header;  
            }else if(header.value == "0") {
                header.result = 'Header set correctly.';
                header.status = HeaderScanResultStatus.SUCCESS;
                return header; 
            }else{
                header.result = 'Header set, but not explicitly disabled (="0").';
                header.status = HeaderScanResultStatus.WARNING;
                return header;   
            }
        }   
        
        return { type: HeaderType.X_XSS_PROTECTION, value: null, result: 'Header not set.', status: HeaderScanResultStatus.SUCCESS };
    }
    
}