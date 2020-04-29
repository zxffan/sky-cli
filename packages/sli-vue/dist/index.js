"use strict";function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var r=require("commander"),s=e(require("ora")),o=require("webpack"),t=e(o),n=e(require("webpack-dev-server")),i=e(require("webpack-chain")),l=e(require("path")),a=e(require("fs")),u=e(require("mini-css-extract-plugin")),c=require("clean-webpack-plugin"),d=e(require("optimize-css-assets-webpack-plugin")),p=require("vue-loader"),v=require("webpack-bundle-analyzer"),m=e(require("html-webpack-plugin")),h=e(require("cssnano")),g=e(require("terser-webpack-plugin")),f=e(require("chalk"));function b(e){var r;return null===(r=Object.prototype.toString.call(e).match(/\s(\w*)]$/))||void 0===r?void 0:r[1].toLowerCase()}const y=e=>"array"===b(e),q=e=>"object"===b(e),w=e=>"map"===b(e),j=e=>"set"===b(e),k={mergeArray(e,r){e.splice(e.length,r.length,...r)},mergeSet(e,r){r.forEach(r=>e.add(r))},mergeMap(e,r){r.forEach((r,s)=>{y(r)?(!e.has(s)&&e.set(s,[]),this.mergeArray(e.get(s),r)):q(r)?(!e.has(s)&&e.set(s,{}),this.mergeObject(e.get(s),r)):w(r)?(!e.has(s)&&e.set(s,new Map),this.mergeMap(e.get(s),r)):j(r)?(!e.has(s)&&e.set(s,new Set),this.mergeSet(e.get(s),r)):e.set(s,r)})},mergeObject(e,r){var s,o,t,n;this.mergeArray;for(const i in r)if(Object.prototype.hasOwnProperty.call(r,i)){const l=r[i];y(l)?(null!==(s=e[i])&&void 0!==s||(e[i]=[]),this.mergeArray(e[i],l)):q(l)?(null!==(o=e[i])&&void 0!==o||(e[i]={}),this.mergeObject(e[i],l)):w(l)?(null!==(t=e[i])&&void 0!==t||(e[i]=new Map),this.mergeMap(e[i],l)):j(l)?(null!==(n=e[i])&&void 0!==n||(e[i]=new Set),this.mergeSet(e[i],l)):e[i]=l}}},O=(e,r)=>{if(b(e)!==b(r))throw new Error("[error]: 相同字段类型必须一致");y(r)?y(e)&&k.mergeArray(e,r):q(r)?q(e)&&k.mergeObject(e,r):w(r)?w(e)&&k.mergeMap(e,r):j(r)?j(e)&&k.mergeSet(e,r):e=r},S=function(e,...r){for(const s of r)O(e,s);return e};var x=e=>l.resolve(process.cwd(),""+e);var C=(e,r,s)=>{const o={},t=(()=>{var e;const r={},s=a.readFileSync(x("./package.json")).toString(),o=JSON.parse(s).dependencies;for(const s in o)Object.prototype.hasOwnProperty.call(o,s)&&(r[s]=null===(e=/\d+\.\d+\.\d+$/g.exec(o[s]))||void 0===e?void 0:e[0]);return r})(),n=e.map(e=>{if(e.name in t){const n=t[e.name];return o[e.name]=e.scope,{css:e.css&&[r,e.alias||e.name,n,e.css[s]].join("/"),js:e.js&&[r,e.alias||e.name,n,e.js[s]].join("/")}}throw new Error("相关依赖未安装，请先执行npm install "+e.name)});return{externals:o,htmlCdns:n}};const P=require("os").cpus().length>1,$={loader:require.resolve("eslint-loader"),options:{fix:!0}},E=(e,r)=>{const s={test:/\.(js)$/,use:[P?require.resolve("thread-loader"):"",{loader:require.resolve("babel-loader"),options:{cacheDirectory:!0,sourceType:"unambiguous"}}].filter(e=>e),include:[/src/]},o=[$];return"development"===e&&!1!==r&&s.use.push(...o),s},M=(e,r)=>{const s={test:/\.vue$/,use:[P?require.resolve("thread-loader"):"",require.resolve("vue-loader")].filter(e=>e),include:[/src/]},o=[$];return"development"===e&&!1!==r&&s.use.push(...o),s},A=(e,r)=>{const s={test:/\.css$/,oneOf:[{use:["production"===e?u.loader:require.resolve("vue-style-loader"),require.resolve("css-loader"),require.resolve("postcss-loader")]}]};return r&&s.oneOf.unshift({resourceQuery:/module/,use:["production"===e?u.loader:require.resolve("vue-style-loader"),{loader:require.resolve("css-loader"),options:{modules:!0}},require.resolve("postcss-loader")]}),s},z=(e,r)=>{const s={test:/\.less$/,use:["production"===e?u.loader:require.resolve("vue-style-loader"),require.resolve("css-loader"),require.resolve("postcss-loader"),{loader:require.resolve("less-loader"),options:{javascriptEnabled:!0}}]};return r&&r.length>0&&s.use.push({loader:require.resolve("sass-resources-loader"),options:{resources:r}}),s},D=(e,r)=>{const s={test:/\.s(a|c)ss$/,use:["production"===e?u.loader:require.resolve("vue-style-loader"),require.resolve("css-loader"),require.resolve("postcss-loader"),require.resolve("sass-loader")]};return r&&r.length>0&&s.use.push({loader:require.resolve("sass-resources-loader"),options:{resources:r}}),s},W=e=>{const r="production"===e?"[name][contenthash:8].[ext]":"[name].[ext]";return[{test:/\.(jpg|png|gif|jpeg|svg)$/i,use:[{loader:require.resolve("url-loader"),options:{limit:3072,name:"assets/images/"+r,esModule:!1}}]},{test:/\.(woff2|woff|eot|ttf|otf)$/i,loader:require.resolve("url-loader"),options:{name:"assets/fonts/"+r,esModule:!1}},{test:/\.(mp4|avi|mp3|rmvb|wmv|flv)$/i,loader:require.resolve("url-loader"),options:{name:"assets/media/"+r,esModule:!1}},{test:/\.(pdf|doc|docx|ppt|xls|xlsx)$/i,loader:require.resolve("url-loader"),options:{name:"assets/files/"+r,esModule:!1}}]},N=e=>{let r;return"development"===e&&(r=new o.HotModuleReplacementPlugin),r},T=e=>{let r;return"production"===e&&(r=new u({filename:"assets/style/[name][contenthash:8].css"})),r},_=e=>{let r;return"production"===e&&(r=new c.CleanWebpackPlugin),r},R=e=>{let r;return"production"===e&&(r=new d({assetNameRegExp:/\.css$/,cssProcessor:h,cssProcessorPluginOptions:{preset:["default",{discardComments:{removeAll:!0}}]}})),r},V=(e,r,s="./public/index.html",o="./public/favicon.ico")=>{let t={template:x(s),favicon:x(o),cdnConfig:r,inject:!r};return"production"===e&&(t=Object.assign(Object.assign({},t),{minify:{caseSensitive:!1,collapseWhitespace:!0,removeAttributeQuotes:!0,removeComments:!0}})),new m(t)};function F(e,r){var s,o;const{analysis:t,css:n,cdn:i,eslintCompileCheck:l}=r,a=n.loaderOption;let u={},c=[];if(i){const r=C(i.sources,i.origin,e);u=r.externals,c=r.htmlCdns}return{entry:{main:"./src/main.js"},module:{rules:[A(e,n.module),...W(e),D(e,null===(s=a.scss)||void 0===s?void 0:s.prependData),M(e,l),E(e,l),z(e,null===(o=a.less)||void 0===o?void 0:o.prependData)]},plugins:[t?new v.BundleAnalyzerPlugin({analyzerPort:"auto"}):null,V(e,c),_(e),N(e),T(e),R(e),new p.VueLoaderPlugin].filter(e=>e),externals:u}}var H=(e,r)=>"development"===e?function(e,r){const s=F(e,r);return S(s,{output:{publicPath:"/",filename:"assets/[name].js",path:x("./dist")},mode:e,devtool:"cheap-module-eval-source-map",devServer:{hot:!0,inline:!0,open:!0,stats:"errors-warnings",compress:!0,historyApiFallback:!0,overlay:{errors:!0,warnings:!1}}})}(e,r):function(e,r){const s=F(e,r);return S(s,{output:{publicPath:"/",filename:"assets/[name][chunkhash:8].js",path:x("./dist")},mode:e,optimization:{minimize:!0,minimizer:[new g({cache:!0,parallel:!0,extractComments:!0,terserOptions:{compress:{unused:!0,drop_debugger:!0,drop_console:!0,dead_code:!0}}})],splitChunks:{chunks:"all",minSize:3e4,maxSize:0,minChunks:1,maxAsyncRequests:5,maxInitialRequests:3,automaticNameDelimiter:"~",name:!0,cacheGroups:{vendors:{test:/[\\/]node_modules[\\/]/,priority:-10},default:{minChunks:2,priority:-20,reuseExistingChunk:!0}}}}})}(e,r);const I={cdn:!1,configureWebpack:{},chainWebpack:e=>{},devServer:{},css:{module:!1,loaderOption:{scss:{prependData:[]},less:{prependData:[]}}},analysis:!1,eslintCompileCheck:!0};var J=(e,r)=>function(){var s;let o;try{o=require(process.cwd()+"/sli.config.js")}catch(e){o=I}const t=S(I,o),{configureWebpack:n,chainWebpack:l,devServer:a}=t,u=
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function(e,r){var s={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&r.indexOf(o)<0&&(s[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var t=0;for(o=Object.getOwnPropertySymbols(e);t<o.length;t++)r.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(s[o[t]]=e[o[t]])}return s}(t,["configureWebpack","chainWebpack","devServer"]),c=new i;l(c),r.port&&(a.port=r.port),r.analysis&&(u.analysis=r.analysis);const d=S(H(e,u),n,c.toConfig(),{devServer:a});return(null===(s=null==d?void 0:d.module)||void 0===s?void 0:s.rules)&&(d.module.rules=d.module.rules.reverse().reduce((e,r)=>(e.some(e=>{var s,o;return(null===(s=null==e?void 0:e.test)||void 0===s?void 0:s.toString())===(null===(o=null==r?void 0:r.test)||void 0===o?void 0:o.toString())})||e.push(r),e),[]).reverse()),d}();const L=new r.Command;L.command("dev").description("run your app in development").alias("d").option("-p, --port <port>","Port used by the server (default: 8080)").action(e=>{(e=>{var r,o;const i=s();i.start("app is starting..."),process.env.NODE_ENV="development";const l=J("development",{port:e}),a=t(l);e=(null===(r=l.devServer)||void 0===r?void 0:r.port)||8080;const u=(null===(o=l.devServer)||void 0===o?void 0:o.host)||"localhost";a.hooks.done.tap("buildTip",()=>{i.succeed(`compile successfully!\n      please open  http://${u}:${e}`)}),a.hooks.failed.tap("buildTip",e=>{i.fail("compile failed"),console.log(e)}),new n(a,l.devServer||{}).listen(e,u)})(e.port)}),L.command("build").description("build your app (production)").alias("b").option("-a, --analysis","show buldle information").action(e=>{(e=>{const r=s();r.start("app is building..."),process.env.NODE_ENV="production";const o=J("production",{analysis:e}),n=t(o);n.hooks.done.tap("buildTip",()=>{r.succeed("build successfully!")}),n.hooks.failed.tap("buildTip",e=>{r.fail("build failed"),console.log(e)}),n.run((e,r)=>{const s=r.toJson();console.log([f.green(`Time: ${s.time}ms`),f.green("webpack version: "+s.version)].join("\n"))})})(e.analysis)}),L.version(require("../package.json").version,"-v --version").parse(process.argv),process.argv.slice(2).length||L.outputHelp();
