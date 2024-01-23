// api/api.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HeaderMapperService } from './header-mapper.service';
import { HeaderScannerService } from './header-scanner.service';
import * as https from 'https';

@Controller('api')
@ApiTags('API')
export class AppController {

  private mapperService : HeaderMapperService;
  private scannerService : HeaderScannerService;
  constructor(mapperService : HeaderMapperService, scannerService : HeaderScannerService) {
    this.mapperService = mapperService;
    this.scannerService = scannerService;
  }

  @Get()
  getHello(): string {
    return 'WebScanPro API 1.0';
  }

  @Post('scan')
  @ApiResponse({ status: 200, description: 'Successful response' })
  async scan(@Body() data: { url: string }): Promise<any> {
    try {
      let cert;
      let certVersion : string;
      let axiosRequest : AxiosRequestConfig;

      // First, make a GET request to get the certificate and TLS version
        axiosRequest = {
          url: data.url,
          method: 'get',
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          })
            .on('keylog', (line, tlsSocket) => {
              cert = tlsSocket.getPeerCertificate(false);
              certVersion = tlsSocket.getProtocol();
            }),
        };

      const axiosResponse: AxiosResponse = await axios(axiosRequest);

      // Extracting headers from the response
      const responseHeaders = axiosResponse.headers as any;
      const mappedHeaders = this.mapperService.mapJSONResponseToHeaders(responseHeaders);
      const scanResult = this.scannerService.buildScanResult(mappedHeaders);

      if (cert == undefined || cert == null) {
        return {
          error: 'NO SSL/TLS',
        };
      }

      return {
        headers: scanResult,
        certificate: certVersion,
      };
    } catch (error) {
     if (error.code == 'EPROTO') {
        return {
          error: 'NO SSL/TLS',
        };
     }

      return {
        error: 'Bad Gateway: Error while fetching the URL. ' + error.message,
      };
    }
  }

  @Post('scanMultiple')
  @ApiResponse({ status: 200, description: 'Successful response' })
  async scanMultiple(@Body() data: { url: string }[]): Promise<any> {
    return await this.processUrls(data);
  }

  async processUrls(data): Promise<any> {
    const response = await Promise.all(data.map(async el => {
      try {
        let cert;
        let certVersion: string;
        let axiosRequest: AxiosRequestConfig;
        let axiosResponse: AxiosResponse; 
        let finalUrl = el.url;
  
        do {
          axiosRequest = {
            url: finalUrl,
            method: 'get',
            validateStatus: null,
            httpsAgent: new https.Agent({
              rejectUnauthorized: false,
            }).on('keylog', (line, tlsSocket) => {
              cert = tlsSocket.getPeerCertificate(false);
              certVersion = tlsSocket.getProtocol();
            }),
          };
  
          axiosResponse = await axios(axiosRequest);
  
          // Update the final URL to the latest location header or the original URL
          finalUrl = axiosResponse.request.res.responseUrl || finalUrl;
        } while (axiosResponse.request.res.responseUrl !== finalUrl); // Keep following redirects until no more redirects
  
        // Extracting headers from the final response
        const responseHeaders = axiosResponse.headers as any;
        const mappedHeaders = this.mapperService.mapJSONResponseToHeaders(responseHeaders);
        const scanResult = this.scannerService.buildScanResult(mappedHeaders);
  
        if (cert == undefined || cert == null) {
          return { url: el.url, finalUrl: finalUrl, error: 'NO SSL/TLS' };
        }
  
        return { url: el.url, finalUrl: finalUrl, headers: scanResult, certificate: certVersion };
      } catch (error) {
        if (error.code == 'EPROTO') {
          return { url: el.url, error: 'NO SSL/TLS' };
        }
  
        return { url: el.url, error: 'Bad Gateway: Error while fetching the URL. ' + error.message };
      }
    }));
  
    return response;
  }
}
