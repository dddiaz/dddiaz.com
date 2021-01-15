---
# Documentation: https://sourcethemes.com/academic/docs/managing-content/

title: "Glucose Sound"
subtitle: "I wonder what a days worth of glucose readings sound like?"
summary: "I wonder what a days worth of glucose readings sound like?"
authors: []
tags: []
categories: []
date: 2021-01-14T23:34:47-08:00
lastmod: 2021-01-14T23:34:47-08:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

As a Type 1 Diabetic, I deal with blood glucose data all day in an attempt to manage my disease, but what do all those
data points actually "sound" like. This is my attempt to find out. :)

The first step was actually getting my blood glucose data. I did this using an opensource project called [nightscout](http://www.nightscout.info/).
Nightscout scrapes my continuous glucose monitor that I wear on my body, and gives me an easy-to-use API for my data.
Once I have a day's worth of glucose data, the challenge becomes how do I turn that into sound.
Initially I directly wrote glucose values to a wav file, but it sounded like complete junk. I eventually learned I needed
some sort of sinusoidal wave to hear anything like a tone that I was hoping for. I attempted to generate this sine wave
on my own and match it to the glucose value, but it just didn't sound right. I also tried messing with the data to
upsample it but this turned out to be more tricky than I originally expected. Eventually though, I found a python library that could
generate tones, and used the glucose data as input for that. 

You can see my whole adventure with this project in the gist I have attached below.
Also feel free to check out the code on my github here: https://github.com/dddiaz/glucose-sound

Also, you are probably wondering how the sound actually came out like... well here you go :)

<audio controls>
  <source src="glucose.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

It honestly might sound a little crazy, but the truth is, that's how Type 1 Diabetes can be! Anyways, hope you had fun
checking out this random project!

<script src="https://gist.github.com/dddiaz/3a3d384748937b1b0bce1404314a225f.js"></script>


#### BTW
Check me out on Twitter! I sometimes post about Type 1 Diabetes stuff on there!
{{< tweet 1336552877570084864 >}}
