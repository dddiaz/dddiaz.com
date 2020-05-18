---
title: "About This Website"
summary: "A blog post describing how this website was built and deployed (CI/CD AWS Microservice)"
date: 2018-04-09
lastmod: 2018-04-09
draft: false

tags: ["about", "site", "how-it-works", "CI", "CD", "AWS", "Microservice", "Python"]

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Placement options: 1 = Full column width, 2 = Out-set, 3 = Screen-width
# Focal point options: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight
image:
  placement: 2
  caption: 'Image credit: Daniel Diaz'
  focal_point: "Smart"
  preview_only: false

---

This site uses aws code pipeline to continuously deploy changes commited to the github repo. 

Check out my buildspec.yml which handles deploying my static front end and microservice.

```yml
version: 0.2

phases:
  install:
    commands:

      # Upgrade AWS CLI to the latest version
      - pip install --upgrade awscli
      
      # Download and install HUGO
      - curl -Ls https://github.com/gohugoio/hugo/releases/download/v0.38/hugo_0.38_Linux-64bit.tar.gz -o /tmp/hugo.tar.gz
      - tar xf /tmp/hugo.tar.gz -C /tmp
      - ls /tmp/
      - mv /tmp/hugo /usr/bin/hugo
      - rm -rf /tmp/hugo*

  pre_build:
    commands:

      # Discover and run unit tests in the 'tests' directory. For more information, see <https://docs.python.org/3/library/unittest.html#test-discovery>
      - python -m unittest discover tests
  
  build:
    commands:

      # Build Hugo Frontend
      - cd frontend
      - hugo
      - cd ../

      # Use AWS SAM to package the application by using AWS CloudFormation
      - aws cloudformation package --template template.yml --s3-bucket $S3_BUCKET --output-template template-export.yml

  post_build:
    commands:
      # Make sure your codestarworker for dddiaz.com (codebuild) has read,write,list permissions for the website s3 bucket
      - aws s3 sync frontend/public s3://dddiaz.com

artifacts:
  type: zip
  files:
    - template-export.yml
```

