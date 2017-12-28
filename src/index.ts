#!/usr/bin/env node

import * as fs from 'fs-extra';
import * as program from 'commander';
import tag from './tag/tag';
import scss from './tag/scss';
import index from './tag/index';

async function main(tagName: string) {
  const name = tagName.toLocaleLowerCase();
  console.log(`Creating component ${name}...`);

  fs.mkdir(name);
  await fs.writeFile(`${name}/${name}.tag`, tag.replace(/\$name/g, name));
  await fs.writeFile(`${name}/${name}.scss`, scss.replace(/\$name/g, name));
  await fs.writeFile(`${name}/${name}.js`, index.replace(/\$name/g, name));
};

program
  .version('1.0.0')
  .arguments('<name>')
  .action(name => {
    main(name);
  })
  .usage('create-riot-component [name]')
  .parse(process.argv);