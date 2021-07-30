(this.webpackJsonpreactsweeper=this.webpackJsonpreactsweeper||[]).push([[0],{32:function(e,t,n){},33:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n(0),s=n.n(c),a=n(15),r=n.n(a),l=(n(32),n(10)),o=(n(33),function(){return Object(i.jsx)("div",{className:"logo",children:Object(i.jsx)(l.b,{to:"/",children:"ReactSweeper"})})}),u=(n(38),function(){return Object(i.jsx)("nav",{className:"nav",children:Object(i.jsxs)("ul",{children:[Object(i.jsx)("li",{children:Object(i.jsx)(l.b,{to:"/",children:"Home"})}),Object(i.jsx)("li",{children:Object(i.jsx)(l.b,{to:"/about",children:"About"})})]})})}),d=(n(39),function(){return Object(i.jsxs)("header",{className:"header",children:[Object(i.jsx)(o,{}),Object(i.jsx)(u,{})]})}),j=n(4),b=function(){return Object(i.jsxs)("div",{className:"about-page page",children:[Object(i.jsx)("h2",{children:"About"}),Object(i.jsxs)("p",{children:["Thanks for checking out our app! Our team built this app to learn the concepts for",Object(i.jsxs)("ul",{children:[Object(i.jsx)("li",{children:"React"}),Object(i.jsx)("li",{children:"Redux"}),Object(i.jsx)("li",{children:"React Router"}),Object(i.jsx)("li",{children:"TypeScript"}),Object(i.jsx)("li",{children:"React Hooks"})]})]}),Object(i.jsxs)("p",{children:[Object(i.jsx)("strong",{children:"Team B-Nazty\u2122"})," is a group of engineers varying in experience and skill levels. We meet weekly to discuss current trends and to share ideas and concepts. And more importantly, we meet to work on projects together. Fun projects, like unneccesarily rewriting minesweeper in React JS. No one asked for it, but here it is. You are welcome."]})]})},h=n(9),m=(n(41),function(e){var t={backgroundPositionX:-13*e.display};return Object(i.jsx)("div",{className:"digit",style:t})}),O=(n(42),function(e){var t=e.display.toString().padStart(3,"0").split("");return Object(i.jsx)("div",{className:"number-display bevel-down",children:t.map((function(e,t){return Object(i.jsx)(m,{display:Number(e)},t)}))})}),f=n(18),v=n(3),g=n(19),x={beginner:{width:9,height:9,numMines:10},intermediate:{width:9,height:9,numMines:10},boss:{width:9,height:9,numMines:10}},p={states:{untouched:"UNTOUCHED",flagged:"FLAGGED",unknown:"UNKNOWN",checked:"CHECKED",exploded:"EXPLODED"}},w=function(){var e=Object(h.b)(),t=Object(h.c)((function(e){return e.game}));function n(e){var t=0,n=0,i=0;return e.forEach((function(e){e.state===p.states.flagged&&e.isMine&&t++,e.isMine&&n++,e.state===p.states.checked&&i++})),console.log({numMines:n,numMinesFlagged:t,numChecked:i}),n===t||e.length-n===i}var i=Object(c.useCallback)((function(t){console.log("init game cb");var n=x[t],i=Array(n.numMines).fill({isMine:!0}),c=Array(n.width*n.height-n.numMines).fill({isMine:!1}),s=[].concat(Object(g.a)(i),Object(g.a)(c)).sort((function(){return Math.random()-.5})),a=s.map((function(e,t){var i,c,a,r,l,o,u,d,j=t<n.width,b=t>0&&(t+1)%n.width===0,h=t>=(n.width-1)*n.height,m=t%n.width===0,O=t-n.width,f=t-n.width+1,g=t+1,x=t+n.width+1,w=t+n.width,y=t+n.width-1,M=t-1,k=t-n.width-1,G=0;return!j&&(null===(i=s[O])||void 0===i?void 0:i.isMine)&&G++,j||b||!(null===(c=s[f])||void 0===c?void 0:c.isMine)||G++,!b&&(null===(a=s[g])||void 0===a?void 0:a.isMine)&&G++,b||h||!(null===(r=s[x])||void 0===r?void 0:r.isMine)||G++,!h&&(null===(l=s[w])||void 0===l?void 0:l.isMine)&&G++,h||m||!(null===(o=s[y])||void 0===o?void 0:o.isMine)||G++,!m&&(null===(u=s[M])||void 0===u?void 0:u.isMine)&&G++,j||m||!(null===(d=s[k])||void 0===d?void 0:d.isMine)||G++,Object(v.a)(Object(v.a)({},e),{},{count:G,id:t,state:p.states.untouched})}));console.log({cells:a});var r={type:"init.game",height:n.height,numMines:n.numMines,numMinesRemaining:n.numMines,width:n.width,cells:a,difficultyLevel:t};e(r)}),[e]),s=Object(c.useCallback)((function(n){var i=t.cells.map((function(e){return e.state===p.states.flagged?e:Object(v.a)(Object(v.a)({},e),{},{state:n.id===e.id?p.states.exploded:p.states.checked})}));console.log({gameOverCells:i}),e({type:"game.over",cells:i})}),[e,t]),a=Object(c.useCallback)((function(i){if(!t.isGameActive&&!t.isGameOver){e({type:"game.start"})}var c=Object(g.a)(t.cells),a=l(i),r=n(c);(n(c),a)||e({type:"update.cells",cells:c});if(r){e({type:"game.won"})}function l(e){return e.state!==p.states.checked&&(e.isMine?(console.error(" BOOM! "),s(e),!0):!!t.isGameOver||e.state!==p.states.flagged&&e.state!==p.states.unknown&&(c=c.map((function(t){return t.id===e.id?Object(v.a)(Object(v.a)({},t),{},{state:p.states.checked}):t})),void(0===e.count&&function(e){var n=e.id<t.width,i=e.id>0&&(e.id+1)%t.width===0,s=e.id>=(t.width-1)*t.height,a=e.id%t.width===0,r=e.id-t.width,o=e.id-t.width+1,u=e.id+1,d=e.id+t.width+1,j=e.id+t.width,b=e.id+t.width-1,h=e.id-1,m=e.id-t.width-1;n||l(c[r]);n||i||l(c[o]);i||l(c[u]);i||s||l(c[d]);s||l(c[j]);s||a||l(c[b]);a||l(c[h]);a||n||l(c[m])}(e))))}}),[e,t,s]),r=Object(c.useCallback)((function(e,t){return t-e.reduce((function(e,t){return t.state===p.states.flagged?e+1:e}),0)}),[]),l=Object(c.useCallback)((function(i){var c=i.state,s=r(t.cells,t.numMines);switch(i.state){case p.states.untouched:if(0===s)return;c=p.states.flagged;break;case p.states.flagged:c=p.states.unknown;break;case p.states.unknown:c=p.states.untouched}if(n(t.cells.map((function(e){return e.id===i.id?Object(v.a)(Object(v.a)({},e),{},{state:c}):e})))){e({type:"game.won"})}var a={type:"check.cell",cellId:i.id,state:c};e(a)}),[e,t,r]);return{initGameCB:i,gameOverCB:s,checkCellCB:a,setFlagStateCB:l,getNumMinesRemainingCB:r}},y=(n(43),"up"),M="down",k="exploded",G="win",N=function(e){var t=e.difficultyLevel,n=e.isGameOver,s=e.isGameWon,a=Object(c.useState)(y),r=Object(f.a)(a,2),l=r[0],o=r[1],u=w().initGameCB;Object(c.useEffect)((function(){n&&!s?o(k):s&&o(G)}),[n,s]);return Object(i.jsx)("div",{className:"smiley ".concat(l),onMouseDown:function(){o(M)},onMouseUp:function(){o(y),u(t)}})},C=function(e){var t=e.isGameActive,n=Object(c.useState)(0),s=Object(f.a)(n,2),a=s[0],r=s[1];return Object(c.useEffect)((function(){var e=null;return t?e=setInterval((function(){r((function(e){return e+1}))}),1e3):(clearInterval(e),r(0)),function(){return clearInterval(e)}}),[t]),Object(i.jsx)(O,{display:a})},A=(n(44),function(e){var t=e.game,n=e.numMinesRemaining;return Object(i.jsxs)("div",{className:"game-head bevel-down",children:[Object(i.jsx)(O,{display:n}),Object(i.jsx)(N,{isGameOver:t.isGameOver,difficultyLevel:t.difficultyLevel,isGameWon:t.isGameWon}),Object(i.jsx)(C,{isGameActive:t.isGameActive})]})}),E=(n(45),{UNTOUCHED:{state:"untouched",x:0,y:-39},EMPTY:{state:"empty",x:0,y:-23},FLAGGED:{state:"flag",x:-16,y:-39},UNKNOWN:{state:"unknown",x:-80,y:-39},EXPLODED:{state:"exploded",x:-32,y:-39}}),B=function(e){e.id;var t=e.cell,n=w(),c=n.checkCellCB,s=n.setFlagStateCB;var a={backgroundPositionX:function(){switch(t.state){case p.states.untouched:case p.states.flagged:case p.states.unknown:case p.states.exploded:return E[t.state].x}return t.isMine?-64:t.count>0?-16*t.count:0}(),backgroundPositionY:function(){switch(t.state){case p.states.untouched:case p.states.flagged:case p.states.unknown:case p.states.exploded:return E[t.state].y}return t.isMine?-39:-23}(),color:t.isMine?"red":"black"};return Object(i.jsx)("div",{className:"cell",onContextMenu:function(e){e.preventDefault(),s(t)},onClick:function(){c(t)},style:a})},R=(n(46),function(e){var t=e.width,n=(e.height,Object(h.c)((function(e){return e.game})).cells);console.log("rendering game body");var c={width:16*t};return Object(i.jsx)("div",{className:"game-body bevel-down",style:c,children:n.map((function(e,t){return Object(i.jsx)(B,{id:t,cell:e},t)}))})}),D=s.a.memo(R),L=(n(47),function(){var e=Object(h.c)((function(e){return e.game})),t=w(),n=t.initGameCB,s=(0,t.getNumMinesRemainingCB)(e.cells,e.numMines);return Object(c.useEffect)((function(){n("beginner")}),[n]),Object(i.jsxs)("div",{className:"gameboard bevel-up",children:[Object(i.jsx)(A,{game:e,numMinesRemaining:s}),Object(i.jsx)(D,{width:e.width,height:e.height})]})}),S=(n(48),function(){return Object(i.jsx)("div",{className:"home-page",children:Object(i.jsx)(L,{})})}),W=function(){return Object(i.jsx)("div",{className:"routes",children:Object(i.jsxs)(j.c,{children:[Object(i.jsx)(j.a,{path:"/about",children:Object(i.jsx)(b,{})}),Object(i.jsx)(j.a,{path:"/",children:Object(i.jsx)(S,{})})]})})},I=(n(49),function(){return Object(i.jsx)("footer",{className:"footer",children:"ReactSweeper\u2122 \xa9 2020 B-Nazty, Inc."})});n(50),n(51);var U=function(){return Object(i.jsxs)("div",{className:"app",children:[Object(i.jsx)(d,{}),Object(i.jsx)("main",{children:Object(i.jsx)(W,{})}),Object(i.jsx)(I,{})]})},F=n(12),P={cells:[],height:0,numMines:0,numMinesRemaining:0,timer:0,width:0,isGameOver:!1,isGameActive:!1,isGameWon:!1,difficultyLevel:"beginner"};var T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"init.game":return Object(v.a)(Object(v.a)(Object(v.a)({},e),t),{},{isGameOver:!1,isGameActive:!1,isGameWon:!1,difficultyLevel:t.difficultyLevel});case"game.start":return Object(v.a)(Object(v.a)({},e),{},{isGameActive:!0});case"game.won":return Object(v.a)(Object(v.a)({},e),{},{isGameActive:!1,isGameOver:!0,isGameWon:!0});case"game.over":return Object(v.a)(Object(v.a)({},e),{},{isGameOver:!0,isGameActive:!1,isGameWon:!1,cells:t.cells});case"check.cell":return Object(v.a)(Object(v.a)({},e),{},{cells:e.cells.map((function(e){return e.id===t.cellId?Object(v.a)(Object(v.a)({},e),{},{state:t.state}):e}))});case"update.cells":return Object(v.a)(Object(v.a)({},e),{},{cells:t.cells});default:return e}},H=Object(F.b)({game:T}),X=Object(F.c)(H);r.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(h.a,{store:X,children:Object(i.jsx)(l.a,{children:Object(i.jsx)(U,{})})})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.c53ba1f3.chunk.js.map