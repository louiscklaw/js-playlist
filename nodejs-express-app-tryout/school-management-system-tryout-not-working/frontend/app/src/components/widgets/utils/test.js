// TO copy components from mui library to project, copy to components

const fs = require('fs');
const path = require('path');

// Define the source and destination directories
const dir_from_base = `/home/logic/Downloads/material-ui-master/docs/data/material/components`;
const dir_to_base = `/workspace/js-playlist/nodejs-express-app-tryout/with-frontend-backend-tryout/frontend/app/src/components/widgets`;

// /workspace/js-playlist/nodejs-express-app-tryout/with-frontend-backend-tryout/frontend/app/src/pages/browse/helloworld.js
const src_browse_file = `/workspace/js-playlist/nodejs-express-app-tryout/with-frontend-backend-tryout/frontend/app/src/pages/browse/helloworld.js`;
var dst_browse_file = `/workspace/js-playlist/nodejs-express-app-tryout/with-frontend-backend-tryout/frontend/app/src/pages/browse/test.js`;

const components_list = [
  // 'about-the-lab',
  'accordion',

  // 'click-away-listener',
  'container',
  // 'css-baseline',

  // 'no-ssr',

  'pagination',

  'stack',
  'steppers',
  'switches',
  // 'transfer-list',
  // 'use-media-query',
];

// Recursively copy files from dir_from to dir_to
function copyFiles(sourceDir, targetDir, component_name) {
  var output = [];

  // Get all files in the source directory
  try {
    fs.mkdirSync(targetDir);
  } catch {}

  const files = fs.readdirSync(sourceDir);

  // Iterate through each file
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, convertFileName(file));

    if (sourcePath.search(/.*js/) > -1) {
      // Retrieve the file stats to determine if it's a directory or a file
      const stats = fs.statSync(sourcePath);

      if (stats.isDirectory()) {
        // If it's a directory, create the corresponding directory in the target location recursively and continue copying files inside it.
        fs.mkdirSync(targetPath);
        copyFiles(sourcePath, targetPath);
      } else {
        // If it's a file, read its content, perform necessary modifications,
        // and write into destination with converted filename.

        let content;
        try {
          content = fs.readFileSync(sourcePath, 'utf-8');
          content = content.replace(/export default /g, 'export ');
          fs.writeFileSync(targetPath, content);
        } catch (error) {
          console.error(`Failed to process ${sourceFile}: ${error}`);
          continue;
        }
      }

      const file_name_wo_ext = file.replace(/.js/, '');

      const importPath = targetPath.replace(
        '/workspace/js-playlist/nodejs-express-app-tryout/with-frontend-backend-tryout/frontend/app/src',
        'src',
      );

      console.log(
        `{/* <WidgetPreviewer element={<${file_name_wo_ext} />} name="${convertFileName(
          file,
        )}" /> */}`,
      );
      output.push([
        `{/* <WidgetPreviewer element={<${file_name_wo_ext} />} name="${convertFileName(
          file,
        )}" /> */}`,
        `// import { ${file_name_wo_ext} } from '${importPath}';`,
      ]);
    }
  }
  return output;
}

// Function to convert PascalCase to hyphen-case
function convertFileName(fileName) {
  return fileName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

var json_list_output = [];
var json_list_filename = 'json_list.out';

var import_list_output = [];
var import_list_filename = 'import_list.out';

components_list.map(c => {
  console.log('');
  console.log(`// ${c}`);
  console.log('');

  const dir_from = `${dir_from_base}/${c}`;
  const dir_to = `${dir_to_base}/mui-${c}`;

  json_list_output.push(
    `
// {
//   title: 'mui-${c}',
//   subtitle: '',
//   image: '/static/browse/base-typography_\${mode}.png',
//   path: '/browse/mui-${c}',
// },
  `.trim(),
  );

  import_list_output.push(
    `
// ${c} imports listing
    `,
  );

  var comp_list = copyFiles(dir_from, dir_to, c);
  var string_comp_list = comp_list.map(c => c[0]).join('\n');
  var string_list_output = comp_list.map(c => c[1]).join('\n');
  import_list_output.push(string_list_output);

  // NOTE: make browse file

  dst_browse_file = src_browse_file.replace('helloworld.js', `mui-${c}.js`);
  fs.copyFileSync(src_browse_file, dst_browse_file);

  try {
    content = fs.readFileSync(src_browse_file, 'utf-8');
    content = content.replace(/WidgetPreviewerListHere/g, string_comp_list);
    content = content.replace(/WidgetImportListHere/g, string_list_output);
    fs.writeFileSync(dst_browse_file, content);
  } catch (err) {
    console.error('error during making browse file');
  }
});

fs.writeFileSync(import_list_filename, import_list_output.join('\n'));
fs.writeFileSync(json_list_filename, json_list_output.join('\n\n'));
