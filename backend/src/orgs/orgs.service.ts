import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Org } from './orgs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrgsService {
  constructor(
    @InjectRepository(Org)
    private readonly orgRepository: Repository<Org>,
  ) {}

  async upsertOrg(org: Org) {
    return this.orgRepository.save(Object.setPrototypeOf(org, Object)); // Object.setPrototypeOf needed because of this bug https://github.com/typeorm/typeorm/issues/2065
  }

  async findAllOrgs(token: string): Promise<Org[]> {
    const _orgs = await this.orgRepository.find();
    let orgArray: Org[] = [];
    for (let org of _orgs) {
      orgArray.push(org);
    }
    return orgArray;
  }
}
