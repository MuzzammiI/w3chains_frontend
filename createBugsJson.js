import fs from 'fs';

const lintResultsRaw = fs.readFileSync('./lint-results.json');
const lintResults = JSON.parse(lintResultsRaw);

const bugs = [];

lintResults.forEach(result => {
  if (result.messages.length > 0) {
    const filePath = result.filePath;
    const fileName = filePath.split('\\').pop();
    const folderName = filePath.split('\\').slice(-2, -1)[0];

    result.messages.forEach(message => {
      bugs.push({
        error_name: message.ruleId,
        folder_or_file_name: `${folderName}/${fileName}`,
        pathname: filePath,
        line_number: message.line,
      });
    });
  }
});

fs.writeFileSync('bugs.json', JSON.stringify(bugs, null, 2));