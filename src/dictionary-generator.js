import fs from 'fs';
import { Promise } from 'bluebird';
import { createFromZipFile } from 'zip-code-jp-stream';

const addresses = new Map();
const writeFile = Promise.promisify(fs.writeFile);
const stream = createFromZipFile('ken_all.zip');

stream.on('data', (record) => {
  const prefix = record.zip_code.substr(0, 3);
  const area = (/^以下に掲載がない場合/.test(record.area)) ? '' : record.area;

  const data = {
    prefecture: record.prefecture,
    city: record.city,
    area: area,
  };

  const prefixAddresses = addresses.get(prefix) || new Map();
  prefixAddresses.set(record.zip_code, data);
  addresses.set(prefix, prefixAddresses);
});

stream.on('end', () => {
  let chain = Promise.resolve();

  for (let [ prefix, values ] of addresses.entries()) {
    chain.then(output(prefix, values));
  }
  chain.then(() => {
    console.log('end');
  });
});

function output(prefix, values) {
  const json = {};
  values.forEach((value, key) => json[key] = value);
  const content = JSON.stringify(json);

  return writeFile('output/zip-' + prefix + '.json', content);
}
