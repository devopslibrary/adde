import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');
const path = require('path');

@Injectable()
export class RestApiService {
  constructor(private readonly configService: ConfigService) {}

  // Get Data from API (Main Function)
  async getData(owner, repo, reqPath, queryParams): Promise<any> {
    const fullPath = await this.getCachePath(owner, repo, reqPath);
    // First see if there's a folder with the reqPath!
    if (this.isDirectory(fullPath)) {
      const resources = await this.listResources(fullPath);
      if (queryParams) {
        return this.filterByQueryParams(resources, queryParams);
      }
      return resources;
    }
    // Else return data if a file exists at location
    if (this.isFile(fullPath + '.json')) {
      return this.getResource(fullPath);
    }

    // Else throw error, bad reqPath
    else {
      throw new BadRequestException();
    }
  }

  // Is reqPath a directory?
  isDirectory(reqPath): boolean {
    if (fs.existsSync(reqPath) && fs.statSync(reqPath).isDirectory()) {
      return true;
    } else {
      return false;
    }
  }

  // Is reqPath a file?
  isFile(reqPath): boolean {
    if (fs.existsSync(reqPath) && fs.statSync(reqPath).isFile()) {
      return true;
    } else {
      return false;
    }
  }
  // Return the JSON contents of the file provided user has access.
  async getResource(reqPath): Promise<JSON> {
    return JSON.parse(fs.readFileSync(reqPath + '.json', 'utf8'));
  }

  // Filter resources by keys (used for query params being passed in)
  filterByQueryParams(resources, params: Object): JSON[] {
    let filteredResources = [];
    resources.forEach((resource) => {
      let filteredOut = false;
      for (const key in params) {
        let targetValue = params[key];
        if (resource[key] != targetValue) {
          filteredOut = true;
        }
      }
      if (!filteredOut) {
        filteredResources.push(resource);
      }
    });
    return filteredResources;
  }

  // Return list of resources in folder as JSON array
  async listResources(reqPath): Promise<JSON> {
    const filesWithExtensions = await fs.readdirSync(reqPath);
    let resourceList = [];
    filesWithExtensions.forEach((name) => {
      if (
        name != '.schema.json' &&
        name != '.git' &&
        path.extname(name) == '.json'
      ) {
        if (this.isDirectory(reqPath + name)) {
          resourceList.push(name);
        } else {
          const fileData = JSON.parse(
            fs.readFileSync(reqPath + '/' + name, 'utf8'),
          );
          resourceList.push(fileData);
        }
      }
    });
    return JSON.parse(JSON.stringify(resourceList));
  }

  // Given an owner, repo, and reqPath, this returns the local file reqPath to it.
  async getCachePath(owner, repo, reqPath): Promise<string> {
    return (
      this.configService.get('REPO_CACHE_DIRECTORY') +
      '/' +
      owner +
      '/' +
      repo +
      '/' +
      reqPath
    );
  }
}
