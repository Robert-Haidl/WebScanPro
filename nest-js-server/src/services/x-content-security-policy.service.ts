import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class XContentSecurityPolicyService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.X_CONTENT_SECURITY_POLICY);
        if(!!header) {
            header.result = 'Header is deprecated.';
            header.status = HeaderScanResultStatus.WARNING;
            return header;
        }   
        
        return { type: HeaderType.X_CONTENT_SECURITY_POLICY, value: null, result: 'Header not set.', status: HeaderScanResultStatus.SUCCESS };
    }
    
}