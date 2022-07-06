import { v4 as uuidv4 } from 'uuid';
//要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = ()=>{
   //先从本地存储获取uuid（确认下本地存储里面是否已经生成过uuid_token）
   let uuid_token = localStorage.getItem('UUIDTOKEN');
   //如果没有
   if(!uuid_token){
       //生成游客临时身份
      uuid_token = uuidv4();
      //本地存储存储一次
      localStorage.setItem('UUIDTOKEN',uuid_token);
   }
   //切记有返回值,没有返回值会返回undefined
   return uuid_token;
}
