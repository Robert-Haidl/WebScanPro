export enum HeaderType {
  CONTENT_TYPE = 'content-type',
  CONTENT_SECURITY_POLICY_REPORT_ONLY = 'content-security-policy-report-only',
  CONTENT_SECURITY_POLICY = 'content-security-policy',
  X_FRAME_OPTIONS = 'x-frame-options',
  X_CONTENT_SECURITY_POLICY = 'x-content-security-policy',
  X_WEBKIT_CSP = 'x-webkit-csp',
  STRICT_TRANSPORT_SECURITY = 'strict-transport-security',
  X_XSS_PROTECTION = 'x-xss-protection',
  X_CONTENT_TYPE_OPTIONS = 'x-content-type-options',
  REFERRER_POLICY = 'referrer-policy',
  EXPECT_CT = 'expect-ct',
  CROSS_ORIGIN_OPENER_POLICY = 'cross-origin-opener-policy',
  CROSS_ORIGIN_EMBEDDER_POLICY = 'cross-origin-embedder-policy',
  CROSS_ORIGIN_RESOURCE_POLICY = 'cross-origin-resource-policy',
  PERMISSIONS_POLICY = 'permissions-policy', //maybe check for interest-cohort=()
  X_POWERED_BY = 'x-powered-by',
  PUBLIC_KEY_PINS = 'public-key-pins',
  PUBLIC_KEY_PINS_REPORT_ONLY = 'public-key-pins-report-only',

}
