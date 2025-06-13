const fs = require('fs');
const path = require('path');

// Define size thresholds
const WARNING_SIZE = 50 * 1024 * 1024; // 50MB
const ERROR_SIZE = 100 * 1024 * 1024;  // 100MB (GitHub's limit)

// Directories to skip
const IGNORE_DIRS = [
  'node_modules',
  '.next',
  'out',
  '.git'
];

// File extensions to check (empty array means check all files)
const CHECK_EXTENSIONS = [];

// Keep track of total size
let totalSize = 0;
const largeFiles = [];

function formatSize(bytes) {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function checkDirectory(directory) {
  try {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);
      
      // Skip ignored directories
      if (stats.isDirectory()) {
        if (!IGNORE_DIRS.includes(item)) {
          checkDirectory(itemPath);
        }
        continue;
      }
      
      // Check if we should check this file extension
      const ext = path.extname(item).toLowerCase();
      if (CHECK_EXTENSIONS.length > 0 && !CHECK_EXTENSIONS.includes(ext)) {
        continue;
      }
      
      // Check file size
      const fileSize = stats.size;
      totalSize += fileSize;
      
      if (fileSize > WARNING_SIZE) {
        largeFiles.push({
          path: itemPath,
          size: fileSize,
          formattedSize: formatSize(fileSize),
          exceedsLimit: fileSize > ERROR_SIZE
        });
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error);
  }
}

// Start checking from current directory
console.log('Checking for large files...');
checkDirectory('.');

// Sort large files by size (largest first)
largeFiles.sort((a, b) => b.size - a.size);

// Print results
console.log('\nLarge files found:');
if (largeFiles.length === 0) {
  console.log('No large files found!');
} else {
  for (const file of largeFiles) {
    console.log(
      `${file.exceedsLimit ? '❌' : '⚠️'} ${file.path} (${file.formattedSize})${
        file.exceedsLimit ? ' - EXCEEDS GITHUB LIMIT' : ''
      }`
    );
  }
}

console.log(`\nTotal repository size: ${formatSize(totalSize)}`);
if (totalSize > 1024 * 1024 * 1024) {
  console.log('❌ WARNING: Repository exceeds GitHub\'s recommended 1GB limit');
} else {
  console.log('✅ Repository size is within GitHub\'s recommended limit');
}

console.log('\nGitHub Limits:');
console.log('- Individual files: 100MB maximum');
console.log('- Repository size: 1GB recommended maximum');
console.log('- GitHub Pages published site: 1GB maximum'); 