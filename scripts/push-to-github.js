const fs = require('fs');
const path = require('path');

const OWNER = 'waqaskakhtar-ui';
const REPO = 'Ron';
const BRANCH = 'main';

// Run with: node scripts/push-to-github.js <GITHUB_TOKEN>
const token = process.argv[2] || process.env.GITHUB_TOKEN;

if (!token) {
  console.error('Error: GitHub token is required.');
  console.log('Usage: node scripts/push-to-github.js <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');

// Helper to list all files to upload
function getFiles(dir, base = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === '.git' || file === 'node_modules' || file === 'scripts') continue;
    const filePath = path.join(dir, file);
    const relPath = base ? `${base}/${file}` : file;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(filePath, relPath));
    } else {
      results.push({ relPath, fullPath: filePath });
    }
  }
  return results;
}

async function githubAPI(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Ron-Deployer'
  };
  if (body) headers['Content-Type'] = 'application/json';

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub API error [${res.status} ${res.statusText}] at ${endpoint}: ${errorText}`);
  }

  return res.json();
}

async function main() {
  console.log(`Starting push to https://github.com/${OWNER}/${REPO}...`);
  const files = getFiles(rootDir);
  console.log(`Found ${files.length} project files to commit.`);

  // 1. Create blobs for all files
  const treeItems = [];
  for (const f of files) {
    const content = fs.readFileSync(f.fullPath);
    const isBinary = f.relPath.endsWith('.png') || f.relPath.endsWith('.jpg') || f.relPath.endsWith('.ico');
    
    const blobData = await githubAPI('/git/blobs', 'POST', {
      content: content.toString(isBinary ? 'base64' : 'utf-8'),
      encoding: isBinary ? 'base64' : 'utf-8'
    });

    treeItems.push({
      path: f.relPath.replace(/\\/g, '/'),
      mode: '100644',
      type: 'blob',
      sha: blobData.sha
    });
    console.log(`Uploaded blob: ${f.relPath}`);
  }

  // 2. Create Tree
  console.log('Creating Git tree...');
  const tree = await githubAPI('/git/trees', 'POST', {
    tree: treeItems
  });
  console.log('Created tree SHA:', tree.sha);

  // 3. Create Commit
  console.log('Creating initial commit...');
  const commit = await githubAPI('/git/commits', 'POST', {
    message: 'Initial commit: Ron high-fashion custom phone cases storefront with full 3D customizer & GSAP physics',
    tree: tree.sha,
    parents: [] // Root commit
  });
  console.log('Created commit SHA:', commit.sha);

  // 4. Create or update reference refs/heads/main
  console.log(`Updating ref refs/heads/${BRANCH}...`);
  try {
    await githubAPI(`/git/refs/heads/${BRANCH}`, 'PATCH', {
      sha: commit.sha,
      force: true
    });
  } catch (err) {
    // If ref doesn't exist yet, create it
    await githubAPI('/git/refs', 'POST', {
      ref: `refs/heads/${BRANCH}`,
      sha: commit.sha
    });
  }

  console.log('Successfully pushed all files to GitHub!');
  console.log(`Repository is live at: https://github.com/${OWNER}/${REPO}`);
}

main().catch(err => {
  console.error('Push failed:', err.message);
  process.exit(1);
});
