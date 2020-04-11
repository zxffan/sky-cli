"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _logSymbols=_interopRequireDefault(require("log-symbols")),_chalk=_interopRequireDefault(require("chalk")),_ora=_interopRequireDefault(require("ora")),_inquirer=_interopRequireDefault(require("inquirer")),_downloadGitRepo=_interopRequireDefault(require("download-git-repo")),_is_fold_exist=_interopRequireDefault(require("./lib/is_fold_exist")),_git_sources=_interopRequireDefault(require("./lib/git_sources")),_update=require("./lib/update"),_gen_questions=_interopRequireDefault(require("./lib/gen_questions"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var download=function(i){return new Promise(function(o,t){var e=i.name,r=i.frame,u=(0,_ora.default)();u.start("downloading...");var n=_git_sources.default[r];n.url||(u.fail(r+" is not provided for now"),t(new Error(r+" is not provided for now"))),(0,_downloadGitRepo.default)(n.url,e,{clone:!0},function(e){e?(u.fail("download failed, please check your network"),t(e)):(u.succeed("download successfully"),o(i))})})},updateProject=function(e){return(0,_update.updatePackage)(e.name+"/package.json",e).then(function(){console.log(_logSymbols.default.success,_chalk.default.green("package has been updated completely")),Promise.resolve()}).then(function(){Promise.resolve()})},successTip=function(e){return[_chalk.default.green("app has been created successfully\n"),"\t cd "+e,"\t sli init","\t sli dev"].join("\n")},_default=function(e){(0,_is_fold_exist.default)(e).then(function(){return _inquirer.default.prompt((0,_gen_questions.default)(e))}).then(function(e){return download(e)}).then(function(e){return updateProject(e)}).then(function(){console.log(_logSymbols.default.success,successTip(e))}).catch(function(e){console.log(_logSymbols.default.error,_chalk.default.red(e.message))})};exports.default=_default;