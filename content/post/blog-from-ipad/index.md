---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Updating my website from my iPad!"
subtitle: "With the help of github codespaces and dev containers."
summary: "How I am able to use github codespaces to develop and push updates to my website, from my iPad."
authors: []
tags: ["how-it-works", "website", "development", "github codespaces"]
categories: []
date: 2023-04-30T02:21:00Z
lastmod: 2023-04-30T02:21:00Z
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: "Screen shot of ipad with vscode and github codespaces."
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: ["dddiaz.com"]
---

# UPDATE: Hi HN!
Thanks for checking out my post. Feel free to find me on BlueSky: https://bsky.app/profile/dddiaz.com or on LinkedIn: https://www.linkedin.com/in/dddiaz/ .  
Also feel free to check out a post I am particularly proud of: https://dddiaz.com/post/my-t1d-variants/

# Hi There

It has been a while since I have posted on my blog, so I asked myself what's keeping me from posting?

Well I have been insanely busy in my new role at Illumina, but other than that, what's keeping me from posting? 

Well I have also been trying to work out more and spend more time outside, but other than that, what's keeping me from posting?

Well my sister just had her second baby (🥳) so I have been trying to focus more on uncle duties, but other than that, what's keeping me from posting?


I know what it is, it's the fact that I can't update my blog from my iPad! Yes... Thats it... the iPad factor.  

Happy to say, today that is fixed!

# Demo:

In this first video: I navigate to my blog repo on github.com then click open with CodeSpaces. 
If you have never heard of CodeSpaces it is a super nifty way to get an instant development environment in your browser!
This is perfect for my iPad usecase where I don't have a real terminal, but with CodeSpaces, I do!


{{< youtube Z6h4dGy0qzA >}}  
BTW: The link for codespaces is here: https://github.com/features/codespaces

In this next video: I show how you can even expose a port from your codespace, allowing you to see your code changes in real time in the browser.
Super Nifty.

{{< youtube hZ8M-b7pMfw >}}

# How is it done:

The hardest part was figuring out the dev container. The dev container defines your dev dependencies and sets up VS Code for you.
I had one main dependency I needed to worry about, which is Hugo, the static site generator I use. To set that up I do the following:

```json
{
    "build": {
        "dockerfile": "./Dockerfile",
        "context": "."
    },
    "features": {
        "ghcr.io/devcontainers/features/hugo:1": {
            "version": "0.70.0",
            "extended": true
        }
    }
}
```

You will notice, I am pulling from a local docker file, this is because the default microsoft dev image, which is great by the way, unfortunately has the latest version of hugo. I need my version pinned.
The docker image is a hack to remove the version of hugo installed, then use dev container features (https://code.visualstudio.com/blogs/2022/09/15/dev-container-features) to reinstall the hugo cli on my preferred version.

```dockerfile
FROM mcr.microsoft.com/devcontainers/universal:2-linux

# The base universal image installs the latest version of Hugo
# This causes an issue when I want to use my pinned version as a Dev Container Feature.
RUN rm -rf /usr/local/hugo
```

So after I make my change on my iPad, I can simply do "git commit" and my Github Workflow takes care of the rest! 
You can read about that here: https://dddiaz.com/post/github-actions/ 

# Verdict
Honestly, the dream has always been to have a one click development environment, for not just myself, but every team I have ever been on.
While this gets us closer to that goal, I have to admit Codespaces was not without its issues.
I often had problems where it crashed, or I couldn't reconnect to the development environment, or the port forwarding wouldn't work.
So while it is possible to write blogs from my iPad, and even this post was partially done on an iPad, I think I will stick with my local dev environment for now.

Regardless stay tuned! I have some other posts in the works that I am excited to publish (from my laptop hahaha.)

Also feel free to check out some other blogs I have, like where I convert a day's worth of Blood Sugar readings into music! https://dddiaz.com/post/glucose-sound/

