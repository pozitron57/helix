Hexo theme `helix`. Demo: lisakov.com

## Warning

This theme isn't suitable for hexo beginners.
You should understand structure of the theme folder.
You should be able to at least edit javascript code in `theme/layout/*.ejs` files.

No setup is available in
`theme/_config.yml`. Instead, edit `theme/layout/*.ejs` files. It is a less
convenient, but more flexible workflow.

## Features

Two languages (Russian — main; English — secondary).

## Install and setup

1. If haven't already, install `hexo`, `node.js` and `git`; then
   [initialize](https://hexo.io/docs/setup) Hexo.

2. Clone this theme to `site/themes/helix/`:

      cd themes/
      git clone ttps://github.com/pozitron57/helix.git

3. Optional setup

To have the custom home page generated from `themes/helix/source/index.md`:
    npm uninstall hexo-generator-index 

Don't create `/archives/`, `categories`, `tags` pages as they are not used in the theme.
    npm uninstall hexo-generator-archive
    npm uninstall hexo-generator-category
    npm uninstall hexo-generator-tag

Install `hexo-toc` (then you can place `<!--toc-->` in your *.md files to
generate tables of content).

    npm uninstall -g markdown-toc
    npm install hexo-toc --save
      
Replace standard markdown renderer.

    npm uninstall -g hexo-renderer-marked --save
    npm install hexo-renderer-markdown-it --save

For server-side rendering of LaTeX syntax with MathJax

    npm install hexo-filter-mathjax --save

## Site _config.yml

    theme: helix
    title: Site title
    author: Site author
    language: 
    - ru
    - en

    # URL
    url: https://site.com
    root: /
    permalink: :title/
    permalink_defaults:
      lang: ru

    # Directories
    i18n_dir: :lang
    skip_render: 
      - "projects/tree/*"
      - "projects/pedigree/**/*"

    # Writing
    new_post_name: :lang/:year-:month-:day-:title.md
    default_layout: post
    titlecase: false # Transform Title Into Titlecase
    external_link:
      enable: true # Open external links in new tab
      field: site # Apply to the whole site
      exclude: ''
    filename_case: 0
    render_drafts: false
    post_asset_folder: false
    relative_link: false
    future: true

    ## Code syntax highlighting
    highlight:
      enable: true
      auto_detect: false
      line_number: true
      line_threshold: 0
      tab_replace: ''
      wrap: true
      hljs: false

    # Category & Tag
    default_category: uncategorized

    # http://momentjs.com/docs/#/displaying/format/
    date_format: DD MMMM YYYY
    time_format: HH:mm

    ## Docs: https://github.com/celsomiranda/hexo-renderer-markdown-it/wiki
    markdown:
      render:
        html: true
        xhtmlOut: false
        breaks: false
        linkify: true
        typographer: true
        quotes: '«»‘’'
      plugins:
        - markdown-it-footnote
        - markdown-it-sup
        - markdown-it-sub
        - markdown-it-abbr
      anchors:
        level: 1
        collisionSuffix: ''
        permalink: true
        permalinkClass: header-anchor
        permalinkSymbol: ''

    # hexo-toc
    toc:
      maxdepth: 6
      class: toc
      slugify: transliteration
      decodeEntities: false
      anchor:
        position: after
        symbol: ' #'
        style: header-anchor

    # hexo-filter-mathjax
    mathjax:
      tags: ams # or 'ams' or 'all'
      single_dollars: true # enable single dollar signs as in-line math delimiters
      cjk_width: 0.9 # relative CJK char width
      normal_width: 0.6 # relative normal (monospace) width
      append_css: true # add CSS to pages rendered by MathJax
      every_page: false # if true, every page will be rendered by MathJax regardless the `mathjax` setting in Front-matter
      packages: # extra packages to load
      extension_options:
        {
        inlineMath: [ ['$','$'], ['\(','\)'] ],
        ams
        }

    # Deployment
    deploy:
      type: rsync
      host: 
      user: 
      root: 
      port: 22
      delete: true
      args: '--exclude-from=exclude-list'
      verbose: true
      ignore_errors: false


## Tag plugins

In `helix/scripts` there are files:
`jg.js`,
`comment.js`,
`prompt.js`,
`gif.js` for tag plugins with corresponding names, e.g. 

    {% jg img_path=https://site.com/images/ %}
    image1.jpg
    image2.jpg 'Second title'
    {% endjg %}

More information on usage syntax and options with examples see in the
`helix/scripts/*.js` files.

  
## Front-matter options

1. Justified gallery

    justifiedgallery: <options>
      left, center, right, justify, nojustify

If any option is given for `justifiedgallery`, `layout/_partial/head.ejs`
loads css and js files for justifiedgallery.
`layout/_partial/after_footer.ejs` initialize script as follows

    <% if (page.justifiedgallery) { %>
    <script>
    $('.jg').justifiedGallery({
        rowHeight : 130,
        lastRow : '<%=page.justifiedgallery %>',
        margins : 2
    });
    </script>

2. Magnificpopup

    magnificpopup: <bool>

Loads css and js in `<head></head>`. **Also loads jquery**, don't use
`jquery: true` if you are already using `magnificpopup: true`.

`layout/_partial/after_footer.ejs` initialize magnificpopup script as
follows (see file for details).

3. Jquery

    jquery: <bool>

Loads jquery.js in `<head></head>`.

3. gif

    gif: <bool>

Loads gifonclick.js `layout/_partisl/after_footer.ejs`. Needs jquery to
work.

4. MathJax

    mathjax: <bool>

Tells `hexo-filter-mathjax` that it should render this page with mathjax.
`hexo-filter-mathjax` should be installed.


## Site structure
Current root is site.com/ (second language root is site.com/en/)

Archives are at site.com/blog/ (site.com/en/blog/)

Edit `scaffolds/post.md` for automatic permalink creation via `hexo new post` in
the front-matter:

    ---
    title: {{ title }}
    date: {{ date }}
    permalink: blog/{{ title }}/
    tags:
    categories:
    ---

No tags or categories dir.

## layout overview
- `blog.ejs` generates `site.com/blog/` page. Create file site/source/blog/index.md with `layout: blog`.
- `post.ejs` generates `site.com/blog/<postname>/` pages.
- `page.ejs` generates `site.com/blog/<pages>/`.

- `astrozone.ejs` for /projects/astrozone/` page. You'll probably want to remove it.
- `nfk.ejs` for `/projects/nfk/` page. You'll probably want to remove it.
- `vpr.ejs` for `/projects/vpr/` page. You'll probably want to remove it.
- `vpr-table.ejs` for `/projects/vpr/chords/` page. You'll probably want to remove it.

### _partial layouts
- `head.ejs` generates `<head></head>` tag based on frontmatter and site `_config.yml` options.
- `footer.ejs` adds simple footer (author, date).
- `after_footer.ejs` adds scripts based on page frontmatter options.
- `comments.ejs` adds scripts needed for `isso` comments. You may want to change it to your comment system or remove.
- `navbar.ejs` generates horizontal menu (Home, Blog, About, etc.)
- `trans.ejs` is used in `navbar.ejs` to add second-language button only for
  translated pages (set frontmatter option `translated: true`).
