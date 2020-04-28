import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const ejs = require('ejs');
const fs = require('fs');
const recursiveReadSync = require('readdirsync2');
import { JSONSchema7 } from 'json-schema';
const yaml = require('yamljs');

@Injectable()
export class SwaggerService {
  constructor(private readonly configService: ConfigService) {}
  // Given the name of a repository, this will return the swagger.json file
  async getSchema(repoPath): Promise<string> {
    const orgName = repoPath.split('/')[0];
    const repoName = repoPath.split('/')[1];
    const cache = this.configService.get('REPO_CACHE_DIRECTORY') + '/';
    const endpointNamesPath = recursiveReadSync(cache + repoPath, {
      only: 'directory',
      ignoreName: ['.git'],
    });
    const endpoints = [];
    endpointNamesPath.forEach((name) => {
      const endpointNameWithoutPath = name.replace(cache + repoPath + '/', '');
      const schemaPath = name + '/.schema.json';
      try {
        if (fs.existsSync(schemaPath)) {
          const endpointSchema: JSONSchema7 = JSON.parse(
            fs.readFileSync(name + '/.schema.json', 'utf-8'),
          );
          endpoints.push({ [endpointNameWithoutPath]: endpointSchema });
        }
      } catch (err) {
        console.error(err);
      }
    });
    const swaggerYML = await ejs.render(
      fs.readFileSync(__dirname + '/swagger.yml.ejs', 'utf-8'),
      {
        endpoints: endpoints,
        orgName: orgName,
        repoName: repoName,
        domain: this.configService.get('DOMAIN'),
      },
    );

    let swaggerAsObject = await yaml.parse(swaggerYML);
    swaggerAsObject.definitions = {};

    // Adding the definitions as objects is much easier than through the template.
    endpoints.forEach((endpoint) => {
      const endpointName = Object.keys(endpoint)[0];
      const singularName = endpoint[endpointName].title;

      // Some JSONSchema just can't be used by Swagger
      delete endpoint[endpointName]['$schema'];
      delete endpoint[endpointName]['$id'];
      delete endpoint[endpointName]['definitions'];

      swaggerAsObject.definitions[singularName] = endpoint[endpointName];
    });

    const swaggerJSON = JSON.stringify(swaggerAsObject);

    return swaggerJSON;
  }
}
