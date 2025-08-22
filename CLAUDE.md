# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal blog/website built with Hugo static site generator using the HugoBlox (formerly Wowchemy Academic) theme. The site is deployed via GitHub Actions to AWS S3/CloudFront and serves content at dddiaz.com.

## Development Commands

### Local Development
```bash
# Start local development server with drafts
hugo server -D

# Start server without drafts
hugo server -w

# Build for production
hugo --gc --minify

# Check Hugo version
hugo version
```

### Content Creation
```bash
# Create a new blog post
hugo new --kind post post/my-post-name
cd content/post/my-post-name/

# Note: All posts must have an index.md file in their directory
```

### Build System
- **Build Tool**: Hugo (static site generator)
- **Theme Management**: Hugo Modules (Go-based dependency management)
- **Deployment**: GitHub Actions → AWS S3 + CloudFront
- **CDN Cache**: Automatically cleared on deployment

## Architecture

### Directory Structure
- `content/` - All site content (Markdown files)
  - `post/` - Blog posts (each in subdirectory with index.md)
  - `authors/admin/` - Author profile
- `config/_default/` - Hugo configuration files
  - `hugo.yaml` - Main Hugo config
  - `params.yaml` - Theme parameters
  - `menus.yaml` - Navigation structure
- `static/` - Static assets (images, JS, etc.)
- `layouts/` - Custom HTML template overrides
- `public/` - Generated site output (build artifact)

### Theme System
- Uses HugoBlox theme via Hugo Modules
- Theme dependencies defined in `go.mod`
- Custom overrides in `layouts/` directory
- Theme updates managed through Go module system

### Content Management
- Posts written in Markdown with YAML frontmatter
- Each post in separate directory with `index.md`
- Images stored alongside post content
- Supports Jupyter notebooks (converted to Markdown)

### Deployment
- GitHub Actions workflow triggers on commits
- Builds site with `hugo --gc --minify`
- Deploys to AWS S3 bucket
- Invalidates CloudFront cache
- Production URL: dddiaz.com, www.dddiaz.com, blog.dddiaz.com

## Configuration Notes
- Go version: 1.23.3
- Hugo version: 0.140.1+ (pinned in README)
- Theme: HugoBlox (Academic fork)
- Analytics: Google Analytics + Google Tag Manager configured
- SEO optimized for personal/professional site

## Development Tips
- Use GitHub Codespaces for easy development environment
- All posts require `featured.png` or `featured.jpg` image
- Theme customization via `layouts/` overrides, not direct theme modification
- Hugo modules handle theme dependencies - run `hugo mod tidy` if needed