# Deployment Guide

This project supports automatic deployment to FTP hosting via GitHub Actions.

## Automatic Deployment (GitHub Actions)

When you push code to the `main` branch, GitHub Actions will automatically:
1. Build the project
2. Deploy to your FTP server

### Setup GitHub Secrets

You need to add the following secrets to your GitHub repository:

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:

| Secret Name | Value | Description |
|------------|-------|-------------|
| `FTP_HOST` | `46.202.161.117` | FTP server hostname |
| `FTP_USERNAME` | `u386088295.newhaus.in` | FTP username |
| `FTP_PASSWORD` | `Newhaus@826991` | FTP password |
| `FTP_PORT` | `21` | FTP port |

### How It Works

1. Push your changes to the `main` branch
2. GitHub Actions automatically triggers
3. The workflow builds your project
4. Files are uploaded to `/public_html/` on your FTP server

You can check the deployment status in the **Actions** tab of your GitHub repository.

## Manual Deployment

If you want to deploy manually, you can use:

```bash
npm run deploy
```

This will:
1. Build the project
2. Upload all files from `dist/` to your FTP server

## FTP Configuration

- **Host**: 46.202.161.117
- **Username**: u386088295.newhaus.in
- **Password**: Newhaus@826991
- **Port**: 21
- **Remote Directory**: /public_html/

