import fs from 'fs/promises';
import path from 'path';

const INDEX = 'index.html';
const BUILD_DIR = path.resolve('.');
const SERVICE_WORKER = 'service-worker.js';

const indexFile = await fs.readFile(path.resolve(BUILD_DIR, INDEX), {encoding: 'utf8'});
const search = `/node_modules`;
const replacement = ``;

fs.writeFile(path.resolve(BUILD_DIR, INDEX), indexFile.replaceAll(search, replacement));

const getFiles = async filePath => {
  return await fs.readdir(filePath);
};

const process = async files => {
  const replacement = files.reduce((str, file) => {
    return `${str}
  '/${file}',`;
  }, `const buildFiles = [`);

  const swFile = await fs.readFile(path.resolve(SERVICE_WORKER), {encoding: 'utf8'});
  const search = `const buildFiles = [];`;

  const swBuildFile = swFile
  .replace(search, `${replacement}];`)
  .replaceAll('node_modules', '');

  await fs.writeFile(path.resolve(BUILD_DIR, SERVICE_WORKER), swBuildFile);
};

const excludedDirs = ['@dannymoerkerke', 'three'];

export async function directory_read(dir, filelist = []) {
  const files = await fs.readdir(dir);

  for(let file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.stat(filepath);

    if(stat.isDirectory()) {
      const rootDir = filepath.split('dist')[1].split('/')[1];
      if(excludedDirs.includes(rootDir)) {
        continue;
      }
      filelist = await directory_read(filepath, filelist);
    }
    else {
      const fullPath = filepath.replace(`${BUILD_DIR}/`, ``);
      filelist.push(fullPath);
    }
  }

  return filelist;
}

// Promise.all([
//   getFiles(BUILD_DIR),
//   getFiles(`${BUILD_DIR}/src`),
//   getFiles(`${BUILD_DIR}/src/css`),
//   getFiles(`${BUILD_DIR}/src/elements`),
//   getFiles(`${BUILD_DIR}/src/fonts`),
//   getFiles(`${BUILD_DIR}/src/img`),
//   getFiles(`${BUILD_DIR}/src/lib`),
//   getFiles(`${BUILD_DIR}/src/img/gallery`),
//   getFiles(`${BUILD_DIR}/src/img/geolocation`),
//   getFiles(`${BUILD_DIR}/src/img/icons`),
//   getFiles(`${BUILD_DIR}/src/img/install`),
//   getFiles(`${BUILD_DIR}/src/img/media`),
//   getFiles(`${BUILD_DIR}/src/img/pwa`),
//   getFiles(`${BUILD_DIR}/src/img/screenshots`),
//   getFiles(`${BUILD_DIR}/src/img/sensors`),
//   getFiles(`${BUILD_DIR}/src/templates`),
// ])

const templates = async () => {
  const files = (await getFiles(`${BUILD_DIR}/src/templates`)).filter(file => file.endsWith('.js'));

  for(const file of files) {
    const fileContents = await fs.readFile(path.join(`${BUILD_DIR}/src/templates`, file), {encoding: 'utf8'});
    const fileName = file.split('.').shift();
    const newFile = fileContents.replace('<div class="view next-screen">', `<div class="view next-screen" id="${fileName}-demo">`)

    await fs.writeFile(path.resolve(`${BUILD_DIR}/src/templates`, file), newFile);
  }
};

templates();

// (.|\n+?)(export const template = `)(.|\n+)(`;)
