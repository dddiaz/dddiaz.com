---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

sections:
  - block: hero
    content:
      title: "Hi There!"
      text: |-
        My name is Daniel, and I am a Bioinformatics Software Engineer living in SoCal.
    headless: true
    design:
      background:
        image:
          # Name of image in `assets/media/`.
          filename: header-bg-compressed.jpg
          # Apply image filters?
          filters:
            # Darken the image? Range 0-1 where 1 is transparent and 0 is opaque.
            brightness: 0.9
          #  Image fit. Options are `cover` (default), `contain`, or `actual` size.
          size: cover
          # Image focal point. Options include `left`, `center` (default), or `right`.
          position: center
          # Use a fun parallax-like fixed background effect on desktop? true/false
          parallax: false
          # Text color (true=light, false=dark, or remove for the dynamic theme color).
          text_color_light: true
  - block: about.biography
    id: about
    content:
      title: About Me
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
  - block: collection
    id: featured
    content:
      title: Featured Posts
      filters:
        folders:
          - post
        featured_only: true
    design:
      columns: '2'
      view: card
  - block: collection
    id: posts
    content:
      title: Recent Posts
      subtitle: ''
      text: ''
      # Choose how many pages you would like to display (0 = all pages)
      count: 10
      # Filter on criteria
      filters:
        folders:
          - post
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: compact
      columns: '2'
  - block: features
    id: glucose
    content:
      title: Blood Glucose Stats
#    design:
#      background:
#        gradient_end: '#1976d2'
#        gradient_start: '#004ba0'
#        text_color_light: true
  - block: accomplishments
    id: accomplishments
    content:
      # Note: `&shy;` is used to add a 'soft' hyphen in a long heading.
      title: 'Accomplish&shy;ments'
      subtitle:  and Certifications
      # Date format: https://docs.hugoblox.com/customization/#date-format
      date_format: Jan 2006
      # Accomplishments.
      #   Add/remove as many `item` blocks below as you like.
      #   `title`, `organization`, and `date_start` are the required parameters.
      #   Leave other parameters empty if not required.
      #   Begin multi-line descriptions with YAML's `|2-` multi-line prefix.
      items:
        - organization: "University of California, San Diego Extension"
          organization_url: "https://extension.ucsd.edu/"
          title: "Machine Learning Methods"
          url: "https://extension.ucsd.edu/courses-and-programs/machine-learning-methods"
          # certificate_url = "https://extension.ucsd.edu/courses-and-programs/machine-learning-fundamentals"
          date_start: "2020-12-09"
          date_end: ""
          description: ""
        - organization: "Amazon Web Services"
          organization_url: ""
          title: "AWS Certified Solutions Architect - Professional"
          url: "https://aws.amazon.com/training/path-architecting/"
          certificate_url: "https://www.certmetrics.com/amazon/public/badge.aspx?i=4&t=c&d=2019-07-02&ci=AWS00682148"
          date_start: "2019-07-01"
          date_end: ""
          description: ""
        - organization: "Amazon Web Services"
          organization_url: ""
          title: "AWS Certified Solutions Architect - Associate"
          url: "https://aws.amazon.com/training/path-architecting/"
          certificate_url: "https://www.certmetrics.com/amazon/public/badge.aspx?i=1&t=c&d=2018-12-31&ci=AWS00682148"
          date_start: "2018-12-01"
          date_end: ""
          description: ""
        - organization: "Coursera"
          organization_url: "https://www.coursera.com"
          title: "Finding Hidden Messages in DNA (Bioinformatics I) (with Honors) "
          url: "https://www.coursera.org/learn/dna-analysis"
          certificate_url: "https://www.coursera.org/account/accomplishments/records/QN5QZ9YMPCE7"
          date_start: "2018-12-01"
          date_end: ""
          description: ""
    design:
      columns: '2'
  - block: tag_cloud
    content:
      title: Popular Topics
    design:
      columns: '2'
  - block: contact
    id: contact
    content:
      title: Contact
      subtitle: "Let's work together to accomplish something great!"
      text: |-
        <div style="text-align: center; margin-bottom: 2rem;">
          <img src="/img/contact.jpg" alt="Daniel Diaz" style="border-radius: 12px; max-width: 600px; width: 100%; height: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        </div>
      # Contact (add or remove contact options as necessary)
      # email: test@example.org
      # phone: 888 888 88 88
      # appointment_url: 'https://calendly.com'
      directions: Based in San Diego, California
      # Choose a map provider in `params.yaml` to show a map from these coordinates
      # coordinates:
      #   latitude: '32.870338'
      #   longitude: '-117.200440'  
      contact_links:
        - icon: linkedin
          icon_pack: fab
          name: "Connect With Me"
          link: "https://www.linkedin.com/in/dddiaz/"
        - icon: at
          icon_pack: fas
          name: "BlueSky Me"
          link: "https://bsky.app/profile/dddiaz.com"
        - icon: github
          icon_pack: fab
          name: "Follow Me"
          link: "https://github.com/dddiaz"
      # Automatically link email and phone or display as text?
      autolink: false
      # Email form provider
      #      form:
      #        provider: netlify
      #        formspree:
      #          id:
      #        netlify:
      #          # Enable CAPTCHA challenge to reduce spam?
      #          captcha: false
    design:
      columns: '2'
---
