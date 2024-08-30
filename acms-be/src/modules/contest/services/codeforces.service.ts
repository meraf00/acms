import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CodeforcesConfig } from '@shared/config';
import * as crypto from 'crypto';
import { map, Observable } from 'rxjs';

import { CodeforcesContest } from '../dtos/codeforces-contest.dto';

@Injectable()
export class CodeforcesService {
  private readonly config: CodeforcesConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.config = this.configService.get<CodeforcesConfig>('codeforces')!;
  }

  generateUrl(methodName: string, params: Record<string, string>) {
    const keys = Object.keys(params);
    keys.sort();

    let str = '';
    for (const key of keys) {
      str += key + '=' + params[key] + '&';
    }

    if (str[str.length - 1] === '&') str = str.slice(0, -1);

    return `https://codeforces.com/api/${methodName}?${str}`;
  }

  signReq(methodName: string, params: Record<string, string>) {
    const p = {
      apiKey: this.config.apiKey,
      time: Math.floor(Date.now() / 1000).toString(),
      ...params,
    };
    const keys = Object.keys(p);
    keys.sort();

    const nonce = crypto.randomUUID().slice(0, 6);
    let str = nonce + '/' + methodName + '?';

    for (const key of keys) {
      str += key + '=' + p[key] + '&';
    }

    if (str[str.length - 1] === '&') str = str.slice(0, -1);

    str += '#' + this.config.secret;

    const apiSig =
      nonce + crypto.createHash('sha512').update(str).digest('hex');

    return this.generateUrl(methodName, { ...p, apiSig });
  }

  getContests(): Observable<CodeforcesContest[]> {
    const method = 'contest.list';
    const params = {
      gym: 'true',
    };
    const signedUrl = this.signReq(method, params);

    return this.httpService.get(signedUrl).pipe(
      map((resp) => {
        return resp.data.result.filter(
          (contest: any) => contest.preparedBy === this.config.handle,
        );
      }),
    );
  }

  async getContest(contestId: string) {
    const method = 'contest.standings';
    const params = {
      asManager: 'true',
      contestId,
    };

    const signedUrl = this.signReq(method, params);
    try {
      return this.httpService.get(signedUrl).pipe(
        map((resp) => {
          console.log(resp);
          return resp.data.result;
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }
}
