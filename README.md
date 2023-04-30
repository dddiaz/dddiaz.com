![CD](https://github.com/dddiaz/frontend.dddiaz.com/workflows/CD/badge.svg)

# Web
This represents the frontend static website of dddiaz.com.  
Deployed to s3/cloudfront with Github Actions :)

## Suported URLS:
[www.dddiaz.com](https://www.dddiaz.com)  
[dddiaz.com](https://dddiaz.com)  
[blog.dddiaz.com](https://blog.dddiaz.com)  
[https://api.dddiaz.com/birthday](https://api.dddiaz.com/birthday) *Note: API must be accessed with https*  

#### Background

This is a static site built with [hugo](https://gohugo.io/). It is extremely easy to write pages in markdown, 
then deploy the website with a simple git commit. Github actions handles the deployment to s3, and cloudfront, as 
well as the cloudfront cache clear. 

This repo was originally forked from the Academic repo. It is purposely kept as a fork to hopefully make it easier to 
incorporate future updates to the theme.

# How to use (the easy way):
Use Github codespaces.
It will automaticalyl run a container with all the needed deps installed.
Simply follow the first run instructions on the shell, and you are all set.

# How to use (the hard way):
#### Note this proj uses git submodules for the academic theme: helpful doc [here](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
```bash
git clone https://github.com/dddiaz/frontend.dddiaz.com
git submodule init
git submodule update
```
or 
```bash
git clone --recurse-submodules https://github.com/dddiaz/frontend.dddiaz.com

```
Follow the link above on updating the submodule with new changes

Note: if you are having issues with the submodule saying " Direct fetching of that commit failed.", do 
```bash
git submodule init
git submodule update --remote
```
on the repo, then commit the change.

#### Dev Note
My submodule is on commit: d0552aefc03a9ea8efd22ea8ab54842fb32ccd02

#### To revert a submodule change
CD into submodule dir
then do a git checkout

# Misc Notes:
## First Time Setup:
- Update web/config/_default/params.toml to control top level config.
- content/home/ to turn off and on widgets
    - customize position with weight
- update config.toml with website title

## To update theme colors:
- Copy themes/academic/data/themes/minimal.toml to data/themes/my_theme.toml
- Tell Academic to use your new theme by setting theme = "my_theme" in config/_default/params.toml

## To create a new blog post
```bash
# From root of project
hugo new  --kind post post/my-post
cd post/my-post/
```
Note: if you create a page manually, make sure md page is called index.md

## To create a new jupyter notebook blog post
```bash
 jupyter nbconvert notebook.ipynb --to markdown --NbConvertApp.output_files_dir=.  
# copy files over to blog post folder
# append notebook.md to blog post
```

## To Run Locally:
```bash
brew install hugo
hugo server -w
```
Note I am using Hugo version v0.70.0

# How to make changes to prod
Easy -> git commit and Github Actions handles the rest :)
    
# TODO:
- set up default blog post template
- way to make bg icon smaller? scale down?

# Done:
- Scaled down deployment permissions


#### Common Issues
```text
Error: Error building site: "/Users/ddiaz/src/dddiaz.com/content/home/demo.md:69:1": failed to extract shortcode: template for shortcode "alert" not found
```
You forgot to update the git submodule. Do That.
```bash
git submodule init
git submodule update
```

