import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class PermissionsPolicyService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.PERMISSIONS_POLICY);
        if(!!header) {
            if(header.value.includes("interest-cohort")) {
                header.result = 'Header set plus prevents to be included in Googles cohort calculation list.';
                header.status = HeaderScanResultStatus.SUCCESS;
                return header; 
            }
            header.result = 'Header set correctly.';
            header.status = HeaderScanResultStatus.SUCCESS;
            return header; 
        }  
        
        return { type: HeaderType.PERMISSIONS_POLICY, value: null, result: 'Should be set to protect users from attackes who execute XSS attacks', status: HeaderScanResultStatus.WARNING };
    }
    
}