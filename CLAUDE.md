# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a personal blog/website built with Hugo static site generator using a custom minimal theme (`themes/dddiaz/`). The site is deployed via GitHub Actions to AWS S3/CloudFront and serves content at dddiaz.com.

## Development Commands

### Local Development
```bash
# Start local development server with drafts
hugo server -D

# Start server without drafts
hugo server -w

# Build for production
hugo --gc --minify

# Build with CI-level strictness
hugo --gc --minify --panicOnWarning

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
- **Theme**: Custom minimal theme at `themes/dddiaz/` (no external dependencies)
- **Deployment**: GitHub Actions → AWS S3 + CloudFront
- **CDN Cache**: Automatically cleared on deployment

## Architecture

### Directory Structure
- `content/` - All site content (Markdown files)
  - `post/` - Blog posts (each in subdirectory with index.md)
  - `project/` - Project pages
  - `authors/admin/` - Author profile
- `config/_default/` - Hugo configuration files
  - `hugo.yaml` - Main Hugo config
  - `params.yaml` - Theme parameters (SEO, analytics, footer)
  - `menus.yaml` - Navigation structure
  - `module.yaml` - Single import: `path: dddiaz`
- `themes/dddiaz/` - Custom minimal theme (see Theme Architecture below)
- `static/` - Static assets (images, JS, `_headers`, `_redirects`)
- `public/` - Generated site output (build artifact)

### Theme Architecture (`themes/dddiaz/`)
```
themes/dddiaz/
  theme.toml
  layouts/
    _default/
      baseof.html           # HTML shell, head/header/footer partials, theme.js, bg.js
      single.html           # Blog post: title, date, reading time, tags, content, related posts
      list.html             # Post archive + tag/category pages with pagination
    landing/
      list.html             # Homepage: iterates sections array from _index.md, dispatches to block partials
    404.html                # Custom 404 page
    shortcodes/
      video.html            # Video shortcode (used by some posts)
    partials/
      head.html             # <head>: meta, CSS (Hugo Pipes), SEO, analytics, theme-color
      header.html           # <nav> with site title, menu links, dark/light toggle (inline SVG)
      footer.html           # Copyright
      seo/
        meta.html           # OG tags, Twitter card, canonical URL
        jsonld-website.html # Schema.org Website (homepage)
        jsonld-article.html # Schema.org BlogPosting (posts)
        analytics.html      # GA4 (production only)
      blocks/
        hero.html           # Background image hero with text overlay
        about.html          # Two-column: avatar/bio/interests/education
        collection.html     # Featured (card) + Recent (compact) posts
        glucose.html        # SVG donut glucose widget (CI tests check this)
        features.html       # Alias → glucose.html
        projects.html       # Project cards grid
        accomplishments.html
        tag-cloud.html      # Logarithmic font-size tag cloud
        contact.html        # Location, social links, contact image
      icons/                # Inline SVG icons (~8 files)
  assets/
    css/
      main.css              # Custom properties, reset, typography, all components
      chroma-light.css      # Syntax highlighting (light theme)
      chroma-dark.css       # Syntax highlighting (dark theme)
    js/
      theme.js              # Dark/light toggle, localStorage, prefers-color-scheme
```

### Homepage Block System
The homepage (`content/_index.md`) uses `type: landing` with a `sections` array. Each section has a `block` type that maps to a partial in `themes/dddiaz/layouts/partials/blocks/`. Block type aliases:
- `about.biography` → `about`
- `portfolio` → `projects`
- `tag_cloud` → `tag-cloud`
- `features` → `glucose` (alias partial)

### Key Files
- **Glucose widget**: `themes/dddiaz/layouts/partials/blocks/glucose.html` + `static/js/bg.js`
  - CI tests verify: `id=glucose`, `id=glucose-text`, `Blood Glucose Stats` text, `<script src=/js/bg.js></script>`
- **Dark mode**: CSS custom properties via `[data-theme="dark"]`, toggle in `theme.js`
- **Security headers**: `static/_headers` (static file, not generated)
- **SEO**: JSON-LD structured data, OG tags, Twitter cards, canonical URLs

### Styling
- No CSS framework — custom CSS with CSS custom properties, Grid, Flexbox
- System font stack (zero external font requests)
- Inline SVG icons (no FontAwesome)
- Dark mode via `data-theme` attribute + `prefers-color-scheme` default

### Content Management
- Posts written in Markdown with YAML frontmatter
- Each post in separate directory with `index.md`
- Images stored alongside post content
- Shortcodes used: `video`, `youtube` (built-in)

### Deployment
- GitHub Actions workflow triggers on commits to master
- Builds site with `hugo --gc --minify --panicOnWarning`
- Runs integration tests (critical files, glucose widget, SEO, security headers)
- Deploys to AWS S3 bucket
- Invalidates CloudFront cache
- Runs post-deployment tests on live site
- Production URL: dddiaz.com, www.dddiaz.com, blog.dddiaz.com

### Deployment Workflow (for Claude Code)
When making changes that need to be deployed:
1. **Commit changes**: Use standard git commit workflow
2. **Push to repo**: Push commits to GitHub (triggers automatic deployment)
3. **Monitor deployment**: Use `gh workflow list` and `gh run view` to check GitHub Actions status
4. **No manual build needed**: CI/CD handles build and deployment automatically

## Configuration Notes
- Hugo version: 0.152.2+ extended (pinned in CI/CD)
- Theme: Custom `dddiaz` theme (164KB total, down from 3.2MB HugoBlox)
- No Go dependencies required (theme is fully local)
- Analytics: Google Analytics GA4 (production only)
- Build performance: ~65ms

## Development Tips
- All posts require `featured.png` or `featured.jpg` image
- Edit theme directly in `themes/dddiaz/` — no separate override layer needed
- CSS changes go in `themes/dddiaz/assets/css/main.css`
- New homepage sections: add block partial + entry in `content/_index.md` sections array
- To regenerate syntax highlight CSS: `hugo gen chromastyles --style=github > themes/dddiaz/assets/css/chroma-light.css`
