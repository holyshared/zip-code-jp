import program from 'commander';
import default as Application from './dictionary-generator';

program
  .version('0.1.0')
  .option('-o, --output [directory]', 'Output directory')
  .parse(process.argv);

Application.from(program.output).run();
