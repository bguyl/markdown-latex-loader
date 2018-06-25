"use strict";

import test from "ava";
import webpack from "webpack";
import path from "path";
import fs from "fs";
import marked from "marked";
import katex from "katex";
import markdownOptions from "./markdown-options";

test.cb(t => {
    webpack({
        entry: path.resolve(__dirname, "./assets/markdown.md"),
        mode: "development",
        module: {
            rules: [{
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: require.resolve("../index.js"),
                        options: markdownOptions
                    }
                ]
            }]
        },
        output: {
            libraryTarget: "commonjs2",
            path: __dirname + "/output",
            filename: "bundle.js"
        }
    }, function onCompilationFinished(err, stats) {
        if (err) {
            return t.end(err);
        }
        if (stats.hasErrors()) {
            return t.end(stats.compilation.errors[0]);
        }
        if (stats.hasWarnings()) {
            return t.end(stats.compilation.warnings[0]);
        }

        const bundle = require("./output/bundle");
        t.is(bundle, '<h1 id=\"heading-1\">heading 1</h1>\n<ul>\n<li>buy pineapple</li>\n</ul>\n<h2 id=\"heading-2\">heading 2</h2>\n<p><em>italic</em> is the new <strong>bold</strong></p>\n<pre><code class=\"language-javascript\"><span class=\"hljs-attribute\">const i</span> = 100;</code></pre>\n<table>\n<thead>\n<tr>\n<th>name</th>\n<th>type</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>key</td>\n<td><code>string|number</code></td>\n</tr>\n</tbody></table>\n<p><span class="katex-display"><span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>c</mi></mrow><annotation encoding="application/x-tex">c</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.43056em;vertical-align:0em;"></span><span class="mord mathit">c</span></span></span></span></span></p>\n');

        t.end();
    });
});


