import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class ContentSecurityPolicyService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.CONTENT_SECURITY_POLICY);
        if(!!header) {
            header.result = 'Header set.';
            header.status = HeaderScanResultStatus.SUCCESS;
            return header;   
        }  
        
        return { type: HeaderType.CONTENT_SECURITY_POLICY, value: null, result: 'Content Security Policy Header NOT set!', status: HeaderScanResultStatus.FAILED } 
    }
    
}