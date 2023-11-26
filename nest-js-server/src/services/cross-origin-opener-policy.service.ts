import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class CrossOriginOpenerPolicyService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.CROSS_ORIGIN_OPENER_POLICY);
        if(!!header) {
            if(header.value.includes("same-origin")) {
                header.result = 'Header set correctly.';
                header.status = HeaderScanResultStatus.SUCCESS;
                return header;
            }
            header.result = 'Header set but doesnt include same-origin.';
            header.status = HeaderScanResultStatus.WARNING;
            return header;  
        }  
        
        return { type: HeaderType.CROSS_ORIGIN_OPENER_POLICY, value: null, result: 'Should be set to protect against attacks like Spectre.', status: HeaderScanResultStatus.WARNING }; 
    }
    
}