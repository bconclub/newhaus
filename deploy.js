import { createReadStream, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { Client } from 'basic-ftp';
import { execSync } from 'child_process';

const FTP_CONFIG = {
  host: '46.202.161.117',
  user: 'u386088295.newhaus.in',
  password: 'Newhaus@826991',
  port: 21,
  secure: false
};

const REMOTE_DIR = '/public_html';
const LOCAL_DIR = './dist';

async function deploy() {
  console.log('🚀 Starting deployment...\n');

  // Step 1: Build the project
  console.log('📦 Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }

  // Step 2: Connect to FTP and upload files
  const client = new Client();
  
  try {
    console.log('🔌 Connecting to FTP server...');
    await client.access(FTP_CONFIG);
    console.log('✅ Connected to FTP server!\n');

    // Change to remote directory
    await client.ensureDir(REMOTE_DIR);
    await client.cd(REMOTE_DIR);
    console.log(`📁 Changed to remote directory: ${REMOTE_DIR}\n`);

    // Upload all files from dist directory
    console.log('📤 Uploading files...');
    await uploadDirectory(client, LOCAL_DIR, REMOTE_DIR);
    
    console.log('\n✅ Deployment completed successfully!');
    console.log('🌐 Your site should be live now!');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

async function uploadDirectory(client, localPath, remotePath) {
  const files = readdirSync(localPath);
  
  for (const file of files) {
    const localFilePath = join(localPath, file);
    const stat = statSync(localFilePath);
    
    if (stat.isDirectory()) {
      // Create directory on FTP and recurse
      const remoteDirPath = join(remotePath, file).replace(/\\/g, '/');
      await client.ensureDir(remoteDirPath);
      await uploadDirectory(client, localFilePath, remoteDirPath);
    } else {
      // Upload file
      const remoteFilePath = join(remotePath, file).replace(/\\/g, '/');
      const relativePath = relative(LOCAL_DIR, localFilePath);
      console.log(`  📄 Uploading: ${relativePath}`);
      
      await client.uploadFrom(localFilePath, remoteFilePath);
    }
  }
}

// Run deployment
deploy().catch(console.error);

