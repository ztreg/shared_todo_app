(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"1a3e":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"q-pa-md center bg-grey-9 text-white"},[o("ProfileComponent")],1)},s=[],n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-page",[o("LogoutComponent"),o("div",{staticClass:"text-h4 text-center"},[e._v("All data on you")]),o("q-btn-dropdown",{staticClass:"glossy q-ma-sm ",attrs:{color:"green-2",icon:"edit",label:"Edit Username"}},[o("div",{staticClass:"row no-wrap q-pa-md"},[o("q-input",{attrs:{label:"new username *",autofocus:""},model:{value:e.newName,callback:function(t){e.newName=t},expression:"newName"}}),o("q-separator",{staticClass:"q-mx-lg",attrs:{vertical:"",inset:""}}),o("div",{staticClass:"column items-center"},[o("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{color:"secondary",label:"Update user",push:"",size:"md"},on:{click:function(t){return e.editUsername(e.newName)}}})],1)],1)]),o("q-btn",{staticClass:"glossy q-ma-sm",attrs:{label:"Delete account",color:"red"},on:{click:function(t){return e.deleteProfile()}}}),e.allowedCookies?o("p",{staticClass:"text-body1"},[e._v(" You have allowed cookies on this site")]):e._e(),e.newUsername?o("div",{staticClass:"h4"},[e._v("Logga ut och in igen med nytt användarnamn "+e._s(e.newUsername))]):e._e(),o("div",{staticClass:"row"},[o("ProfileAllTodos"),o("ProfileAllLists")],1),o("ProfileArchive")],1)},r=[],i=(o("e6cf"),o("c973")),l=o.n(i),c=o("ded3"),d=o.n(c),u=o("2f62"),m=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"q-pa-md row items-start q-gutter-md"},[o("div",{staticClass:"text-h4 col-12 text-center"},[e._v("Your completed todos")]),e._l(e.finishedTodos,(function(t,a){return o("div",{key:a},[o("q-card",{staticClass:"my-card",attrs:{flat:"",bordered:""}},[o("q-card-section",{attrs:{horizontal:""}},[o("q-card-section",{staticClass:"q-pt-xs"},[o("div",{staticClass:"text-body1 text-black"},[e._v("\n           Todo title: "+e._s(t.title)+"\n           ")]),o("div",{staticClass:"text-body1 text-black"},[e._v("\n           Todo user: "+e._s(t.userid)+"\n           ")])])],1),o("q-separator"),o("q-card-actions",[o("q-btn",{attrs:{flat:"",color:"primary"}},[e._v("\n           Finished: "+e._s(t.updatedAt)+"\n         ")])],1)],1)],1)}))],2)},p=[],h={name:"ProfileArchive",data(){return{finishedTodos:[],lorem:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",token:"",test:""}},mounted(){this.token=localStorage.getItem("token"),this.fetchFinished()},computed:d()({},Object(u["b"])(["auth"])),components:{ProfileComponent:X},methods:{fetchFinished(){var e=this;return l()((function*(){yield fetch("/api/todo/?finished=true",{headers:{Authorization:"Bearer "+e.token,"Content-Type":"application/json"}}).then(e=>e.json()).then(t=>{e.finishedTodos=t}).catch(e=>{console.error("There was a error fetching:"+e)})}))()}}},f=h,v=o("2877"),g=o("f09f"),b=o("a370"),C=o("eb85"),k=o("4b7e"),_=o("9c40"),w=o("eebe"),q=o.n(w),y=Object(v["a"])(f,m,p,!1,null,null,null),T=y.exports;q()(y,"components",{QCard:g["a"],QCardSection:b["a"],QSeparator:C["a"],QCardActions:k["a"],QBtn:_["a"]});var x=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"col-6 col-md-6"},[o("q-item-section",{staticClass:"text-h5"},[e._v("All todos on you")]),o("div",{staticClass:"text-h6"},[e._v("Todo Titel & Todo Status")]),e._l(e.allTodos,(function(t,a){return o("q-list",{key:a,staticClass:"q-pa-md bg-grey-2 text-black ",staticStyle:{"max-width":"350px"},attrs:{bordered:"",separator:""}},[o("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[o("q-item-section",[e._v(e._s(t.title))]),o("q-item-section",[e._v(e._s(t.done))])],1)],1)}))],2)},A=[],S={name:"ProfileAllTodos",data(){return{allTodos:[]}},mounted(){this.token=localStorage.getItem("token"),this.fetchAllTodos()},computed:d()({},Object(u["b"])(["auth"])),methods:{fetchAllTodos(){var e=this;return l()((function*(){yield fetch("/api/users/gdpr/"+e.auth.userid,{headers:{Authorization:"Bearer "+e.token,"Content-Type":"application/json"}}).then(e=>e.json()).then(t=>{console.log(t.todos),e.allTodos=t.todos}).catch(e=>{console.error("There was a error fetching:"+e)})}))()}}},j=S,L=o("4074"),P=o("1c1c"),Q=o("66e5"),I=o("714f"),O=Object(v["a"])(j,x,A,!1,null,null,null),U=O.exports;q()(O,"components",{QItemSection:L["a"],QList:P["a"],QItem:Q["a"]}),q()(O,"directives",{Ripple:I["a"]});var E=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"col-6 col-md-6"},[o("div",{staticClass:"text-h6"},[e._v("List Titel & List Skapare")]),e._l(e.allLists,(function(t,a){return o("q-list",{key:a,staticClass:"q-pa-md bg-grey-2 text-black ",staticStyle:{"max-width":"350px"},attrs:{bordered:"",separator:""}},[o("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""}},[o("q-item-section",[e._v(e._s(t.title))]),o("q-item-section",[e._v(e._s(t.creator))])],1)],1)}))],2)},B=[],N={name:"ProfileAllLists",data(){return{allLists:[]}},mounted(){this.token=localStorage.getItem("token"),this.fetchAllTodos()},computed:d()({},Object(u["b"])(["auth"])),methods:{fetchAllTodos(){var e=this;return l()((function*(){yield fetch("/api/users/gdpr/"+e.auth.userid,{headers:{Authorization:"Bearer "+e.token,"Content-Type":"application/json"}}).then(e=>e.json()).then(t=>{console.log(t.lists),e.allLists=t.lists}).catch(e=>{console.error("There was a error fetching:"+e)})}))()}}},$=N,z=Object(v["a"])($,E,B,!1,null,null,null),D=z.exports;q()(z,"components",{QList:P["a"],QItem:Q["a"],QItemSection:L["a"]}),q()(z,"directives",{Ripple:I["a"]});class F{static editUser(e,t,o){return l()((function*(){return console.log("making full users request for id "+t),yield fetch("api/users/"+t,{method:"PATCH",headers:{Authorization:"Bearer "+o,"Content-Type":"application/json"},body:JSON.stringify({username:e})})}))()}}var J=F,R=o("6b34"),Y={name:"TodoArchive",props:{theuser:String},data(){return{token:"",name:"",allowedCookies:!1,newUsername:""}},mounted(){this.token=localStorage.getItem("token"),this.allowedCookies=localStorage.getItem("allowCokokie")},computed:d()({},Object(u["b"])(["auth"])),components:{ProfileArchive:T,ProfileAllTodos:U,ProfileAllLists:D,LogoutComponent:R["a"]},methods:{deleteProfile(){var e=this;return l()((function*(){const t=yield fetch("/api/users/"+e.auth.userid,{method:"DELETE",headers:{Authorization:"Bearer "+e.token,"Content-Type":"application/json"}});console.log(t),localStorage.removeItem("token"),localStorage.removeItem("showUsers"),localStorage.removeItem("role"),e.$router.go("/")}))()},editUsername(e){var t=this;return l()((function*(){yield J.editUser(e,t.auth.userid,t.token);t.newUsername=e}))()}}},H=Y,G=(o("eaf1"),o("9989")),K=o("f20b"),M=o("27f9"),V=o("7f67"),W=Object(v["a"])(H,n,r,!1,null,"3e13956a",null),X=W.exports;q()(W,"components",{QPage:G["a"],QBtnDropdown:K["a"],QInput:M["a"],QSeparator:C["a"],QBtn:_["a"]}),q()(W,"directives",{ClosePopup:V["a"]});var Z={name:"LoginPage",data(){return{}},components:{ProfileComponent:X}},ee=Z,te=Object(v["a"])(ee,a,s,!1,null,null,null);t["default"]=te.exports},"6b34":function(e,t,o){"use strict";var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("q-btn",{staticClass:"float-right",attrs:{label:"Logout",color:"red"},on:{click:function(t){return e.logOut()}}})},s=[],n={name:"LogoutComponent",data(){return{}},methods:{logOut(){localStorage.removeItem("token"),localStorage.removeItem("showUsers"),localStorage.removeItem("role"),this.$router.go("/")}}},r=n,i=o("2877"),l=o("9c40"),c=o("eebe"),d=o.n(c),u=Object(i["a"])(r,a,s,!1,null,null,null);t["a"]=u.exports;d()(u,"components",{QBtn:l["a"]})},8932:function(e,t,o){},eaf1:function(e,t,o){"use strict";var a=o("8932"),s=o.n(a);s.a}}]);