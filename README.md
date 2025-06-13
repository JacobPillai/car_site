# Car Website

A modern Next.js-based car listing website with features like search history, saved cars, notifications, and privacy controls.

## Hosting on GitHub Pages

This project is configured to be hosted on GitHub Pages. The deployment is automated using GitHub Actions.

### Setup Instructions

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and create a new repository named `car_site`
   - Do not initialize it with a README, .gitignore, or license

2. **Push Your Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/car_site.git
   git push -u origin main
   ```

3. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source
   - The automated workflow will build and deploy your site

4. **Access Your Website**
   - Once deployed, your website will be available at:
   - `https://YOUR_USERNAME.github.io/car_site/`

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   cd car_website
   npm run dev
   ```

3. **Build for production**
   ```bash
   cd car_website
   npm run build
   ```

## Features

- Car listings with search and filtering
- User authentication (UI components)
- Saved cars functionality
- Search history tracking
- Notification system
- Privacy controls
- Click-to-call functionality
- Smooth page transitions
- EmailJS integration for form submissions

## Managing Large Files for GitHub Pages

This repository contains image assets for the car listings. To ensure compatibility with GitHub's file size limits, consider the following:

### 1. Check for Large Files

Run the provided script to identify large files:

```bash
node scripts/check-large-files.js
```

### 2. Optimize Images

If large image files are detected:

```bash
# Install a tool like ImageMagick
npm install -g imagemagick

# Batch optimize images
# Example (requires ImageMagick):
magick mogrify -resize 1200x800\> -quality 80 car_website/public/cars/*.jpg
```

### 3. Use Git LFS for Large Files (Optional)

For persistent large files, consider Git LFS:

```bash
# Install Git LFS
git lfs install

# Track large file types
git lfs track "*.jpg" "*.png" "*.webp"

# Add .gitattributes to track these configurations
git add .gitattributes

# Add and commit as usual
git add .
git commit -m "Added Git LFS tracking for images"
```

### 4. External Asset Hosting (Alternative)

For very large assets, consider:
- Amazon S3
- Cloudinary
- Imgix

Update your Next.js configuration to reference the external URLs.

## Troubleshooting GitHub Pages Deployment

If you encounter issues with your GitHub Pages deployment, try these solutions:

### 1. Missing Assets or Broken Links

If your site deploys but assets are missing or links are broken:

- Check that `basePath` in `next.config.js` matches your repository name exactly
- Make sure all internal links use relative paths or include the basePath
- Verify that image paths are correct when using the `basePath` configuration

### 2. Build Failures

If the GitHub Actions workflow fails:

- Check the workflow logs in the Actions tab of your repository
- Ensure all dependencies are properly listed in package.json
- Verify that the build command succeeds locally with `npm run build`

### 3. Blank Page or 404 Errors

If you see a blank page or 404 errors:

- Check that the `output: 'export'` option is set in `next.config.js`
- Verify that the GitHub Pages source is set to GitHub Actions
- Ensure the workflow YAML file is correctly placed in `.github/workflows/`

### 4. Custom Domain Issues

If using a custom domain:

- Add a CNAME file to the `/public` folder with your domain name
- Ensure DNS settings are correctly configured with your domain provider
- Allow time for DNS changes to propagate (up to 48 hours)

## License

MIT 