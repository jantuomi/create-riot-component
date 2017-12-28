#!/usr/bin/env node

import * as fs from 'fs-extra';
import * as program from 'commander';
import tag from './tag/tag';
import scss from './tag/scss';
import index from './tag/index';
import * as pkg from '../package.json';

async function main(tagName: string): Promise<void> {
  const name = tagName.toLocaleLowerCase();
  console.log(`Creating component ${name}...`);

  fs.mkdir(name);
  await fs.writeFile(`${name}/${name}.tag`, tag.replace(/\$name/g, name));
  await fs.writeFile(`${name}/${name}.scss`, scss.replace(/\$name/g, name));
  await fs.writeFile(`${name}/${name}.js`, index.replace(/\$name/g, name));
};

program
  .version((<any> pkg).version)
  .arguments('<name>')
  .action(name => {
    main(name);
  })
  .usage('[name]')
  .parse(process.argv);