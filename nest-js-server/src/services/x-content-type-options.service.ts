import { Injectable } from "@nestjs/common";
import { Header } from "src/models/header";
import { HeaderScanResult, HeaderScanResultStatus } from "src/models/header-scan-result";
import { HeaderType } from "src/models/header-type";

@Injectable()
export class XContentTypeOptionsService {

    constructor() { }

    scanHeaders(headers: Header[]) : HeaderScanResult {
        const header = headers.find(h => h.type === HeaderType.X_CONTENT_TYPE_OPTIONS);
        if(!!header) {
            if(header.value.includes("nosniff")) {
                header.result = 'Header set to nosniff to block mime type sniffing.';
                header.status = HeaderScanResultStatus.SUCCESS;
                return header;            }
        }  
        
        return { type: HeaderType.X_CONTENT_TYPE_OPTIONS, value: null, result: 'Should be set to block mime type sniffing.', status: HeaderScanResultStatus.WARNING };  
    }
    
}