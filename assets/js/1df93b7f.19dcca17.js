"use strict";(self.webpackChunkdocs_2=self.webpackChunkdocs_2||[]).push([[3237],{9860:(t,e,i)=>{i.d(e,{e:()=>n});const n=t=>({display:"grid",gridAutoFlow:"row",gridTemplateColumns:`repeat(auto-fill, minmax(min(100%, ${t}px), 1fr))`})},3482:(t,e,i)=>{i.r(e),i.d(e,{default:()=>q});var n=i(1036),r=i(7699),s=i(5273),o=i(7331),a=i(8459),l=i(4669),c=i(5616),d=i(1730),h=i(8298),x=i(7739),u=i(5861),p=i(9417),g=i(6274),m=i(8269),b=i(3946),j=i(491),f=i(44),Z=i(3795),v=i(2734),w=i(1796),y=i(1519),k=i(2430),S=i(3584),C=i(9559),I=i(6486),P=i(8070),z=i(6303),D=i(3652),W=(i(9867),i(7294)),E=i(3935),A=i(3421);const F=JSON.parse('{"gW":"ShortestPathLab","YN":"https://pathfinding.ai","u2":"Posthoc","BD":"Open Posthoc Web","pt":"img/logo192.png","DX":"Close video","yg":"media/clip.webm","FD":"video/webm","Gd":"https://posthoc.pathfinding.ai","NS":[{"key":"docs","label":"Docs","url":"./docs/overview"},{"key":"blog","label":"Blog","url":"./blog"},{"key":"github","label":"Github","url":"https://github.com/shortestpathlab/posthoc"}],"lj":[{"url":"img/gallery/astar.png","label":"Demonstration, A* search"},{"url":"img/gallery/complex-view.png","label":"Post-game analysis, StarCraft"},{"url":"img/gallery/image-7.png","label":"Compression algorithm analysis, RLE"},{"url":"img/gallery/image-3.png","label":"Debugging, duel euclidean path search"},{"url":"img/gallery/room-detection.png","label":"Debugging, room detection algorithm"}],"ct":"Understand decision-making processes intuitively.","DS":"Posthoc is a zero-commitment visualiser that is useful from the get-go.","F9":"Get started","SL":"./docs/get-started","Q1":"Accepted into the ICAPS 24 Demo Track","gd":"We\'re excited to present Posthoc to the search and planning community","bo":"Team","_E":"Built with passion by ShortestPathLab @ Monash University","W7":"Show video","dk":[{"title":"Posthoc","links":[{"label":"Open Posthoc","url":"https://posthoc.pathfinding.ai"},{"label":"Docs","url":"./docs/overview"},{"label":"Github","url":"https://github.com/shortestpathlab/posthoc"}]},{"title":"ShortestPathLab","links":[{"label":"Home","url":"https://pathfinding.ai/"},{"label":"Benchmarks","url":"https://benchmarks.pathfinding.ai/"},{"label":"Tracker","url":"https://tracker.pathfinding.ai/"},{"label":"Github","url":"https://github.com/ShortestPathLab"}]},{"title":"Monash Optimisation","links":[{"label":"Home","url":"https://www.monash.edu"}]}],"Bz":[{"name":"Kevin Zheng","title":"Posthoc lead developer","avatar":null,"github":"https://github.com/Spaaaacccee"},{"name":"Dr Daniel Harabor","title":"Associate Professor","avatar":null,"github":"https://harabor.net/daniel"},{"name":"Dr Michael Wybrow","title":"Associate Professor","avatar":null,"github":"https://harabor.net/daniel"}],"$S":"Copyright \xa9 2024 Monash University"}');var B=i(9860),R=i(5893);const T=(0,A.lB)("dark"),V=t=>({opacity:+!t,transition:t=>t.transitions.create("opacity"),pointerEvents:t?"none":"all"}),L=function(t){return void 0===t&&(t=1),(0,I.times)(t,(()=>(0,R.jsx)(c.Z,{flex:1})))};function G(){return(0,d.Z)("(max-width: 580px)")}function M(t){let{showVideo:e}=t;const i=G(),o=(0,A.l7)(),a=(0,h.Z)({threshold:0,disableHysteresis:!0}),l=F.NS.map((t=>{let{url:e,label:i}=t;return(0,R.jsx)(x.Z,{sx:{py:1,px:2,borderRadius:4,justifyContent:"flex-start"},onClick:()=>location.href=e,children:(0,R.jsx)(u.Z,{variant:"body2",sx:{fontWeight:500},children:i})})})),d=(0,R.jsx)(p.Z,{startIcon:(0,R.jsx)(n.Z,{sx:{color:"primary.main"}}),sx:{py:1.5,px:2,color:"text.primary",borderRadius:32},onClick:()=>window.open(F.Gd),children:F.BD});return(0,R.jsx)(c.Z,{sx:{width:"100vw",position:"fixed",px:2,zIndex:t=>t.zIndex.appBar,...V(e)},children:(0,R.jsx)(g.Z,{in:!0,children:(0,R.jsxs)(m.Z,{gap:1,alignItems:"center",direction:"row",sx:{p:1,mx:"auto",mt:i?2:4,...a?{...o(1)}:{},width:1032,maxWidth:"100%",height:64,borderRadius:9},children:[(0,R.jsx)(c.Z,{sx:{ml:1,mr:2,height:32,minWidth:32},children:(0,R.jsx)(N,{})}),i?(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(c.Z,{sx:{flex:1}}),d,(0,R.jsx)(P.ZP,{variant:"popover",children:t=>(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(b.Z,{...(0,z.vW)(t),children:(0,R.jsx)(r.Z,{})}),(0,E.createPortal)((0,R.jsx)(g.Z,{in:t.isOpen,children:(0,R.jsx)(c.Z,{sx:{...o(0),position:"fixed",zIndex:t=>t.zIndex.modal,top:0,left:0,width:"100vw",height:"100vh",borderRadius:0},children:(0,R.jsxs)(m.Z,{gap:4,p:3.5,alignItems:"flex-end",children:[(0,R.jsx)(b.Z,{onClick:t.close,children:(0,R.jsx)(s.Z,{})}),l]})})}),document.body)]})})]}):(0,R.jsxs)(R.Fragment,{children:[l,L(),d]})]})})})}function N(t){return(0,R.jsx)("img",{src:F.pt,width:32,height:32,...t})}function O(){const t=(0,A.l7)(),[e,i]=(0,W.useState)(0);return(0,R.jsxs)(m.Z,{gap:4,children:[(0,R.jsx)(c.Z,{sx:{...t(0),overflow:"hidden",height:"fit-content",aspectRatio:1.6},children:(0,R.jsx)("img",{src:F.lj[e].url})}),(0,R.jsx)(j.Z,{variant:"scrollable",allowScrollButtonsMobile:!0,scrollButtons:!0,value:e,onChange:(t,e)=>i(e),sx:{" button.Mui-selected":{color:"text.primary"}},children:(0,I.map)(F.lj,((t,e)=>{let{label:i,url:n}=t;return(0,R.jsx)(f.Z,{label:i,value:e},n)}))})]})}function $(t){let{showVideo:e,onShowVideo:i}=t;const n=G();return(0,R.jsxs)(m.Z,{gap:4,justifyContent:"center",alignItems:n?"stretch":"flex-start",sx:{maxWidth:"100vw",minHeight:720,height:"90vh",textAlign:"left",pt:36,pb:16,mx:"auto"},children:[L(),(0,R.jsxs)(u.Z,{sx:{zIndex:1,mb:-2,pr:"8vw",fontWeight:600,color:"primary.main",fontSize:"1rem"},variant:"overline",children:[(0,R.jsx)(Z.Z,{href:F.YN,children:F.gW})," / ",F.u2]}),(0,R.jsx)(u.Z,{sx:{zIndex:1,pr:"8vw"},variant:"h1",children:F.ct}),(0,R.jsx)(u.Z,{sx:{zIndex:1},variant:"body2",color:"text.secondary",children:F.DS}),L(),(0,R.jsxs)(m.Z,{direction:n?"column":"row",gap:2,children:[(0,R.jsx)(p.Z,{sx:{py:2,px:4},variant:"contained",endIcon:(0,R.jsx)(o.Z,{}),onClick:()=>location.href=F.SL,children:F.F9}),(0,R.jsx)(p.Z,{onClick:()=>i(!0),startIcon:(0,R.jsx)(a.Z,{}),sx:{color:"text.secondary",py:2,px:4},children:F.W7})]}),L(4)]})}function H(t){let{title:e,subtitle:i,anchor:n}=t;return(0,R.jsxs)(m.Z,{id:n,alignItems:"center",gap:2,sx:{pt:16,pb:8},children:[(0,R.jsx)(u.Z,{sx:{textAlign:"center"},variant:"h2",children:e??"Title"}),(0,R.jsx)(u.Z,{sx:{textAlign:"center"},variant:"body2",color:"text.secondary",children:i??"Subtitle"})]})}function Q(t){let{image:e,title:i,subtitle:n,...r}=t;const s=(0,A.l7)();return(0,R.jsxs)(m.Z,{justifyContent:"center",alignItems:"center",gap:1,...r,sx:{...s(1),p:8,textAlign:"center",...r.sx},children:[e??(0,R.jsx)(c.Z,{height:64}),(0,R.jsx)(u.Z,{variant:"h3",children:i??"Title"}),(0,R.jsx)(u.Z,{variant:"body2",color:"text.secondary",children:n??"Subtitle"})]})}function U(t){let{showVideo:e,onShowVideo:i}=t;const n=(0,A.l7)(),r=(0,W.useRef)(),s=(0,v.Z)();let o=!1;return(0,W.useEffect)((()=>{const t=()=>{r.current&&!o&&(r.current.style.transform=`translateY(${-.75*document.documentElement.scrollTop}px)`,requestAnimationFrame(t))};return requestAnimationFrame(t),t(),()=>{o=!0}}),[]),(0,R.jsx)(R.Fragment,{children:(0,R.jsxs)(c.Z,{ref:r,sx:{position:"fixed",zIndex:e?1:0,height:"100vh",width:"100vw",transition:t=>t.transitions.create("z-index"),backgroundSize:"cover",backgroundPosition:"center"},children:[(0,R.jsx)("video",{muted:!e,autoPlay:!0,controls:e,width:"100%",height:"100%",loop:!0,style:{objectFit:e?"contain":"cover",background:s.palette.background.paper},children:(0,R.jsx)("source",{src:F.yg,type:F.FD})}),(0,R.jsx)(c.Z,{sx:{position:"absolute",width:"100%",height:"calc(100% + 1px)",top:0,left:0,zIndex:1,transition:t=>t.transitions.create("background"),...V(e),background:t=>`\n            linear-gradient(to bottom, ${(0,w.Fq)(t.palette.background.default,.9)} 60%, ${t.palette.background.default})\n            `}}),(0,R.jsx)(c.Z,{sx:{position:"absolute",top:0,left:0,p:4,zIndex:3,...V(!e)},children:(0,R.jsx)(p.Z,{variant:"contained",sx:{...n(1),py:1.5,px:4},startIcon:(0,R.jsx)(l.Z,{}),onClick:()=>i(!1),children:F.DX})})]})})}function _(){const t=G();return(0,R.jsx)(R.Fragment,{children:(0,R.jsx)(c.Z,{p:4,children:(0,R.jsxs)(m.Z,{gap:4,sx:{maxWidth:"100%",width:1e3,px:t?0:3,py:4,m:"0 auto"},children:[(0,R.jsxs)(m.Z,{direction:"row",gap:8,children:[(0,R.jsx)(N,{width:32,height:32}),(0,R.jsx)(m.Z,{sx:(0,B.e)(180),gap:8,flex:1,children:F.dk.map((t=>{let{title:e,links:i}=t;return(0,R.jsxs)(m.Z,{gap:1,sx:{flex:1},children:[(0,R.jsx)(u.Z,{variant:"body2",sx:{pb:2},children:e}),i.map((t=>{let{label:e,url:i}=t;return(0,R.jsx)(x.Z,{sx:{width:"100%",px:2,mx:-2,py:1,justifyContent:"flex-start",borderRadius:8,textAlign:"left"},onClick:()=>open(i),children:(0,R.jsx)(u.Z,{variant:"body2",color:"text.secondary",children:e})})}))]})}))})]}),L(),(0,R.jsx)(y.Z,{sx:{opacity:.25}}),(0,R.jsx)(u.Z,{textAlign:"right",color:"text.secondary",children:F.$S})]})})})}function q(){const t=(0,A.l7)(),[e,i]=(0,W.useState)(!1);return function(t){(0,W.useEffect)((()=>{let e=document.documentElement.scrollTop;const i=()=>{const i=document.documentElement.scrollTop;i>e&&t(!1),e=i};return addEventListener("scroll",i),()=>removeEventListener("scroll",i)}),[t])}(i),function(t){(0,W.useEffect)((()=>{t&&document.documentElement.scrollTo({top:0,behavior:"smooth"})}),[t])}(e),(0,W.useEffect)((()=>{(0,D.UN)(document.body,{overflow:{x:"hidden",y:"scroll"},scrollbars:{theme:"os-theme-light"}})}),[]),(0,R.jsx)(k.Z,{theme:T,children:(0,R.jsxs)(S.ZP,{children:[(0,R.jsx)(U,{showVideo:e,onShowVideo:i}),(0,R.jsx)(g.Z,{in:!e,children:(0,R.jsx)(c.Z,{sx:{position:"absolute",zIndex:e?1:0,height:"100vh",width:"100vw",top:"50vh",transition:t=>t.transitions.create(["z-index","opacity"]),backgroundSize:"cover",backgroundPosition:"center",background:"radial-gradient(46.56% 45.08% at 56.04% 55.33%,rgba(0,50,255,.2) 0,transparent 100%),radial-gradient(46.69% 41.74% at 69.64% 60.81%,rgba(192,59,196,.2) 0,transparent 100%),radial-gradient(59.78% 45.73% at 30.42% 58.68%,rgba(0,120,212,.2) 0,transparent 100%),radial-gradient(32.53% 31.57% at 50% 66.82%,rgba(70,54,104,.2) 0,transparent 100%)"}})}),(0,R.jsx)(c.Z,{sx:{...V(e),maxWidth:"100%",width:1064,px:4,m:"0 auto",pb:9,zIndex:3},children:(0,R.jsxs)(c.Z,{sx:{pb:9},children:[(0,R.jsx)($,{showVideo:e,onShowVideo:i}),(0,R.jsx)(O,{}),(0,R.jsx)(H,{title:F.Q1,subtitle:F.gd}),(0,R.jsx)(c.Z,{sx:{width:1e3,mx:"auto",maxWidth:"100%",aspectRatio:"16 / 10",overflow:"hidden",borderRadius:8},children:(0,R.jsx)("iframe",{src:"https://drive.google.com/file/d/1ve-GQbgj0MGcouCdE0gxQON-20rpxtW5/preview",width:"100%",height:"100%",allow:"autoplay"})}),(0,R.jsx)(H,{anchor:"team",title:F.bo,subtitle:F._E}),(0,R.jsx)(m.Z,{gap:4,sx:(0,B.e)(260),children:(0,I.map)(F.Bz,(e=>{let{avatar:i,name:n,title:r,github:s}=e;return(0,R.jsx)(x.Z,{sx:t(0),onClick:()=>!!s&&window.open(s),children:(0,R.jsx)(Q,{sx:{py:6},image:(0,R.jsx)(C.Z,{sx:{mb:4,width:64,height:64}}),title:n,subtitle:r})})}))})]})}),(0,R.jsx)(_,{}),(0,R.jsx)(M,{showVideo:e})]})})}}}]);