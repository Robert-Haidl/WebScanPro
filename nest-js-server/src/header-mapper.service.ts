import { Injectable } from "@nestjs/common";
import { Header } from "./models/header";
import { HeaderType } from "./models/header-type";

@Injectable()
export class HeaderMapperService {
  response: any;
  constructor() {}

  mapJSONResponseToHeaders(obj: any): Header[] {
    const headers : Header[] = [];
    Object.entries(obj).forEach(o => {
      const header : Header = { type: this.mapHeaderType(o[0]), value: o[1] as string }
      headers.push(header);
    })
    return headers;
  }

  mapHeaderType(headerType: string) : HeaderType {
    const headerTypes = Object.values(HeaderType);
    if(headerTypes.find(ht => ht.toLowerCase)) {
      return headerType as HeaderType;
    };

    //throw exception
    return null;
  }

}
