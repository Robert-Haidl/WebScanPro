import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class StrictTransportSecurityService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.STRICT_TRANSPORT_SECURITY);
        if(!!header) {
            header.result = 'Header set correctly.';
            header.status = HeaderScanResultStatus.SUCCESS;
            return header;
        }   
        
        return { type: HeaderType.STRICT_TRANSPORT_SECURITY, value: null, result: 'Header not set.', status: HeaderScanResultStatus.WARNING };
    }
    
}