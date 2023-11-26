import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class ReferrerPolicyService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.REFERRER_POLICY);
        if(!!header) {
            if(header.value.includes("strict-origin-when-cross-origin")) {
                header.result = 'Header set correctly.';
                header.status = HeaderScanResultStatus.SUCCESS;
                return header;  
            }
            header.result = 'Header set but doesnt include strict-origin-when-cross-origin.';
            header.status = HeaderScanResultStatus.WARNING;
            return header;  
        }  
        
        return { type: HeaderType.REFERRER_POLICY, value: null, result: 'Should be set explicitly to not send all referrer information. (old browsers)', status: HeaderScanResultStatus.WARNING };
    }
    
}