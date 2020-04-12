import { Test, TestingModule } from '@nestjs/testing';
import { RestApiService } from './restAPI.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '../config/config.service';

describe('RestApiService', () => {
  let service: RestApiService;
  let configService: ConfigService;
  let cachePath: string = '';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestApiService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: process.env.NODE_ENV + '.env',
        }),
      ],
    }).compile();
    configService = module.get<ConfigService>(ConfigService);
    service = module.get<RestApiService>(RestApiService);
    cachePath = configService.get('REPO_CACHE_DIRECTORY');
  });

  describe('getData', () => {
    it('should return proper JSON for a folder"', async () => {
      const data = await service.getData(
        'devopslibrary',
        'sampledata',
        'datacenters',
      );

      expect(data).toEqual([
        {
          name: 'Indianapolis Production Datacenter 01',
          lastUpdated: '2020-12-30T19:31:99Z',
          shortname: 'ind01pr',
          dns: { primary: '8.8.8.8', secondary: '4.2.2.9' },
          cidr: '172.16.0.0/19',
          vlans: [1, 2, 3, 4, 5],
        },
        {
          name: 'San Diego Disaster Recovery Datacenter 01',
          lastUpdated: '2019-12-30T19:31:42Z',
          shortname: 'san01dr',
          dns: { primary: '1.1.1.1', secondary: '2.2.2.2' },
          cidr: '172.32.0.0/19',
          vlans: [6, 7, 8, 9, 10],
        },
        {
          name: 'San Francisco Production Datacenter 01',
          lastUpdated: '2019-12-30T19:34:41Z',
          shortname: 'sfo01pr',
          dns: { primary: '9.9.9.9', secondary: '12.12.12.12' },
          cidr: '172.64.0.0/19',
          vlans: [11, 12, 13, 14, 15],
        },
      ]);
    });
    it('should return proper JSON for a filePath"', async () => {
      const data = await service.getData(
        'devopslibrary',
        'sampledata',
        'datacenters/ind01pr',
      );
      expect(data).toEqual({
        cidr: '172.16.0.0/19',
        dns: { primary: '8.8.8.8', secondary: '4.2.2.9' },
        lastUpdated: '2020-12-30T19:31:99Z',
        name: 'Indianapolis Production Datacenter 01',
        shortname: 'ind01pr',
        vlans: [1, 2, 3, 4, 5],
      });
    });
  });

  describe('getCachePath', () => {
    it('should return the correct path to a file when called"', async () => {
      const filePath = await service.getCachePath(
        'devopslibrary',
        'sampledata',
        'datacenters',
      );
      expect(filePath).toEqual(
        cachePath + '/devopslibrary/sampledata/datacenters',
      );
    });
  });

  describe('isDirectory', () => {
    it('return true for a valid directory and false when not a directory"', async () => {
      const goodDirectory = await service.isDirectory(
        cachePath + '/devopslibrary/sampledata/datacenters',
      );
      const badDirectory = await service.isDirectory(
        cachePath + '/nonExistentFolder',
      );
      expect(goodDirectory).toEqual(true);
      expect(badDirectory).toEqual(false);
    });
  });

  describe('isFile', () => {
    it('return true for a valid file and false when not a file"', async () => {
      const goodFile = await service.isFile(
        cachePath + '/devopslibrary/sampledata/datacenters/ind01pr.json',
      );
      const badFile = await service.isFile(cachePath + '/nonExistentFile.json');
      expect(goodFile).toEqual(true);
      expect(badFile).toEqual(false);
    });
  });

  describe('listResources', () => {
    it('should return all files listed within a directory', async () => {
      const list = await service.listResources(
        cachePath + '/devopslibrary/sampledata/datacenters/',
      );

      expect(list).toEqual([
        {
          name: 'Indianapolis Production Datacenter 01',
          lastUpdated: '2020-12-30T19:31:99Z',
          shortname: 'ind01pr',
          dns: { primary: '8.8.8.8', secondary: '4.2.2.9' },
          cidr: '172.16.0.0/19',
          vlans: [1, 2, 3, 4, 5],
        },
        {
          name: 'San Diego Disaster Recovery Datacenter 01',
          lastUpdated: '2019-12-30T19:31:42Z',
          shortname: 'san01dr',
          dns: { primary: '1.1.1.1', secondary: '2.2.2.2' },
          cidr: '172.32.0.0/19',
          vlans: [6, 7, 8, 9, 10],
        },
        {
          name: 'San Francisco Production Datacenter 01',
          lastUpdated: '2019-12-30T19:34:41Z',
          shortname: 'sfo01pr',
          dns: { primary: '9.9.9.9', secondary: '12.12.12.12' },
          cidr: '172.64.0.0/19',
          vlans: [11, 12, 13, 14, 15],
        },
      ]);
    });
  });

  describe('getResource', () => {
    it('should return valid JSON data for the appropriate ', async () => {
      const list = await service.getResource(
        cachePath + '/devopslibrary/sampledata/datacenters/ind01pr',
      );
      expect(list).toEqual({
        cidr: '172.16.0.0/19',
        dns: { primary: '8.8.8.8', secondary: '4.2.2.9' },
        lastUpdated: '2020-12-30T19:31:99Z',
        name: 'Indianapolis Production Datacenter 01',
        shortname: 'ind01pr',
        vlans: [1, 2, 3, 4, 5],
      });
    });
  });
});
