"use strict";(self.webpackChunkadaka_fe=self.webpackChunkadaka_fe||[]).push([[82],{82:(I,m,i)=>{i.r(m),i.d(m,{HomeModule:()=>T});var g=i(1316);function p(e,t,a,n,r,l,c){try{var u=e[l](c),s=u.value}catch(A){return void a(A)}u.done?t(s):Promise.resolve(s).then(n,r)}function f(e){return function(){var t=this,a=arguments;return new Promise(function(n,r){var l=e.apply(t,a);function c(s){p(l,n,r,c,u,"next",s)}function u(s){p(l,n,r,c,u,"throw",s)}c(void 0)})}}var h=i(1122),o=i(9468),v=function(e){return e.LOADING="Cargando",e.PLEASE_WAIT="Por favor espere",e.BUFFERING="Consultando",e.PROCESSING="Procesando",e.LOGIN="Login",e}(v||{}),d=i(7573),S=i(5940);let y=(()=>{var e;class t{constructor(n,r){this.message=n,this.dialogRef=r,r.disableClose=!0}}return(e=t).\u0275fac=function(n){return new(n||e)(o.Y36(d.WI),o.Y36(d.so))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-spinner"]],decls:7,vars:1,consts:[["mat-dialog-content",""],[1,"row","align-items-center"],[1,"col-4"],["color","primary","mode","indeterminate","value","50","diameter","40",1,"base-spinner","m-auto"],[1,"col-8"],[1,"titulo-2","fw-5"]],template:function(n,r){1&n&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2),o._UZ(3,"mat-progress-spinner",3),o.qZA(),o.TgZ(4,"div",4)(5,"span",5),o._uU(6),o.qZA()()()()),2&n&&(o.xp6(6),o.Oqu(r.message))},dependencies:[S.Ou,d.xY]}),t})(),P=(()=>{var e;class t{constructor(n){this.dialog=n}showLoadingModal(n=v.LOADING){var r=this;return f(function*(){0===r.loadingDialog?.getState()&&r.dismiss(),r.loadingDialog=r.dialog.open(y,{data:n,panelClass:"base-modal"})})()}dismiss(){this.loadingDialog&&0===this.loadingDialog?.getState()&&this.loadingDialog.close()}}return(e=t).\u0275fac=function(n){return new(n||e)(o.LFG(d.uw))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),t})();const H=[{path:"",component:(()=>{var e;class t{constructor(n,r){this.router=n,this.loadingService=r}ngOnInit(){this.initializeProperties()}initializeProperties(){var n=this;return f(function*(){n.loadingService.showLoadingModal(),setTimeout(()=>{n.loadingService.dismiss()},3e3)})()}goToLanding(){this.router.navigate([h.R.LANDING])}}return(e=t).\u0275fac=function(n){return new(n||e)(o.Y36(g.F0),o.Y36(P))},e.\u0275cmp=o.Xpm({type:e,selectors:[["app-home"]],decls:4,vars:0,consts:[[3,"click"]],template:function(n,r){1&n&&(o.TgZ(0,"p"),o._uU(1,"Hello Word"),o.qZA(),o.TgZ(2,"button",0),o.NdJ("click",function(){return r.goToLanding()}),o._uU(3,"Ir a Landing Page"),o.qZA())}}),t})()}];let C=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[g.Bz.forChild(H)]}),t})(),T=(()=>{var e;class t{}return(e=t).\u0275fac=function(n){return new(n||e)},e.\u0275mod=o.oAB({type:e}),e.\u0275inj=o.cJS({imports:[C]}),t})()}}]);