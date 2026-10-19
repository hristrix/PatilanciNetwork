import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
await mkdir(output, { recursive: true });
// Publish only public website files. Server source, secrets, tests, and package
// files must never be copied to the static output directory.
await cp(path.join(root, 'index.html'), path.join(output, 'index.html'));
for (const file of ['styles.css', 'script.js']) {
  await cp(path.join(root, file), path.join(output, file));
}
await cp(path.join(root, 'launcher_screenshots'), path.join(output, 'launcher_screenshots'), {
  recursive: true,
});
await cp(path.join(root, 'assets'), path.join(output, 'assets'), {
  recursive: true,
});
for (const file of await readdir(root)) {
  if (file.endsWith('.zip'))
    await cp(path.join(root, file), path.join(output, file));
}
await writeFile(
  path.join(output, '_routes.json'),
  JSON.stringify(
    {
      version: 1,
      include: ['/launcher', '/launcher/*'],
      exclude: [],
    },
    null,
    2,
  ) + '\n',
);
console.log('Built static website and /launcher/* Pages Function routing.');
