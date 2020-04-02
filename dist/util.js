"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCliConfig=exports.getInitQuestions=exports.isBaseType=exports.getType=exports.updateJsonFile=exports.gitSources=exports.isNone=exports.isFoldExist=void 0;var _fs=_interopRequireDefault(require("fs")),_webpackMerge=_interopRequireDefault(require("webpack-merge")),_webpackChain=_interopRequireDefault(require("webpack-chain"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var __rest=function(e,t){var r={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(r[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(i=Object.getOwnPropertySymbols(e);n<i.length;n++)t.indexOf(i[n])<0&&Object.prototype.propertyIsEnumerable.call(e,i[n])&&(r[i[n]]=e[i[n]])}return r},isFoldExist=function(r){return new Promise(function(e,t){_fs.default.existsSync(r)?t(new Error(r+" has existed")):e()})};exports.isFoldExist=isFoldExist;var isNone=function(e){return null==e};exports.isNone=isNone;var gitSources={vue:{url:"direct:https://gitee.com/zxffan/templates.git#vue-spa"},react:{url:""},electron:{url:""}};exports.gitSources=gitSources;var updateJsonFile=function(i,n){return new Promise(function(e){if(_fs.default.existsSync(i)){var t=_fs.default.readFileSync(i).toString(),r=JSON.parse(t);Object.assign(r,n),_fs.default.writeFileSync(i,JSON.stringify(r,null,"\t")),e()}})};exports.updateJsonFile=updateJsonFile;var getType=function(e){var t=Object.prototype.toString.call(e).match(/\s(\w*)]$/);return t?null==t?void 0:t[1]:"none"};exports.getType=getType;var isBaseType=function(e){return 0<=["number","string","boolean","undefined","null"].indexOf(getType(e))};exports.isBaseType=isBaseType;var getInitQuestions=function(){return[{type:"confirm",message:"Do you need initialize a git repository",name:"git",default:!1}]};exports.getInitQuestions=getInitQuestions;var getCliConfig=function(e,t){void 0===t&&(t={});var r,i,n,o,s,a,u,p,c={configureWebpack:{},chainWebpack:function(){},devServer:{},css:{loaderOption:{scss:{prependData:[]},less:{prependData:[]}}},analysis:!1};return r=require(e),i=require(process.cwd()+"/cli.config.js"),n=(0,_webpackMerge.default)(c,i),o=n.configureWebpack,s=n.chainWebpack,a=n.devServer,u=__rest(n,["configureWebpack","chainWebpack","devServer"]),p=new _webpackChain.default,s(p),(0,_webpackMerge.default)(r(Object.assign(u,t)),o,p.toConfig(),{devServer:a})};exports.getCliConfig=getCliConfig;