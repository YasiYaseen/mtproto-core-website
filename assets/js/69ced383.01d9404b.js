(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{81:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return i})),t.d(n,"default",(function(){return d}));var r=t(3),o=t(8),s=(t(0),t(101)),a={title:"Setup. Handle Errors"},c={unversionedId:"setup-handle-errors",id:"setup-handle-errors",isDocsHomePage:!1,title:"Setup. Handle Errors",description:'`js title="api.js"',source:"@site/docs/setup-handle-errors.md",slug:"/setup-handle-errors",permalink:"/docs/setup-handle-errors",editUrl:"https://github.com/alik0211/mtproto-core-website/edit/master/docs/setup-handle-errors.md",version:"current",sidebar:"docs",previous:{title:"Installation",permalink:"/docs/"},next:{title:"Setup. Handle Updates",permalink:"/docs/setup-handle-updates"}},i=[],p={toc:i};function d(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},p,t,{components:n,mdxType:"MDXLayout"}),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-js",metastring:'title="api.js"',title:'"api.js"'},"const path = require('path');\nconst MTProto = require('@mtproto/core');\nconst { sleep } = require('@mtproto/core/src/utils/common');\n\nclass API {\n  constructor() {\n    this.mtproto = new MTProto({\n      api_id: YOU_API_ID,\n      api_hash: YOU_API_HASH,\n\n      storageOptions: {\n        path: path.resolve(__dirname, './data/1.json'),\n      },\n    });\n  }\n\n  async call(method, params, options = {}) {\n    try {\n      const result = await this.mtproto.call(method, params, options);\n\n      return result;\n    } catch (error) {\n      console.log(`${method} error:`, error);\n\n      const { error_code, error_message } = error;\n\n      if (error_code === 420) {\n        const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);\n        const ms = seconds * 1000;\n\n        await sleep(ms);\n\n        return this.call(method, params, options);\n      }\n\n      if (error_code === 303) {\n        const [type, dcIdAsString] = error_message.split('_MIGRATE_');\n\n        const dcId = Number(dcIdAsString);\n\n        // If auth.sendCode call on incorrect DC need change default DC, because\n        // call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error\n        if (type === 'PHONE') {\n          await this.mtproto.setDefaultDc(dcId);\n        } else {\n          Object.assign(options, { dcId });\n        }\n\n        return this.call(method, params, options);\n      }\n\n      return Promise.reject(error);\n    }\n  }\n}\n\nconst api = new API();\n\nmodule.exports = api;\n")))}d.isMDXComponent=!0}}]);