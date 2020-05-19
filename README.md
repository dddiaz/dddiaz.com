![CD](https://github.com/dddiaz/frontend.dddiaz.com/workflows/CD/badge.svg)

# Web
This represents the frontend static website of dddiaz.com. Deployed to s3/cloudfront with Github Actions :)

## Suported URLS:
[www.dddiaz.com](https://www.dddiaz.com)  
[dddiaz.com](https://dddiaz.com)  
[blog.dddiaz.com](https://blog.dddiaz.com)  
[api.dddiaz.com](https://api.dddiaz.com) *Note: API must be accessed with https*  

#### Other Info
Previously, this wesbite was based on a super old version of hugo/academic that was extremely hard to update.
This is an attempt to change that.

This is a submodule within the dddiaz.com repository.  
Originally forked from the Academic repo.

# How to checkout
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

Note: if you are having issues with the submodule saying " Direct fetching of that commit failed.", 
do git submodule init then git submodule update --remote on the repo, then commit the change.
Also note, my submodule is on commit d0552aefc03a9ea8efd22ea8ab54842fb32ccd02

# First Time Setup:
- Update web/config/_default/params.toml to control top level config.
- content/home/ to turn off and on widgets
    - customize position with weight
- update config.toml with website title

## To update theme colors:
- Copy themes/academic/data/themes/minimal.toml to data/themes/my_theme.toml
- Tell Academic to use your new theme by setting theme = "my_theme" in config/_default/params.toml

# To create a new blog post
```bash
cd <MY_WEBSITE_FOLDER>
hugo new  --kind post post/my-post
cd <MY_WEBSITE_FOLDER>/content/post/my-post/
```
Note: if you create a page manually, make sure md page is called index.md

# To create a new jupyter notebook blog post
```bash
 jupyter nbconvert notebook.ipynb --to markdown --NbConvertApp.output_files_dir=.  
# copy files over to blog post folder
# append notebook.md to blog post
```

# To Run:
```bash
brew install hugo
hugo server -w
```
Note I am using Hugo version v0.70.0

# How to make changes to prod
Easy -> git commit and Github Actions handles the rest :)
    
# TODO:
- Update google analytics config in params.toml
    - verify analytics are working correctly, if not, production env var may not be set. 
- update all params in parms.toml
    - update base url in config.toml
- rename git repo from academic to frontend.dddiaz on github
- set up default blog post template
- way to make bg icon smaller? scale down?
- during build process, pull academic sub git repo only at specific revision!
    - update build to update submodules
- Set up form spree
- set up github workflow?
    - limit aws account access for s3
- add this https://github.com/marketplace/actions/bump-git-submodules to bump submodules on comment
- blogpost about github actions

# TODO:
## Done
- i think the color of the icons is too blue, make it match my old website (config/_default/params.toml)
- update blog posts images
- remove some of the share icons on blog posts
- missing my name under my picture
- Fix saturation on photo (custom css saturation filter)
- migrate certain projects into blog posts (ex: finding hidden messages)
- added covid project post
- document lcoal dev, how to pull the version of academic i need
- document hugo and academic version



# TODO:
## Wont Do
- Update font?
- add resume pdf to content/authors/admin/index
- move more posts link up right under recent posts header
- nav bar hover highlight color is dull (made the site default with home highlighted)
- blog post for aws image is misaligned (no longer featured on main page, so non issue) 
- limit number of projects shown

#### Dev Note:
The main reason i went through the trouble of upgrading from the old academic theme, 
is that i had made some custom changes to the theme that made it hard to keep up to date with new releases, 
this avoids that.
