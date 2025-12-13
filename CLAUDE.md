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
- **Theme Management**: Local theme files (no remote dependencies)
- **Deployment**: GitHub Actions → AWS S3 + CloudFront
- **CDN Cache**: Automatically cleared on deployment

## Architecture

### Directory Structure
- `content/` - All site content (Markdown files)
  - `post/` - Blog posts (each in subdirectory with index.md)
  - `authors/admin/` - Author profile
- `config/_default/` - Hugo configuration files
  - `hugo.yaml` - Main Hugo config (includes output formats for headers/redirects)
  - `params.yaml` - Theme parameters
  - `menus.yaml` - Navigation structure
  - `module.yaml` - Local theme imports
- `themes/` - Local HugoBlox theme modules (5 modules)
- `static/` - Static assets (images, JS, etc.)
- `layouts/` - Custom HTML template overrides (glucose widget, theme-color)
- `public/` - Generated site output (build artifact)

### Local Theme System
- Theme files located in `themes/` directory as separate modules:
  - `themes/blox-bootstrap/` - Main theme (layouts, assets, styling)
  - `themes/blox-core/` - Core helper functions
  - `themes/blox-seo/` - SEO, analytics, structured data
  - `themes/blox-plugin-netlify/` - Security headers (_headers, _redirects)
  - `themes/blox-plugin-reveal/` - Reveal.js presentation support
- Modules imported via `config/_default/module.yaml` using local paths
- No Go modules or remote dependencies required
- Custom site overrides in `layouts/` directory take precedence over theme layouts
- Theme updates must be done manually by updating files in `themes/`

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

### Deployment Workflow (for Claude Code)
When making changes that need to be deployed:
1. **Commit changes**: Use standard git commit workflow
2. **Push to repo**: Push commits to GitHub (triggers automatic deployment)
3. **Monitor deployment**: Use `gh workflow list` and `gh run view` to check GitHub Actions status
4. **No manual build needed**: CI/CD handles `hugo --gc --minify` and deployment automatically

## Configuration Notes
- Hugo version: 0.152.2+ extended (pinned in README and CI/CD)
- Theme: HugoBlox (local copy, consolidated from 5 modules)
- No Go dependencies required (theme is fully local)
- Analytics: Google Analytics + Google Tag Manager configured
- SEO optimized for personal/professional site
- Security headers configured via blox-plugin-netlify module

## Development Tips
- Use GitHub Codespaces for easy development environment
- All posts require `featured.png` or `featured.jpg` image
- Theme customization via `layouts/` overrides, not direct theme modification
- Theme files in `themes/` can be edited directly for deeper customizations
- Build performance: ~11 seconds (5x faster than Hugo Modules)