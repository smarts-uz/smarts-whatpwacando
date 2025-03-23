import fs from 'fs/promises';
import path from 'path';

const INDEX = 'index.html';
const BUILD_DIR = path.resolve('dist');
const SERVICE_WORKER = 'service-worker.js';

const indexFile = await fs.readFile(path.resolve(BUILD_DIR, INDEX), {encoding: 'utf8'});
const search = `/node_modules`;
const replacement = ``;

fs.writeFile(path.resolve(BUILD_DIR, INDEX), indexFile.replaceAll(search, replacement));

const getFiles = filePath => new Promise((resolve, reject) => {
  const isDir = (file) => new Promise((resolve, reject) => {
    const fullPath = path.join(filePath, file);

    fs.stat(fullPath, (err, stat) => {
      const f = fullPath.replace(`${BUILD_DIR}/`, ``);
      return resolve(stat && stat.isFile() ? `${f}` : null);
    });
  });

  fs.readdir(filePath, (err, entries) => {
    const f = entries.filter(file => !file.includes(SERVICE_WORKER)).map(file => isDir(file));

    Promise.all(f)
    .then((results) => results.filter(res => res))
    .then(files => resolve(files.sort()));
  });
});

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

  for (let file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.stat(filepath);

    if (stat.isDirectory()) {
      const rootDir = filepath.split('dist')[1].split('/')[1];
      if (excludedDirs.includes(rootDir)) {
        continue;
      }
      filelist = await directory_read(filepath, filelist);
    } else {
      const fullPath  = filepath.replace(`${BUILD_DIR}/`, ``);
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

directory_read(BUILD_DIR)
.then(async (files) => {
  const allFiles = files.reduce((acc, item) => acc.concat(item), []);

  process(allFiles);

  const [cssPath] = files[1];

  const indexFile = await fs.readFile(path.resolve(BUILD_DIR, INDEX), {encoding: 'utf8'});
  const search = `<!-- STYLES -->`;
  const replacement = `<link rel="stylesheet" href="${cssPath}">`;

  await fs.writeFile(path.resolve(BUILD_DIR, INDEX), indexFile.replace(search, replacement));
});
