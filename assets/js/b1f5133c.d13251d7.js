"use strict";(self.webpackChunkdocs_2=self.webpackChunkdocs_2||[]).push([[3620],{852:(e,s,r)=>{r.r(s),r.d(s,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>n,metadata:()=>o,toc:()=>c});var t=r(5893),a=r(1151);const n={sidebar_position:2},i="Layers",o={id:"visualiser/3-1-user-guide/layers",title:"Layers",description:"Posthoc uses a layering system to help you create complex visualisations with tons of parts.",source:"@site/docs/3-visualiser/3-1-user-guide/layers.md",sourceDirName:"3-visualiser/3-1-user-guide",slug:"/visualiser/3-1-user-guide/layers",permalink:"/docs/visualiser/3-1-user-guide/layers",draft:!1,unlisted:!1,editUrl:"https://github.com/path-visualiser/path-visualiser.github.io/tree/master/docs/3-visualiser/3-1-user-guide/layers.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"UI",permalink:"/docs/visualiser/3-1-user-guide/interface"},next:{title:"Extensions",permalink:"/docs/visualiser/3-1-user-guide/extensions"}},l={},c=[{value:"Layer type",id:"layer-type",level:2},{value:"Trace",id:"trace",level:3},{value:"Map",id:"map",level:3},{value:"Query",id:"query",level:3},{value:"Layer order",id:"layer-order",level:2},{value:"Layer mode",id:"layer-mode",level:2}];function d(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",strong:"strong",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h1,{id:"layers",children:"Layers"}),"\n",(0,t.jsx)(s.p,{children:"Posthoc uses a layering system to help you create complex visualisations with tons of parts."}),"\n",(0,t.jsx)(s.p,{children:"A lot of the time, you might want to overlay a search trace on top of a map. But you can stack as many search traces, maps, or queries on top of each other as you want."}),"\n",(0,t.jsx)(s.h2,{id:"layer-type",children:"Layer type"}),"\n",(0,t.jsx)(s.p,{children:"Layers are designed as subsystems. They're independently responsible for accepting some input, processing it, and returning visualisable content to Posthoc, like what to draw, and what events there were."}),"\n",(0,t.jsxs)(s.p,{children:["Most views, like ",(0,t.jsx)(s.strong,{children:"graph"}),", ",(0,t.jsx)(s.strong,{children:"events"}),", and ",(0,t.jsx)(s.strong,{children:"debugger"})," needs you to choose a layer. They'll only allow you to choose layers with relevant content. For example, ",(0,t.jsx)(s.strong,{children:"events"})," would only allow you to choose ",(0,t.jsx)(s.strong,{children:"trace"})," and ",(0,t.jsx)(s.strong,{children:"query"})," layers because they contain a list of events."]}),"\n",(0,t.jsx)(s.h3,{id:"trace",children:"Trace"}),"\n",(0,t.jsxs)(s.p,{children:["You can import a search trace file into a trace layer via ",(0,t.jsx)(s.strong,{children:"Trace > Choose Trace > Import Trace"}),". Search trace files have the extensions ",(0,t.jsx)(s.code,{children:"*.trace.yaml"})," or ",(0,t.jsx)(s.code,{children:"*.trace.json"}),". Some extensions may provide search traces directly, which appear below the ",(0,t.jsx)(s.strong,{children:"Import Trace"})," option."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"Alt text",src:r(8943).Z+"",width:"2560",height:"1600"})}),"\n",(0,t.jsx)(s.p,{children:"When a search trace loads, you're given a quick preview of the file that was loaded."}),"\n",(0,t.jsxs)(s.p,{children:["Trace layers are supported by ",(0,t.jsx)(s.strong,{children:"event"}),", ",(0,t.jsx)(s.strong,{children:"viewport"}),", ",(0,t.jsx)(s.strong,{children:"graph"}),", ",(0,t.jsx)(s.strong,{children:"source"}),", and ",(0,t.jsx)(s.strong,{children:"debugger"})," views."]}),"\n",(0,t.jsx)(s.h3,{id:"map",children:"Map"}),"\n",(0,t.jsx)(s.p,{children:"Maps are a separate list of filetypes that we thought deserved first-class support. Typically, these represent domains for pathfinding search, like grids, networks, and meshes."}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"Alt text",src:r(4634).Z+"",width:"2560",height:"1600"})}),"\n",(0,t.jsxs)(s.p,{children:["It's optional to use maps because you might not be doing pathfinding search. We recommend you to use search traces for visualisation. But if you have files in a supported map format, it might be more convenient to use a map layer. You can import map files a map layer via ",(0,t.jsx)(s.strong,{children:"Source > Choose Map > Import Map"}),"."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"./extensions#map-support",children:"Read about built-in map support here."})}),"\n",(0,t.jsx)(s.h3,{id:"query",children:"Query"}),"\n",(0,t.jsxs)(s.p,{children:["Query layers interact with extensions that implement the ",(0,t.jsx)(s.a,{href:"/docs/visualiser-adapter-protocol",children:"Visualiser Adapter Protocol"}),". The query layer and the Visualiser Adapter Protocol should allow you to interactively call your solver, complete with custom parameters and inputs."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{alt:"Alt text",src:r(5e3).Z+"",width:"2560",height:"1600"})}),"\n",(0,t.jsx)(s.p,{children:"We're yet to finalise this API. Currently, as proof-of-concept, the query layer allows you to run single-agent pathfinding problems on grid maps."}),"\n",(0,t.jsx)(s.h2,{id:"layer-order",children:"Layer order"}),"\n",(0,t.jsx)(s.p,{children:"You can rearrange layers to change rendering order. Layers that are lower on the list are drawn over layers that are higher on the list."}),"\n",(0,t.jsx)(s.h2,{id:"layer-mode",children:"Layer mode"}),"\n",(0,t.jsxs)(s.p,{children:["Layers can blend with existing layers in different ways. The default, ",(0,t.jsx)(s.strong,{children:"source over"}),", draws the current layer on top of existing layers. Layer modes like ",(0,t.jsx)(s.strong,{children:"multiply"}),", ",(0,t.jsx)(s.strong,{children:"difference"}),", ",(0,t.jsx)(s.strong,{children:"xor"})," can help you spot differences between search traces."]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation",children:"A complete list of layer modes can be found here."})})]})}function h(e={}){const{wrapper:s}={...(0,a.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8943:(e,s,r)=>{r.d(s,{Z:()=>t});const t=r.p+"assets/images/image-3-dc3de9fbfbc0310e12900e30e8d6bdaf.png"},4634:(e,s,r)=>{r.d(s,{Z:()=>t});const t=r.p+"assets/images/image-4-d5921dcc70f3596d58fb41220b006b4b.png"},5e3:(e,s,r)=>{r.d(s,{Z:()=>t});const t=r.p+"assets/images/image-5-70182f1c83386bab2b9f01d55c891169.png"},1151:(e,s,r)=>{r.d(s,{Z:()=>o,a:()=>i});var t=r(7294);const a={},n=t.createContext(a);function i(e){const s=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(n.Provider,{value:s},e.children)}}}]);