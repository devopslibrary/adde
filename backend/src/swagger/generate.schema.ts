const fs = require('fs');
var path = require('path');

export function generateSchema(folderPath: string): any {
  const folderName = folderPath.split('/').pop();
  const jsonData = loadJSONinFolder(folderPath);
  const commonKeys = getCommonKeysWithinArrayOfObjects(jsonData);
  if (commonKeys.length == 0) {
    return false;
  }
  const generatedProperties = {};
  for (let key of commonKeys) {
    generatedProperties[key] = {
      type: 'string',
      title: 'The ' + key + ' Schema',
      default: '',
      pattern: '^(.*)$',
    };
  }
  const schema = {
    definitions: {},
    $schema: 'https://json-schema.org/draft-07/schema#',
    $id: folderName,
    type: 'object',
    title: folderName,
    required: commonKeys,
    properties: generatedProperties,
  };
  return schema;
}

// Return all keys that are found in every object within an array.
// If some objects are missing the key, it will not be returned
export function getCommonKeysWithinArrayOfObjects(objectArray): Array<string> {
  // Get all unique keys across all Objects
  let allKeys = [];
  for (let object of objectArray) {
    if (Array.isArray(object)) {
      allKeys = [...new Set([...allKeys, ...Object.keys(object[0])])];
    } else {
      allKeys = [...new Set([...allKeys, ...Object.keys(object)])];
    }
  }
  let keysInAllObjects = [];
  for (let key of allKeys) {
    let foundWithinObjects = true;
    for (let object of objectArray) {
      if (Array.isArray(object)) {
        if (!Object.keys(object[0]).includes(key)) {
          foundWithinObjects = false;
        }
      } else {
        if (!Object.keys(object).includes(key)) {
          foundWithinObjects = false;
        }
      }
    }
    if (foundWithinObjects) {
      keysInAllObjects.push(key);
    }
  }
  return keysInAllObjects;
}

// Parse all JSON Files within a folder, return as Array of Objects
export function loadJSONinFolder(folderPath: string): Array<Object> {
  const filesNamesInFolder = fs.readdirSync(folderPath);
  const jsonFileNamesInFolder = filesNamesInFolder.filter((file) => {
    return path.extname(file).toLowerCase() === '.json';
  });

  // Read in JSON data
  const parsedFiles = [];
  for (let fileName of jsonFileNamesInFolder) {
    const fileData = JSON.parse(
      fs.readFileSync(folderPath + '/' + fileName, 'utf8'),
    );
    parsedFiles.push(fileData);
  }

  return parsedFiles;
}
