import { generateSchema } from './generate.schema';
import { loadJSONinFolder } from './generate.schema';
import { getCommonKeysWithinArrayOfObjects } from './generate.schema';

describe('generateSchema', () => {
  it('should return generated schema when it scans a folder with multiple JSON files', async () => {
    const schema = generateSchema('./test/fixtures/fakeData');
    expect(schema).toEqual({
      $id: 'fakeData',
      $schema: 'https://json-schema.org/draft-07/schema#',
      definitions: {},
      properties: {
        count: {
          default: '',
          pattern: '^(.*)$',
          title: 'The count Schema',
          type: 'string',
        },
        name: {
          default: '',
          pattern: '^(.*)$',
          title: 'The name Schema',
          type: 'string',
        },
        serverType: {
          default: '',
          pattern: '^(.*)$',
          title: 'The serverType Schema',
          type: 'string',
        },
        teamOwner: {
          default: '',
          pattern: '^(.*)$',
          title: 'The teamOwner Schema',
          type: 'string',
        },
      },
      required: ['name', 'serverType', 'teamOwner', 'count'],
      title: 'fakeData',
      type: 'object',
    });
  });
});

describe('loadJSONinFolder', () => {
  it('should load all JSON within a folder and return as array of objects', async () => {
    const loadedJSON = loadJSONinFolder('./test/fixtures/fakeData');
    expect(loadedJSON).toEqual([
      {
        count: 500,
        name: 'Old Legacy Application',
        serverType: 'iis',
        teamOwner: 'webdev',
      },
      {
        count: 14,
        extraInformation: 'This should not get picked up.',
        name: 'New Backend Application',
        serverType: 'node',
        teamOwner: 'devteam',
      },
    ]);
  });
});

describe('getCommonKeysWithinArrayOfObjects', () => {
  it('should retrieve ONLY the keys that are common across all objects within an array', async () => {
    const keys = getCommonKeysWithinArrayOfObjects([
      {
        count: 500,
        name: 'Old Legacy Application',
        serverType: 'iis',
        teamOwner: 'webdev',
      },
      {
        count: 14,
        extraInformation: 'This should not get picked up.',
        name: 'New Backend Application',
        serverType: 'node',
        teamOwner: 'devteam',
      },
    ]);
    expect(keys).toEqual(['count', 'name', 'serverType', 'teamOwner']);
  });
});
