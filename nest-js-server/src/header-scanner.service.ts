import { Injectable } from "@nestjs/common";
import { HeaderScanResult } from "./models/header-scan-result";
import { Header } from "./models/header";
import {
    XFrameOptionsService,
    StrictTransportSecurityService,
    XContentSecurityPolicyService,
    XWebkitCSPService,
    ContentSecurityPolicyService,
    CrossOriginEmbedderPolicyService,
    CrossOriginOpenerPolicyService,
    CrossOriginResourcePolicyService,
    PermissionsPolicyService,
    ReferrerPolicyService,
    XContentTypeOptionsService,
    XPoweredByService,
    XXSSProtectionService,
  } from "./services";

@Injectable()

export class HeaderScannerService {
    constructor(
        private readonly xFrameOptionsService: XFrameOptionsService,
        private readonly strictTransportSecurityService: StrictTransportSecurityService,
        private readonly xContentSecurityPolicyService: XContentSecurityPolicyService,
        private readonly xWebKitCSPService: XWebkitCSPService,
        private readonly contentSecurityPolicyService: ContentSecurityPolicyService,
        private readonly crossOriginEmbedderPolicyService: CrossOriginEmbedderPolicyService,
        private readonly crossOriginOpenerPolicyService: CrossOriginOpenerPolicyService,
        private readonly crossOriginResourcePolicyService: CrossOriginResourcePolicyService,
        private readonly permissionsPolicyService: PermissionsPolicyService,
        private readonly referrerPolicyService: ReferrerPolicyService,
        private readonly xContentTypeOptionsService: XContentTypeOptionsService,
        private readonly xPoweredByService: XPoweredByService,
        private readonly xXSSProtectionService: XXSSProtectionService
      ) {}
    
      buildScanResult(headers: Header[]): HeaderScanResult[] {
        const scanResult: HeaderScanResult[] = [];
    
        scanResult.push(this.contentSecurityPolicyService.scanHeaders(headers));
        scanResult.push(this.xContentSecurityPolicyService.scanHeaders(headers));
        scanResult.push(this.crossOriginEmbedderPolicyService.scanHeaders(headers));
        scanResult.push(this.crossOriginOpenerPolicyService.scanHeaders(headers));
        scanResult.push(this.crossOriginResourcePolicyService.scanHeaders(headers));
        scanResult.push(this.permissionsPolicyService.scanHeaders(headers));
        scanResult.push(this.referrerPolicyService.scanHeaders(headers));
        scanResult.push(this.strictTransportSecurityService.scanHeaders(headers));
        scanResult.push(this.xContentTypeOptionsService.scanHeaders(headers));
        scanResult.push(this.xFrameOptionsService.scanHeaders(headers));
        scanResult.push(this.xPoweredByService.scanHeaders(headers));
        scanResult.push(this.xWebKitCSPService.scanHeaders(headers));
        scanResult.push(this.xXSSProtectionService.scanHeaders(headers));
    
        return scanResult.filter((result) => result !== null && result !== undefined);
      }   

}