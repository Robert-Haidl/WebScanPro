import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HeaderMapperService } from './header-mapper.service';
import { XFrameOptionsService } from './services/x-frame-options.service';
import { HeaderScannerService } from './header-scanner.service';
import { StrictTransportSecurityService } from './services/strict-transport-security.service';
import { XContentSecurityPolicyService } from './services/x-content-security-policy.service';
import { XWebkitCSPService } from './services/x-webkit-csp.service';
import { PermissionsPolicyService } from './services/permissions-policy.service';
import { ReferrerPolicyService } from './services/referrer-policy.service';
import { XContentTypeOptionsService } from './services/x-content-type-options.service';
import { XPoweredByService } from './services/x-powered-by.service';
import { XXSSProtectionService } from './services/x-xss-protection.service';
import { ContentSecurityPolicyService } from './services/content-security-policy.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    HeaderMapperService,
    HeaderScannerService,
    ContentSecurityPolicyService,
    PermissionsPolicyService,
    ReferrerPolicyService,
    StrictTransportSecurityService,
    XContentSecurityPolicyService,
    XContentTypeOptionsService,
    XFrameOptionsService,
    XPoweredByService,
    XWebkitCSPService,
    XXSSProtectionService
  ],
})
export class AppModule {}
