(this.webpackJsonpmeshnet=this.webpackJsonpmeshnet||[]).push([[0],{20:function(e,t,n){},28:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),r=n(5),i=n.n(r),c=(n(20),n(3)),o=n(2),l=n(6),d=n(15),u=n.n(d),b=n(0);var h=n(11);function f(e){var t=e.node,n=e.className,a=e.onDrag,r=e.destroyNode,i=e.onClick,c=(t.id,t.pos);t.peers,Object(s.useRef)();return Object(b.jsx)(u.a,{positionOffset:{x:-32,y:-32},defaultClassName:"absolute node-container ".concat(n),position:c,onDrag:function(e,t){var n=t.x,s=t.y;return a({x:n,y:s})},onMouseDown:function(e){return i(e)},bounds:"parent",children:Object(b.jsxs)("div",{className:"node transition-color select-none font-mono text-white flex flex-col justify-center items-center overflow-visible whitespace-nowrap hover:animate-ping",children:[Object(b.jsx)("div",{className:"text-xs flex justify-center items-center font-bold bg-green-600 hover:bg-green-500 w-16 h-16 z-20 rounded-full shadow-xl",children:c.x+" "+c.y}),Object(b.jsxs)("div",{className:"hidden controls absolute z-0 top-full bg-gray-600 rounded-b-full p-1 pt-6 -mt-4 flex-col justify-end items-center gap-1",children:[Object(b.jsx)("button",{className:"rounded-full bg-gray-500 hover:bg-blue-500 w-8 h-8 flex justify-center items-center",onClick:null,children:Object(b.jsx)(h.b,{className:"text-white transform translate-y-0.5 -translate-x-px"})}),Object(b.jsx)("button",{className:"rounded-full bg-gray-500 hover:bg-red-600 w-8 h-8 flex justify-center items-center",onClick:r,children:Object(b.jsx)(h.a,{className:"text-white"})})]}),Object(b.jsx)("div",{className:"absolute transition-all duration-400 ease-out node-range z-0 bg-transparent rounded-full border w-0 h-0 opacity-0"})]})})}function j(e){var t=e.pos,n=Object(s.useRef)();return Object(s.useEffect)((function(){}),[]),Object(b.jsx)("circle",{ref:n,r:"8",cx:t.x,cy:t.y,fill:"orange",className:"packet transition-all duration-500 ease-out"})}function p(e){var t=e.from,n=e.to;return Object(b.jsx)("line",{x1:t.x,y1:t.y,x2:n.x,y2:n.y,className:"line"})}var x=n(9),v=n(10),y=n(30),O=function(){function e(t){Object(x.a)(this,e),this.id=Object(y.a)(),this.data=t.data||"Boop!",this.destination=t.destination,this.source=t.source,this.route=[],this.station=t.station,this.created=Date.now(),this.suspended=!1}return Object(v.a)(e,[{key:"pos",get:function(){return this.station.pos||null}},{key:"x",get:function(){return this.station.pos.x}},{key:"y",get:function(){return this.station.pos.y}}]),e}(),m=function(){function e(t){var n=this;Object(x.a)(this,e),this.id=Object(y.a)(),this.pos=t.pos||{x:0,y:0},this.peers={},this.packets=[],this.updatePacketState=t.updatePacketState,this.mingle=setInterval((function(){setTimeout((function(){n.suspended||n.sendData(null,Object.keys(n.peers)[Math.floor(Math.random()*Object.keys(n.peers).length)])}),1200*Math.random())}),800)}return Object(v.a)(e,[{key:"x",get:function(){return this.pos.x}},{key:"y",get:function(){return this.pos.y}},{key:"updatePos",value:function(e){var t=e.x,n=e.y;this.pos={x:t,y:n}}},{key:"addPeer",value:function(e){this.peers[e.id]||(this.peers=Object(o.a)(Object(o.a)({},this.peers),{},Object(c.a)({},e.id,e)))}},{key:"removePeer",value:function(e){this.peers[e.id]&&delete this.peers[e.id]}},{key:"sendData",value:function(e,t){if(t){var n=new O({data:e,destination:t,source:this.id,station:this});this.storePacket(n),this.updatePacketState(n,"CREATE")}}},{key:"forwardPacket",value:function(e){this.peers[e.destination]?(e.route.push(this.id),this.peers[e.destination].storePacket(e),this.updatePacketState(e,"UPDATE")):this.storePacket(e)}},{key:"openPacket",value:function(e){this.updatePacketState(e,"DELETE")}},{key:"storePacket",value:function(e){e.station=this,this.packets.push(e),this.handlePackets()}},{key:"handlePackets",value:function(){var e,t=this;do{(e=this.packets.shift())&&Date.now()-e.created>5e3&&this.updatePacketState(e,"DELETE")}while(e&&Date.now()-e.created>5e3);e&&setTimeout((function(){t.suspended?t.updatePacketState(e,"DELETE"):e.destination===t.id?t.openPacket(e):t.forwardPacket(e)}),600)}},{key:"clearPackets",value:function(){for(var e=this.packets.shift();e;)this.updatePacketState(e,"DELETE"),e=this.packets.shift()}},{key:"clearPeers",value:function(){for(var e=0,t=Object.values(this.peers);e<t.length;e++){delete t[e].peers[this.id]}}},{key:"suspend",value:function(){this.suspended=!0,clearInterval(this.mingle),this.clearPackets(),this.clearPeers()}}]),e}();var g=function(){var e=Object(s.useState)({}),t=Object(l.a)(e,2),n=t[0],a=t[1],r=Object(s.useState)({}),i=Object(l.a)(r,2),d=i[0],u=i[1],h=Object(s.useState)({}),x=Object(l.a)(h,2),v=x[0],y=x[1],O=Object(s.useRef)({}),g=function(e,t){switch(t.toUpperCase()){case"CREATE":case"UPDATE":O.current[e.id]=e,y(Object(o.a)({},O.current));break;case"DELETE":delete O.current[e.id],y(Object(o.a)({},O.current))}},k=function(e){var t=new m({pos:e,updatePacketState:g});P(t)},w=function(e){var t=Object(o.a)({},n),s=Object(o.a)({},d);e.suspend();for(var r=0,i=Object.values(t[e.id].peers);r<i.length;r++){var c=i[r];delete s[[e.id,c.id].sort().join("+")]}delete t[e.id],a(t),u(s)},P=function(e,t){var s=Object(o.a)(Object(o.a)({},n),{},Object(c.a)({},e.id,e)),r=Object(o.a)({},d);t&&(e.pos=t),Object.values(s).forEach((function(t){if(e.id!==t.id){var n=Math.hypot(e.pos.x-t.pos.x,e.pos.y-t.pos.y),a=[e.id,t.id].sort().join("+");n<=300?(r[a]={from:e.pos,to:t.pos},s[e.id].addPeer(t),s[t.id].addPeer(e)):(delete r[a],s[e.id].removePeer(t),s[t.id].removePeer(e))}})),a(s),u(r)};return Object(b.jsxs)("div",{className:"h-screen w-full flex flex-col overflow-hidden",children:[Object(b.jsxs)("div",{className:"w-full relative z-50 bg-gray-800 border-b-2 border-gray-500 mx-auto flex justify-center items-center py-4 gap-8",children:[Object(b.jsx)("div",{className:"rounded-lg border-2 border-gray-400",children:Object(b.jsx)("button",{title:"Add Node",className:"flex justify-center items-center font-bold text-white  leading-none rounded-md p-3 px-3 w-40 max-w-prose border-b-4 border-blue-800 hover:bg-blue-400 bg-blue-500 active:border-b-2 -mt-0.5 active:mt-0",onClick:function(){return k()},children:"Add Node"})}),Object(b.jsx)("div",{className:"rounded-lg border-2 border-gray-400",children:Object(b.jsx)("button",{title:"Clear",className:"flex justify-center items-center font-bold text-white  leading-none rounded-md p-3 px-3 w-40 max-w-prose border-b-4 border-red-800 hover:bg-red-400 bg-red-500 active:border-b-2 -mt-0.5 active:mt-0",onClick:function(){for(var e=0,t=Object.values(n);e<t.length;e++){t[e].suspend()}O.current={},a({}),u({}),y({})},children:"Clear"})})]}),Object(b.jsxs)("div",{className:"relative bg-gray-700 flex-grow justify-center flex",children:[Object(b.jsxs)("div",{className:"bg-gray-600 absolute top-0 text-white p-2 px-4 rounded-b-xl opacity-80",children:[Object(b.jsxs)("p",{children:[Object(b.jsx)("strong",{children:"Double click"})," to create new node"]}),Object(b.jsxs)("p",{children:[Object(b.jsx)("strong",{children:"Middle click"})," to destroy node"]})]}),Object(b.jsx)("div",{onDoubleClick:function(e){return function(e){var t=e.nativeEvent,n=t.layerX,s=t.layerY;k({x:n,y:s})}(e)},className:"absolute z-20 w-full h-full",children:Object.keys(n).length>0?Object.values(n).map((function(e){return Object(b.jsx)(f,{node:e,destroyNode:function(){return w(e)},onClick:function(t){return function(e,t){switch(t.button){case 1:w(e)}}(e,t)},onDrag:function(t){return P(e,t)}},e.id)})):null}),Object(b.jsxs)("svg",{width:"100%",height:"100%",className:"absolute z-0",xmlns:"http://www.w3.org/2000/svg",children:[Object.keys(d).map((function(e){var t=d[e],n=t.from,s=t.to;return Object(b.jsx)(p,{from:n,to:s},e)})),Object.keys(v).map((function(e){return Object(b.jsx)(j,{pos:v[e].pos},e)}))]}),Object(b.jsx)("div",{className:"relative z-10 w-full h-full transition-all"})]})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,31)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),r(e),i(e)}))};i.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(g,{})}),document.getElementById("root")),k()}},[[28,1,2]]]);
//# sourceMappingURL=main.98cca133.chunk.js.map