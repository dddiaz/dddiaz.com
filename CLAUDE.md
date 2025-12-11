# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Personal blog/website built with Hugo static site generator using the HugoBlox theme (formerly Wowchemy Academic). Deployed via GitHub Actions to AWS S3/CloudFront, serving dddiaz.com, www.dddiaz.com, and blog.dddiaz.com.

## Development Commands

### Local Development
```bash
# Start server with drafts (also installs Hugo modules)
hugo server -D

# Start server without drafts
hugo server -w

# Check Hugo version
hugo version
```

### Content Creation
```bash
# Create new blog post (creates directory with index.md)
hugo new --kind post post/my-post-name
cd content/post/my-post-name/

# IMPORTANT: All posts must have index.md in their own directory
# Posts require featured.png or featured.jpg image
```

### Build and Deploy
```bash
# Production build (used by CI/CD)
hugo --gc --minify

# GitHub Actions handles deployment automatically on commits to master
# Workflow ignores: CLAUDE.md, README.md, .gitignore, LICENSE.md, .github/**
```

## Architecture

### Hugo Module System
- Theme managed via Go Modules (not git submodules)
- Dependencies in `go.mod` and `config/_default/module.yaml`
- Modules imported: blox-bootstrap/v5, blox-plugin-netlify, blox-plugin-reveal, blox-seo
- Update modules: `hugo mod tidy` or `hugo mod get -u`

### Configuration Files
- `config/_default/hugo.yaml` - Core Hugo config
- `config/_default/params.yaml` - Theme settings, SEO, analytics (GA + GTM)
- `config/_default/menus.yaml` - Navigation
- `config/_default/module.yaml` - Hugo module imports
- `netlify.toml` - Legacy Netlify config (not actively used for deployment)

### Content Structure
- `content/post/` - Blog posts, each in subdirectory with `index.md`
- `content/authors/admin/` - Author profile
- `content/_index.md` - Homepage content
- Blog post frontmatter: YAML with title, date, tags, featured image settings
- Jupyter notebooks supported (see HugoBlox docs)

### Theme Customization
- Custom HTML overrides: `layouts/partials/` (e.g., hooks/head-end, hooks/body-end)
- Custom blocks: `layouts/partials/blocks/`
- NEVER modify theme files directly - always use layout overrides

### Deployment Pipeline
GitHub Actions workflow (`.github/workflows/main.yml`):
1. Triggers on commits to master (with path exclusions)
2. Uses Hugo 0.140.1 extended
3. Runs `hugo --gc --minify`
4. Syncs `public/` to S3 bucket dddiaz.com
5. Invalidates CloudFront cache (distribution E15F5SGXIT0KSW)

### Environment Setup
- **Local**: macOS, Go 1.25, Hugo 0.140.1+extended
- **GitHub Codespaces**: Configured via `.devcontainer/` with Hugo 0.140.1 extended
- Server runs on port 1313 (expose this port in Codespaces)

## Common Issues
- **Permission errors on public/ fonts**: Clear `public/` directory (fonts written as readonly)
- **DevContainer fails on Mac**: Pull `mcr.microsoft.com/devcontainers/universal:2-linux` with `--platform linux/amd64`, ensure Rosetta is configured
