markdown-latex-loader
=====================

> This project is a fork of
[markdown-loader](https://github.com/peerigon/markdown-loader)

markdown-latex-loader is a plugin for webpack which will render LaTeX and
Markdown in HTML.

It will first render LaTeX functions in `$..$` or `$$..$$` symbols with
[KaTeX](https://khan.github.io/KaTeX/)

And then it will render Markdown with [marked](https://github.com/chjj/marked).

## Installation

```bash
npm i -D markdown-latex-loader
```

KaTeX require a CSS files and several fonts. The easiest way to include them is
with the given CDN

```html
<!-- template.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0-beta/dist/katex.min.css" integrity="sha384-9tPv11A+glH/on/wEu99NVwDPwkMQESOocs/ZGXPoIiLE8MU/qkqUcZ3zzL+6DuH" crossorigin="anonymous">
```

## Usage

You can use it the same way you use
[markdown-loader](https://github.com/peerigon/markdown-loader#usage).

Usage with `vue-loader` and the new `@vue/cli` are described too.

### Webpack 2+

```javascript
// webpack.config.js
{
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    { loader: "html-loader" },
                    { loader: "markdown-latex-loader" }
                ]
            }
        ]
    }
}
```

### vue-loader

```javascript
// webpack.config.js
{
    module: {
        rules: [
            {
                test: /\.(md|markdown|markdown-latex)$/,
                use: [
                    {
                        loader: "markdown-latex-loader",
                        options: {
                            div: true
                        }
                    }
                ]
            }
        ]
    }
}
```

```html
<!-- Component.vue -->
<template lang="markdown-latex">
  # This is Markdown in vue

  How cool is **that** ?

  Plus, because I'm soooo cool, you can write formula, inline like $x^3$ or in block like this:

  $$x = x_0 + \cfrac{1}{a_1 + 3} $$
</template>
```

### Vue CLI

```javascript
// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module
          .rule('markdown-latex')
          .test(/\.(md|markdown|markdown-latex)$/)
          .use('markdown-latex-loader')
            .loader('markdown-latex-loader')
            .tap(options => { return {div: true} })
            .end()
      }
    }
```

`Component.vue`: Same as [vue-loader](#vue-loader)


## Options

You can use the [markded](https://marked.js.org/#/USING_ADVANCED.md) options.

Option | Values
-------|-------------------------------------------------------------
div    | If `true`, the HTML code will be embeded in a single `<div>`
