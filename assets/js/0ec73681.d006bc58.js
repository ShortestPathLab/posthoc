"use strict";(self.webpackChunkdocs_2=self.webpackChunkdocs_2||[]).push([[5868],{4621:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>a});var r=n(5893),t=n(1151);const i={},d="Pathfinding Posthoc Protocol",o={id:"api/renderer/protocol",title:"Pathfinding Posthoc Protocol",description:"Version 1.0.3",source:"@site/docs/6-api/renderer/protocol.md",sourceDirName:"6-api/renderer",slug:"/api/renderer/protocol",permalink:"/docs/api/renderer/protocol",draft:!1,unlisted:!1,editUrl:"https://github.com/path-visualiser/path-visualiser.github.io/tree/master/docs/6-api/renderer/protocol.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Execution Context",permalink:"/docs/api/renderer/execution-context"},next:{title:"Standard Renderers",permalink:"/docs/api/renderer/standard-renderers"}},c={},a=[{value:"Requests",id:"requests",level:2},{value:"Responses",id:"responses",level:2},{value:"Check Connection",id:"check-connection",level:2},{value:"<code>info</code>",id:"info",level:3},{value:"<code>request.params</code>",id:"requestparams",level:4},{value:"<code>response.result</code>",id:"responseresult",level:4},{value:"Feature Query",id:"feature-query",level:2},{value:"<code>features/formats</code>",id:"featuresformats",level:3},{value:"<code>request.params</code>",id:"requestparams-1",level:4},{value:"<code>response.result</code>",id:"responseresult-1",level:4},{value:"<code>features/maps</code>",id:"featuresmaps",level:3},{value:"<code>request.params</code>",id:"requestparams-2",level:4},{value:"<code>response.result</code>",id:"responseresult-2",level:4},{value:"<code>features/map</code>",id:"featuresmap",level:3},{value:"<code>request.params</code>",id:"requestparams-3",level:4},{value:"<code>response.result</code>",id:"responseresult-3",level:4},{value:"<code>features/algorithms</code>",id:"featuresalgorithms",level:3},{value:"<code>request.params</code>",id:"requestparams-4",level:4},{value:"<code>response.result</code>",id:"responseresult-4",level:4},{value:"Solve Task",id:"solve-task",level:2},{value:"<code>solve/pathfinding</code>",id:"solvepathfinding",level:3},{value:"<code>request.params</code>",id:"requestparams-5",level:4},{value:"<code>response.result</code>",id:"responseresult-5",level:4}];function l(e){const s={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"pathfinding-posthoc-protocol",children:"Pathfinding Posthoc Protocol"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.em,{children:"Version 1.0.3"})}),"\n",(0,r.jsx)(s.p,{children:"The Pathfinding Posthoc Protocol describes the way pathfinding visualisers communicate with pathfinding solvers to deliver an interactive experience."}),"\n",(0,r.jsxs)(s.p,{children:["The protocol is transport-layer agnostic, and extends the ",(0,r.jsx)(s.a,{href:"https://www.jsonrpc.org/specification",children:"JSON-RPC 2.0 specifications"}),"."]}),"\n",(0,r.jsx)(s.h1,{id:"message-format",children:"Message Format"}),"\n",(0,r.jsx)(s.h2,{id:"requests",children:"Requests"}),"\n",(0,r.jsx)(s.p,{children:"As per JSON-RPC specifications, requests specify a unique ID, method name, and an optional parameter object."}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:'{\n  jsonrpc: "2.0",\n  id: 0,\n  method: "solve/pathfinding",\n  params: {\n    format: "grid",\n    algorithm: "jps"\n  }\n}\n'})}),"\n",(0,r.jsx)(s.h2,{id:"responses",children:"Responses"}),"\n",(0,r.jsx)(s.p,{children:"Responses should contain a result property if the call succeeds, otherwise it should contain an error property. The ID should match the ID of the request it is addressing."}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:'{\n  jsonrpc: "2.0",\n  id: 0,\n  result: { "foo": 1, "bar": 2 }\n}\n'})}),"\n",(0,r.jsx)(s.h1,{id:"methods",children:"Methods"}),"\n",(0,r.jsx)(s.h2,{id:"check-connection",children:"Check Connection"}),"\n",(0,r.jsx)(s.h3,{id:"info",children:(0,r.jsx)(s.code,{children:"info"})}),"\n",(0,r.jsx)(s.p,{children:"Retrieves basic information about the server. Used to check that the server is alive."}),"\n",(0,r.jsx)(s.h4,{id:"requestparams",children:(0,r.jsx)(s.code,{children:"request.params"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"-"})}),"\n",(0,r.jsx)(s.h4,{id:"responseresult",children:(0,r.jsx)(s.code,{children:"response.result"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"{\n  name?: string;\n  description?: string;\n  version?: string;\n}\n"})}),"\n",(0,r.jsx)(s.h2,{id:"feature-query",children:"Feature Query"}),"\n",(0,r.jsx)(s.h3,{id:"featuresformats",children:(0,r.jsx)(s.code,{children:"features/formats"})}),"\n",(0,r.jsx)(s.p,{children:"Gets a list of map types supported by the solver."}),"\n",(0,r.jsx)(s.h4,{id:"requestparams-1",children:(0,r.jsx)(s.code,{children:"request.params"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"-"})}),"\n",(0,r.jsx)(s.h4,{id:"responseresult-1",children:(0,r.jsx)(s.code,{children:"response.result"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"{\n  id: string;\n  name?: string;\n  description?: string;\n}[]\n"})}),"\n",(0,r.jsx)(s.h3,{id:"featuresmaps",children:(0,r.jsx)(s.code,{children:"features/maps"})}),"\n",(0,r.jsx)(s.p,{children:"Gets a list of template map descriptors offered by the solver."}),"\n",(0,r.jsx)(s.h4,{id:"requestparams-2",children:(0,r.jsx)(s.code,{children:"request.params"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"-"})}),"\n",(0,r.jsx)(s.h4,{id:"responseresult-2",children:(0,r.jsx)(s.code,{children:"response.result"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"{\n  id: string;\n  name?: string;\n  description?: string;\n  format?: string;\n}[]\n"})}),"\n",(0,r.jsx)(s.h3,{id:"featuresmap",children:(0,r.jsx)(s.code,{children:"features/map"})}),"\n",(0,r.jsx)(s.p,{children:"Gets a particular template map given its ID."}),"\n",(0,r.jsx)(s.h4,{id:"requestparams-3",children:(0,r.jsx)(s.code,{children:"request.params"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"{\n  id: string;\n}\n"})}),"\n",(0,r.jsx)(s.h4,{id:"responseresult-3",children:(0,r.jsx)(s.code,{children:"response.result"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"{\n  id: string;\n  name?: string;\n  description?: string;\n  content?: string;\n  format?: string;\n}\n"})}),"\n",(0,r.jsx)(s.h3,{id:"featuresalgorithms",children:(0,r.jsx)(s.code,{children:"features/algorithms"})}),"\n",(0,r.jsx)(s.p,{children:"Gets a list of algorithms supported by the solver."}),"\n",(0,r.jsx)(s.h4,{id:"requestparams-4",children:(0,r.jsx)(s.code,{children:"request.params"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"-"})}),"\n",(0,r.jsx)(s.h4,{id:"responseresult-4",children:(0,r.jsx)(s.code,{children:"response.result"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:"{\n  id: string;\n  name?: string;\n  description?: string;\n}[]\n"})}),"\n",(0,r.jsx)(s.h2,{id:"solve-task",children:"Solve Task"}),"\n",(0,r.jsx)(s.h3,{id:"solvepathfinding",children:(0,r.jsx)(s.code,{children:"solve/pathfinding"})}),"\n",(0,r.jsx)(s.p,{children:"Requests a pathfinding solution for a given problem."}),"\n",(0,r.jsxs)(s.p,{children:["The ",(0,r.jsx)(s.code,{children:"mapURI"})," can contain a URI of one of the following formats, namely ",(0,r.jsx)(s.code,{children:"scheme:content"}),". The content is a URI-encoded."]}),"\n",(0,r.jsxs)(s.table,{children:[(0,r.jsx)(s.thead,{children:(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.th,{children:"Scheme"}),(0,r.jsx)(s.th,{children:"Content"})]})}),(0,r.jsxs)(s.tbody,{children:[(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"resource"})}),(0,r.jsx)(s.td,{children:"Contents of a map file (operating environment)."})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"hash"})}),(0,r.jsx)(s.td,{children:"An MD5 hash that optionally points to an existing resource."})]}),(0,r.jsxs)(s.tr,{children:[(0,r.jsx)(s.td,{children:(0,r.jsx)(s.code,{children:"trace"})}),(0,r.jsx)(s.td,{children:"A pre-computed search trace. The server should return this verbatim."})]})]})]}),"\n",(0,r.jsx)(s.h4,{id:"requestparams-5",children:(0,r.jsx)(s.code,{children:"request.params"})}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-ts",children:'{\n  mapURI: `${"resource" | "hash" | "trace"}:${string}`;\n  algorithm: string;\n  format: string;\n  instances: {\n    start: int;\n    end: int;\n  }\n  [];\n}\n'})}),"\n",(0,r.jsx)(s.h4,{id:"responseresult-5",children:(0,r.jsx)(s.code,{children:"response.result"})}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.code,{children:"SearchTrace | undefined"})})]})}function h(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>o,a:()=>d});var r=n(7294);const t={},i=r.createContext(t);function d(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:d(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);