# Web
This is an attempt to update the Academic Theme. 
It is non compatible with my version.

This is a submodule within the dddiaz.com repository.  
Originally forked from the Academic repo.

# How to checkout
#### TODO: add this to build
git submodule add https://github.com/dddiaz/academic-kickstart web
git submodule update --init --recursive

# First Time Setup:
- Update web/config/_default/params.toml to control top level config.
- content/home/ to turn off and on widgets
    - customize position with weight
- update config.toml with website title

## To update theme colors:
- Copy themes/academic/data/themes/minimal.toml to data/themes/my_theme.toml
- Tell Academic to use your new theme by setting theme = "my_theme" in config/_default/params.toml

# To create a new blog post
```text
cd <MY_WEBSITE_FOLDER>
hugo new  --kind post post/my-post
cd <MY_WEBSITE_FOLDER>/content/post/my-post/
```
Note: if you create a page manually, make sure md page is called index.md

# To create a new jupyter notebook blog post
```text
 jupyter nbconvert notebook.ipynb --to markdown --NbConvertApp.output_files_dir=.  
# copy files over to blog post folder
# append notebook.md to blog post
```

# TO Run:
brew install hugo
hugo server -w
    
# TODO:
- Update google analytics config in params.toml
- update build to update submodules
- update base url in config.toml
- rename repo from academic to frontend on github
- update all params in parms.toml
- limit number of projects shown
- nav bar hover highlight color is dull
- verify analytics are working correctly, if not, production env var may not be set. 
- blog post for aws image is misaligned
- set up default blog post template
- Need to figure out a way to get name under photo!
- way to make bg icon smaller? scale down?
- during build process, pull academic sub git repo only at specific revision!
- document lcoal dev, how to pull the version of academic i need
- migrate certain projects into blog posts (ex: finding hidden messages)

# TODO: <DONE>:
- i think the color of the icons is too blue, make it match my old website (config/_default/params.toml)
- update blog posts images
- remove some of the share icons on blog posts
- missing my name under my picture
- Fix saturation on photo (custom css saturation filter)

# TODO: <Wont Do>:
- Update font?
- add resume pdf to content/authors/admin/index
- move more posts link up right under recent posts header




#### Dev Note:
The main reason i went through the trouble of upgrading from the old academic theme, is that i had made some custom changes to the theme that made it hard to keep up to date with new releases, this avoids that.
