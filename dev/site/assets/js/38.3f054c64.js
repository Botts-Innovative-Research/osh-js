(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{316:function(s,a,t){"use strict";t.r(a);var e=t(0),n=Object(e.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"contributing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#contributing"}},[s._v("#")]),s._v(" Contributing")]),s._v(" "),a("h2",{attrs:{id:"build-gh-pages-demos-vuepress-showcase-js-documentation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#build-gh-pages-demos-vuepress-showcase-js-documentation"}},[s._v("#")]),s._v(" Build gh-pages: demos, vuepress, showcase & Js documentation")]),s._v(" "),a("p",[s._v("Here a script to build the site, showcase, demos & the JsDoc:")]),s._v(" "),a("p",[s._v("You can use ENV=dev or ENV=latest to build either the dev environment or the latest one.")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("ENV")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("dev\n")])])]),a("p",[s._v("Then you can use the following script (don't forget to change output dir (DIR) and osh-js source dir (CURRENT)):")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token shebang important"}},[s._v("#!/bin/bash")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("DIR")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("osh_gh_pages_git_clone"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("/osh-js/dev\n"),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CURRENT")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("your_OSH_JS_dir"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("/osh-js\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## Remove existing files")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/jsdoc "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/site "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/showcase\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos\n\nnvm use v12.18.2\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing video-display-advanced-vuejs ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/video-display/video-display-advanced-vuejs/ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing video-display-vuejs ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/video-display/video-display-vuejs/ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v("  "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing 3dr-solo-uav-vuejs ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/3dr-solo-uav/3dr-solo-uav-vuejs/ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing 3dr-solo-uav-react ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/3dr-solo-uav/3dr-solo-uav-react/ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing 3dr-solo-uav-react-tsx ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/3dr-solo-uav/3dr-solo-uav-react-tsx/ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing eathquake ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/earthquake/ "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing Showcase ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/showcase/  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" dist/* "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" prod "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Processing documentation & vuepress ..."')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"                                           "')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" documentation "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" vuepress\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# cleanup dest directories")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/earthquake "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/video-display-advanced-vuejs  "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/video-display-vuejs  "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/3dr-solo-uav-vuejs "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/3dr-solo-uav-react "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/3dr-solo-uav-react-tsx "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/showcase "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/documentation/jsdoc "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/doc\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# copy new files")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Copy new files"')]),s._v(" \n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"###########################################"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" \n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/video-display/video-display-advanced-vuejs/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/video-display-advanced-vuejs \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/video-display/video-display-vuejs/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/video-display-vuejs \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/3dr-solo-uav/3dr-solo-uav-vuejs/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/3dr-solo-uav-vuejs \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/3dr-solo-uav/3dr-solo-uav-react/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/3dr-solo-uav-react \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/3dr-solo-uav/3dr-solo-uav-react-tsx/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/3dr-solo-uav-react-tsx \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/demos/earthquake/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/demos/earthquake \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/showcase/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/showcase\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/jsdoc/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/jsdoc \n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-fr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$CURRENT")]),s._v("/vuepress/docs/dist "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$DIR")]),s._v("/site\n")])])]),a("h2",{attrs:{id:"build-npm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#build-npm"}},[s._v("#")]),s._v(" Build NPM")]),s._v(" "),a("p",[s._v("First change version contained into the package.json.")]),s._v(" "),a("p",[s._v("Then you have to build the content of the NPM by running the target "),a("code",[s._v("build-package")]),s._v(".")]),s._v(" "),a("p",[s._v("Finally, go to the output directory and run "),a("em",[s._v("npm publish")]),s._v(". Make sure that the version in the package.json is the right one.")]),s._v(" "),a("p",[s._v("Build dist directory:")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("yarn")]),s._v(" build-package\n")])])]),a("p",[s._v("Check version and publish NPM:")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ./build/osh-js "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" package.json "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("grep")]),s._v(" version\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" publish\n")])])])])}),[],!1,null,null,null);a.default=n.exports}}]);