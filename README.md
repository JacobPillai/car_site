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
   - Select "GitHub Actions" as the source
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

## Notes on File Size

This repository contains a significant amount of image assets for the car listings. If you encounter issues with GitHub's file size limits (100MB per file, 1GB per repository), consider:

1. Using Git LFS for large files
2. Optimizing images further
3. Hosting larger assets on an external service

## License

MIT 