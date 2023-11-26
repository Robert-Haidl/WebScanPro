import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class CrossOriginEmbedderPolicyService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.CROSS_ORIGIN_EMBEDDER_POLICY);
        if(!!header) {
            if(header.value.includes("require-corp")) {
                header.result = 'Header set correctly.';
                header.status = HeaderScanResultStatus.SUCCESS;
                return header;  
            }
            header.result = 'Header set but doesnt include require-corp.';
            header.status = HeaderScanResultStatus.WARNING;
            return header; 
        }  
        
        return { type: HeaderType.CROSS_ORIGIN_EMBEDDER_POLICY, value: null, result: 'Should be set to protect against attacks like Spectre.', status: HeaderScanResultStatus.WARNING }; 
    }
    
}