import fs from 'fs';
import { Promise } from 'bluebird';
import { createFromZipFile } from 'zip-code-jp-stream';

const writeFile = Promise.promisify(fs.writeFile);

export default class DictionaryGenerator {
  constructor(output) {
    this.output = output || 'output';
    this.addresses = new Map();
    this.logger = console;
  }
  indexing(record) {
    const prefix = record.zip_code.substr(0, 3);
    const area = (/^以下に掲載がない場合/.test(record.area)) ? '' : record.area;

    const data = {
      prefecture: record.prefecture,
      city: record.city,
      area: area,
    };

    const prefixAddresses = this.addresses.get(prefix) || new Map();
    prefixAddresses.set(record.zip_code, data);
    this.addresses.set(prefix, prefixAddresses);
  }
  generate() {
    let chain = Promise.resolve();
    for (let [ prefix, values ] of this.addresses.entries()) {
      chain.then(this.outputDictionary(prefix, values));
    }
    chain.then(() => this.end());
  }
  run() {
    this.logger.info('generating dictionary');
    const stream = createFromZipFile('ken_all.zip');
    stream.on('data', (record) => this.indexing(record));
    stream.on('end', () => this.generate());
  }
  end() {
    this.logger.info('dictionary is generated');
  }
  outputDictionary(prefix, values) {
    const json = {};
    values.forEach((value, key) => json[key] = value);
    const content = JSON.stringify(json);

    return writeFile(this.output + '/zip-' + prefix + '.json', content);
  }
  static from(output) {
    return new DictionaryGenerator(output);
  }
}
