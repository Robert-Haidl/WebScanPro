import { HeaderScanResultStatus } from './header-scan-result';
import { HeaderType } from './header-type';

export interface Header {
  type: HeaderType;
  value: string;
  status?: HeaderScanResultStatus;
  result?: string;
}
