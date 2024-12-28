![CD](https://github.com/dddiaz/frontend.dddiaz.com/workflows/CD/badge.svg)

# Web
This represents the frontend static website of dddiaz.com.  
Deployed to s3/cloudfront with Github Actions :)

## Suported URLS:
[www.dddiaz.com](https://www.dddiaz.com)  
[dddiaz.com](https://dddiaz.com)  
[blog.dddiaz.com](https://blog.dddiaz.com)  
[https://api.dddiaz.com/birthday](https://api.dddiaz.com/birthday) *Note: API must be accessed with https*  

## Pinned Version Info
GO: go version go1.23.3 darwin/arm64
Hugo: hugo v0.140.1+extended+withdeploy darwin/arm64 BuildDate=2024-12-23T16:26:35Z VendorInfo=brew
Academic Theme: stored in go.mod and go.sum

#### Background

This is a static site built with [hugo](https://gohugo.io/). It is extremely easy to write pages in markdown, 
then deploy the website with a simple git commit. Github actions handles the deployment to s3, and cloudfront, as 
well as the cloudfront cache clear. 

This repo was originally forked from the Academic repo. It is purposely kept as a fork to hopefully make it easier to 
incorporate future updates to the theme.

# How to use (the easy way):
Use Github Codespaces.
It will automatically run a container with all the needed deps installed.
Simply follow the first run instructions on the shell, and you are all set.

```bash
# Check version
hugo version 

# Note this will install the go submodules and build drafts
# to build without drafts use -w
hugo sever -D

# Create a new post
hugo new  --kind post post/my-post 
cd post/my-post/

# To see your site on github Codespaces, open the terminal and click the ports tab and add 1313.
```

# How to use locally (the harder way):
#### Note this proj uses Hugo Modules, based on Go Modules to manage the theme
Install Deps
```shell
brew install git golang hugo node
```

```bash
git clone https://github.com/dddiaz/dddiaz.com
```

Run Site
```shell
# Note this will also install the go submodules
hugo sever -D
```

# Misc Notes:
## First Time Setup:
- Update config tomls and content/_index.md for main website

## To override html:
- Use the layouts override descrived here: https://docs.hugoblox.com/reference/extend/

## To create a new blog post
```bash
# From root of project
hugo new  --kind post post/my-post
cd post/my-post/
```
Note: if you create a page manually, make sure md page is called index.md

## To create a new jupyter notebook blog post
https://docs.hugoblox.com/tutorial/blog/step-4/


## To Run Locally (without docker):
```bash
brew install hugo
hugo server -w
```
Note I am using Hugo version v0.70.0

# How to make changes to prod
Easy -> git commit and Github Actions handles the rest :)

# Theme version info
- go.mod
- module.yaml
    
# TODO:
- set up default blog post template
- way to make bg icon smaller? scale down?

#### Common Issues
1) Error: error copying static files: open /Users/danieldiaz/src/dddiaz.com/public/webfonts/fa-solid-900.ttf: permission denied
- clear public dir, for some reason fonts are being written as readonly
2) DevContainer Fails to come up on mac
- run: docker pull --platform linux/amd64 mcr.microsoft.com/devcontainers/universal:2-linux manually and make sure rosetta is setup.

# SITE MIGRATION TODO:
- update or hide policy/ terms pages - Done
- update ga code - verify working - in progess
- fix glucose widget - done
- update docker image builder - in progess, need to test on github
- update deployment with commands from netfly.toml - maybe not needed
- disable search if it doesnt work - looks like it works with a simple search
- check header links work correctly - done
- allow suggest github edits?
- submit site to search engines
- remove cloudfront cache clear
- check removing submodule doesnt cause build issue

