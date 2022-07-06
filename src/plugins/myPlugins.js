//Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,options){
    /*  
        全局资源
        Vue.prototype.$bus: 任何组件都可以使用
        Vue.directive
        Vue.component
        Vue.filters:...

    */
    //全局指令
    Vue.directive(options.name,(element,params)=>{
       element.innerHTML = params.value.toUpperCase();
       console.log(params);
    });
}
//对外暴露组件对象
export default myPlugins;