import{r as i,j as e}from"./app-BEi0-HLK.js";function g(){const[r,d]=i.useState(0),[n,c]=i.useState(!1),[o,l]=i.useState(0);i.useEffect(()=>{const t=()=>d(window.scrollY);return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]),i.useEffect(()=>{const t=setInterval(()=>{l(a=>(a+1)%4)},2800);return()=>clearInterval(t)},[]);const p=[{icon:"▦",label:"INVENTORY",desc:"Track every product and stock level — built specifically for Dsunny's catalog and operations."},{icon:"◈",label:"SALES & ORDERS",desc:"Simplify how Dsunny processes sales and manages orders from start to finish."},{icon:"◉",label:"REPORTS",desc:"Monitor Dsunny's performance with real-time insights and tailored analytics."},{icon:"◎",label:"STAFF",desc:"Manage Dsunny's employees, roles, and system access with full control."}],x=[{num:"1",label:"STORE. DSUNNY."},{num:"100%",label:"BUILT FOR YOU"},{num:"REAL",label:"TIME INSIGHTS"},{num:"ZERO",label:"GENERIC SETUP"}];return e.jsxs("div",{style:{background:"#0a0a0a",minHeight:"100vh",fontFamily:"'DM Mono', monospace",overflowX:"hidden"},children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Barlow+Condensed:wght@300;400;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #e8c547; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        .fade-up { animation: fadeUp 0.7s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.35s; }
        .d4 { animation-delay: 0.5s; }
        .d5 { animation-delay: 0.65s; }

        .nav-link {
          color: #444; font-size: 11px; letter-spacing: 0.15em;
          text-decoration: none; transition: color 0.2s;
        }
        .nav-link:hover { color: #e8c547; }

        .cta-primary {
          background: #e8c547; color: #0a0a0a; border: none;
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 14px 32px; cursor: pointer; transition: all 0.2s;
          text-decoration: none; display: inline-block;
        }
        .cta-primary:hover { background: #f5d660; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,197,71,0.25); }

        .cta-secondary {
          background: transparent; color: #555; border: 1px solid #222;
          font-family: 'Barlow Condensed', sans-serif; font-weight: 600;
          font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
          padding: 14px 32px; cursor: pointer; transition: all 0.2s;
          text-decoration: none; display: inline-block;
        }
        .cta-secondary:hover { border-color: #e8c547; color: #e8c547; }

        .feature-card {
          border: 1px solid #1a1a1a; padding: 32px;
          transition: all 0.35s ease; cursor: pointer;
          position: relative; overflow: hidden; background: #0a0a0a;
        }
        .feature-card::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(232,197,71,0.05) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.35s;
        }
        .feature-card:hover::before, .feature-card.active::before { opacity: 1; }
        .feature-card:hover, .feature-card.active { border-color: #e8c547; transform: translateY(-2px); }

        .stat-item {
          border-left: 1px solid #1a1a1a; padding: 0 40px; transition: border-color 0.3s;
        }
        .stat-item:hover { border-left-color: #e8c547; }
        .stat-item:first-child { border-left: none; padding-left: 0; }

        .ticker-wrap { overflow: hidden; white-space: nowrap; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; }
        .ticker-inner { display: inline-flex; animation: ticker 22s linear infinite; }

        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px);
          background-size: 60px 60px; opacity: 0.4;
        }

        .yellow-dot {
          width: 6px; height: 6px; background: #e8c547;
          border-radius: 50%; animation: pulse 2s ease infinite; display: inline-block;
        }

        .section-label {
          font-size: 10px; letter-spacing: 0.25em; color: #e8c547;
          text-transform: uppercase; margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
        }
        .section-label::before {
          content: ''; display: block; width: 20px; height: 1px; background: #e8c547;
        }

        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; }
        .hamburger span { display: block; width: 22px; height: 1px; background: #555; transition: all 0.3s; }

        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .desktop-nav { display: none !important; }
          .hero-title { font-size: 52px !important; line-height: 0.9 !important; }
          .stats-row { flex-direction: column; gap: 24px !important; }
          .stat-item { border-left: none !important; border-top: 1px solid #1a1a1a; padding: 24px 0 0 0 !important; }
          .stat-item:first-child { border-top: none; padding-top: 0 !important; }
          .features-grid { grid-template-columns: 1fr 1fr !important; }
          .split-section { flex-direction: column !important; }
          .split-section > * { width: 100% !important; }
          .hero-btns { flex-direction: column; align-items: flex-start; }
          .cta-band { padding: 48px 28px !important; margin: 0 24px 60px !important; }
          .cta-band h2 { font-size: 44px !important; }
          section, footer { padding-left: 24px !important; padding-right: 24px !important; }
          .ticker-wrap { display: none; }
        }
      `}),e.jsxs("nav",{style:{position:"fixed",top:0,left:0,right:0,zIndex:100,background:r>40?"rgba(10,10,10,0.95)":"transparent",backdropFilter:r>40?"blur(12px)":"none",borderBottom:r>40?"1px solid #1a1a1a":"1px solid transparent",transition:"all 0.4s ease",padding:"0 48px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:26,height:26,border:"2px solid #e8c547",display:"grid",gridTemplateColumns:"1fr 1fr",gap:3,padding:4},children:[...Array(4)].map((t,a)=>e.jsx("div",{style:{background:a===0?"#e8c547":"#2a2a2a"}},a))}),e.jsx("span",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontWeight:800,fontSize:17,color:"#f0f0f0",letterSpacing:"0.1em"},children:"DSUNNY"}),e.jsx("span",{style:{color:"#2a2a2a",fontSize:11,letterSpacing:"0.05em",marginLeft:2},children:"STORE"})]}),e.jsx("div",{className:"desktop-nav",style:{display:"flex",alignItems:"center",gap:36},children:["FEATURES","REPORTS","STAFF","CONTACT"].map(t=>e.jsx("a",{href:`#${t.toLowerCase()}`,className:"nav-link",children:t},t))}),e.jsxs("div",{className:"desktop-nav",style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx("a",{href:"/login",className:"nav-link",children:"LOG IN"}),e.jsx("a",{href:"#",className:"cta-primary",style:{padding:"10px 22px",fontSize:11},children:"ACCESS SYSTEM"})]}),e.jsxs("button",{className:"hamburger",onClick:()=>c(!n),children:[e.jsx("span",{style:{transform:n?"rotate(45deg) translate(4px, 4px)":"none"}}),e.jsx("span",{style:{opacity:n?0:1}}),e.jsx("span",{style:{transform:n?"rotate(-45deg) translate(4px, -4px)":"none"}})]})]}),n&&e.jsxs("div",{style:{position:"fixed",top:64,left:0,right:0,zIndex:99,background:"#0d0d0d",borderBottom:"1px solid #1a1a1a",padding:"24px 32px",display:"flex",flexDirection:"column",gap:20},children:[["FEATURES","REPORTS","STAFF","LOG IN"].map(t=>e.jsx("a",{href:"#",className:"nav-link",style:{fontSize:14},children:t},t)),e.jsx("a",{href:"#",className:"cta-primary",style:{textAlign:"center",marginTop:8},children:"ACCESS SYSTEM →"})]}),e.jsxs("section",{style:{position:"relative",minHeight:"100vh",display:"flex",alignItems:"center",overflow:"hidden"},children:[e.jsx("div",{className:"grid-bg"}),e.jsx("div",{style:{position:"absolute",top:"10%",right:"5%",width:500,height:500,background:"radial-gradient(circle, rgba(232,197,71,0.07) 0%, transparent 65%)",pointerEvents:"none",transform:`translateY(${r*.15}px)`}}),e.jsx("div",{style:{position:"absolute",bottom:"15%",left:"0%",width:300,height:300,background:"radial-gradient(circle, rgba(232,197,71,0.04) 0%, transparent 65%)",pointerEvents:"none"}}),e.jsxs("div",{style:{maxWidth:1200,margin:"0 auto",padding:"120px 48px 80px",width:"100%"},children:[e.jsxs("div",{className:"fade-up d1 section-label",style:{marginBottom:28},children:[e.jsx("span",{className:"yellow-dot"}),"DEDICATED STORE MANAGEMENT · BUILT FOR DSUNNY"]}),e.jsxs("h1",{className:"fade-up d2 hero-title",style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:96,fontWeight:900,color:"#f0f0f0",lineHeight:.88,letterSpacing:"-0.01em",marginBottom:32,maxWidth:820},children:["DSUNNY STORE.",e.jsx("br",{}),e.jsx("span",{style:{color:"#e8c547"},children:"YOUR STORE,"}),e.jsx("br",{}),"SIMPLIFIED."]}),e.jsx("p",{className:"fade-up d3",style:{color:"#555",fontSize:14,lineHeight:2,letterSpacing:"0.04em",maxWidth:480,marginBottom:44},children:"Dsunny Store is built exclusively for Dsunny. Manage inventory, track sales, process orders, and generate reports — no generic setup, no extra noise. Everything here is made just for you."}),e.jsxs("div",{className:"fade-up d4 hero-btns",style:{display:"flex",gap:16,alignItems:"center"},children:[e.jsx("a",{href:"#",className:"cta-primary",children:"ACCESS THE SYSTEM →"}),e.jsx("a",{href:"#features",className:"cta-secondary",children:"SEE FEATURES"})]}),e.jsxs("div",{className:"fade-up d5",style:{display:"inline-flex",alignItems:"center",gap:12,border:"1px solid #1a1a1a",padding:"12px 20px",marginTop:52,background:"rgba(255,255,255,0.02)"},children:[e.jsx("span",{className:"yellow-dot"}),e.jsx("span",{style:{color:"#333",fontSize:11,letterSpacing:"0.12em"},children:"TAILORED EXCLUSIVELY FOR DSUNNY · NOT A GENERIC TOOL"})]})]})]}),e.jsx("div",{className:"ticker-wrap",style:{padding:"14px 0"},children:e.jsx("div",{className:"ticker-inner",children:[...Array(2)].map((t,a)=>e.jsx("span",{style:{display:"inline-flex"},children:["INVENTORY TRACKING","SALES PROCESSING","ORDER MANAGEMENT","REAL-TIME REPORTS","STAFF ACCESS CONTROL","DSUNNY-ONLY SETUP","PERFORMANCE ANALYTICS","STOCK MONITORING"].map((s,f)=>e.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:24},children:[e.jsx("span",{style:{color:"#2a2a2a",fontSize:11,letterSpacing:"0.2em"},children:s}),e.jsx("span",{style:{color:"#e8c547",margin:"0 24px"},children:"◆"})]},f))},a))})}),e.jsx("section",{style:{padding:"80px 48px",maxWidth:1200,margin:"0 auto"},children:e.jsx("div",{className:"stats-row",style:{display:"flex",gap:0},children:x.map((t,a)=>e.jsxs("div",{className:"stat-item",style:{flex:1},children:[e.jsx("div",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:52,fontWeight:800,color:"#f0f0f0",lineHeight:1,letterSpacing:"-0.01em",marginBottom:8},children:t.num}),e.jsx("div",{style:{color:"#333",fontSize:10,letterSpacing:"0.2em"},children:t.label})]},a))})}),e.jsxs("section",{id:"features",style:{padding:"80px 48px",maxWidth:1200,margin:"0 auto"},children:[e.jsx("div",{className:"section-label",children:"WHAT IT DOES"}),e.jsxs("h2",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:52,fontWeight:800,color:"#f0f0f0",letterSpacing:"0.01em",marginBottom:16,lineHeight:1},children:["EVERYTHING DSUNNY",e.jsx("br",{}),e.jsx("span",{style:{color:"#e8c547"},children:"ACTUALLY NEEDS."})]}),e.jsx("p",{style:{color:"#333",fontSize:12,letterSpacing:"0.08em",marginBottom:48,maxWidth:480,lineHeight:1.9},children:"No bloat. No features for someone else's store. Just the tools Dsunny needs to run smoothly every day."}),e.jsx("div",{className:"features-grid",style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:1,background:"#111"},children:p.map((t,a)=>e.jsxs("div",{className:`feature-card ${o===a?"active":""}`,onMouseEnter:()=>l(a),children:[e.jsx("div",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:28,color:o===a?"#e8c547":"#2a2a2a",marginBottom:20,transition:"color 0.3s"},children:t.icon}),e.jsx("div",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontWeight:700,fontSize:16,color:"#f0f0f0",letterSpacing:"0.1em",marginBottom:12},children:t.label}),e.jsx("p",{style:{color:"#444",fontSize:12,lineHeight:1.9,letterSpacing:"0.03em"},children:t.desc}),e.jsx("div",{style:{marginTop:28,color:o===a?"#e8c547":"#1a1a1a",fontSize:18,transition:"color 0.3s"},children:"→"})]},a))})]}),e.jsx("section",{style:{padding:"80px 48px",maxWidth:1200,margin:"0 auto"},children:e.jsxs("div",{className:"split-section",style:{display:"flex",gap:80,alignItems:"center"},children:[e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"section-label",children:"THE DSUNNY DIFFERENCE"}),e.jsxs("h2",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:52,fontWeight:800,color:"#f0f0f0",lineHeight:1,marginBottom:28},children:["NOT BUILT FOR",e.jsx("br",{}),"EVERYONE.",e.jsx("br",{}),e.jsx("span",{style:{color:"#e8c547"},children:"BUILT FOR YOU."})]}),e.jsx("p",{style:{color:"#444",fontSize:13,lineHeight:2,letterSpacing:"0.04em",marginBottom:36},children:"Generic store systems come with features for hundreds of different businesses. Dsunny Store strips all of that away. Every screen, every report, every workflow is shaped around how Dsunny operates — nothing more, nothing less."}),["Inventory configured for Dsunny's product catalog","Reports designed around Dsunny's KPIs","Staff roles built for Dsunny's team structure","No irrelevant settings or confusing toggles"].map((t,a)=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:14},children:[e.jsx("div",{style:{width:5,height:5,background:"#e8c547",flexShrink:0}}),e.jsx("span",{style:{color:"#555",fontSize:12,letterSpacing:"0.06em"},children:t})]},a))]}),e.jsx("div",{style:{flex:1,position:"relative"},children:e.jsxs("div",{style:{border:"1px solid #1a1a1a",padding:40,background:"rgba(255,255,255,0.01)",position:"relative"},children:[[{top:"-1px",left:"-1px",borderTop:"2px solid #e8c547",borderLeft:"2px solid #e8c547"},{top:"-1px",right:"-1px",borderTop:"2px solid #e8c547",borderRight:"2px solid #e8c547"},{bottom:"-1px",right:"-1px",borderBottom:"2px solid #e8c547",borderRight:"2px solid #e8c547"},{bottom:"-1px",left:"-1px",borderBottom:"2px solid #e8c547",borderLeft:"2px solid #e8c547"}].map((t,a)=>e.jsx("div",{style:{position:"absolute",width:12,height:12,...t}},a)),e.jsx("div",{style:{fontFamily:"'Barlow Condensed'",color:"#e8c547",fontSize:11,letterSpacing:"0.2em",marginBottom:24},children:"DSUNNY · LIVE OVERVIEW"}),[{label:"TODAY'S SALES",val:"₦ 847,200",up:!0},{label:"PENDING ORDERS",val:"23",up:!0},{label:"LOW STOCK ITEMS",val:"4 PRODUCTS",up:!1},{label:"STAFF ON DUTY",val:"6",up:!0}].map((t,a)=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 0",borderBottom:a<3?"1px solid #111":"none"},children:[e.jsx("span",{style:{color:"#333",fontSize:10,letterSpacing:"0.15em"},children:t.label}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{fontFamily:"'Barlow Condensed'",fontWeight:700,color:"#f0f0f0",fontSize:18,letterSpacing:"0.05em"},children:t.val}),e.jsx("span",{style:{color:t.up?"#4ade80":"#f87171",fontSize:10},children:t.up?"▲":"▼"})]})]},a)),e.jsxs("div",{style:{marginTop:28},children:[e.jsx("div",{style:{color:"#222",fontSize:10,letterSpacing:"0.15em",marginBottom:12},children:"DSUNNY WEEKLY SALES"}),e.jsx("div",{style:{display:"flex",gap:6,alignItems:"flex-end",height:52},children:[45,60,38,75,50,88,62].map((t,a)=>e.jsx("div",{style:{flex:1,height:`${t}%`,background:a===5?"#e8c547":"#1a1a1a",transition:"height 0.5s ease"}},a))}),e.jsx("div",{style:{display:"flex",gap:6,marginTop:6},children:["M","T","W","T","F","S","S"].map((t,a)=>e.jsx("div",{style:{flex:1,textAlign:"center",color:"#222",fontSize:9},children:t},a))})]})]})})]})}),e.jsxs("section",{style:{padding:"80px 48px",maxWidth:1200,margin:"0 auto"},children:[e.jsx("div",{className:"section-label",children:"HOW IT WORKS"}),e.jsxs("h2",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:52,fontWeight:800,color:"#f0f0f0",lineHeight:1,marginBottom:56},children:["SIMPLE BY",e.jsx("br",{}),e.jsx("span",{style:{color:"#e8c547"},children:"DESIGN."})]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:1,background:"#111"},children:[{step:"01",title:"LOG IN",body:"Authorized Dsunny staff access the system securely. No public signups — access is controlled."},{step:"02",title:"MANAGE",body:"Update inventory, process orders, and track sales in real time — all within a clean, focused interface."},{step:"03",title:"REPORT",body:"Generate performance reports for Dsunny at any time. Know exactly where things stand."}].map((t,a)=>e.jsxs("div",{style:{background:"#0a0a0a",padding:36,borderTop:a===1?"2px solid #e8c547":"2px solid transparent",transition:"border-color 0.3s"},onMouseEnter:s=>s.currentTarget.style.borderTopColor="#e8c547",onMouseLeave:s=>s.currentTarget.style.borderTopColor=a===1?"#e8c547":"transparent",children:[e.jsx("div",{style:{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:72,color:"#111",lineHeight:1,marginBottom:20},children:t.step}),e.jsx("div",{style:{fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:20,color:"#f0f0f0",letterSpacing:"0.1em",marginBottom:12},children:t.title}),e.jsx("p",{style:{color:"#444",fontSize:12,lineHeight:1.9,letterSpacing:"0.04em"},children:t.body})]},a))})]}),e.jsxs("section",{className:"cta-band",style:{margin:"0 48px 80px",border:"1px solid #1a1a1a",padding:"72px 60px",position:"relative",overflow:"hidden",background:"rgba(232,197,71,0.02)"},children:[e.jsx("div",{style:{position:"absolute",top:"-50%",right:"-10%",width:400,height:400,background:"radial-gradient(circle, rgba(232,197,71,0.08) 0%, transparent 65%)",pointerEvents:"none"}}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("div",{className:"section-label",children:"READY TO GO"}),e.jsxs("h2",{style:{fontFamily:"'Barlow Condensed', sans-serif",fontSize:64,fontWeight:900,color:"#f0f0f0",lineHeight:.95,letterSpacing:"-0.01em",marginBottom:24},children:["DSUNNY'S STORE.",e.jsx("br",{}),e.jsx("span",{style:{color:"#e8c547"},children:"FULLY IN CONTROL."})]}),e.jsx("p",{style:{color:"#444",fontSize:13,letterSpacing:"0.05em",marginBottom:40,maxWidth:420,lineHeight:2},children:"Everything you need to run Dsunny is right here. Inventory, sales, reports, and staff — simplified and in one place, exactly how Dsunny needs it."}),e.jsxs("div",{style:{display:"flex",gap:16,flexWrap:"wrap"},children:[e.jsx("a",{href:"#",className:"cta-primary",children:"ACCESS THE SYSTEM →"}),e.jsx("a",{href:"#features",className:"cta-secondary",children:"LEARN MORE"})]})]})]}),e.jsxs("footer",{style:{borderTop:"1px solid #111",padding:"36px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10},children:[e.jsx("div",{style:{width:20,height:20,border:"1.5px solid #e8c547",display:"grid",gridTemplateColumns:"1fr 1fr",gap:2,padding:3},children:[...Array(4)].map((t,a)=>e.jsx("div",{style:{background:a===0?"#e8c547":"#1a1a1a"}},a))}),e.jsx("span",{style:{fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:14,color:"#2a2a2a",letterSpacing:"0.1em"},children:"DSUNNY STORE"})]}),e.jsx("div",{style:{display:"flex",gap:28},children:["FEATURES","REPORTS","STAFF","CONTACT"].map(t=>e.jsx("a",{href:"#",className:"nav-link",children:t},t))}),e.jsx("span",{style:{color:"#1a1a1a",fontSize:10,letterSpacing:"0.1em"},children:"© 2026 DSUNNY. INTERNAL USE ONLY."})]})]})}export{g as default};
