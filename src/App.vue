<template >
  <div id="nav" v-if="isLogedIn && user_role == 1">
    <router-link to="/dashboard" class ="btn btn-info" >Dashboard</router-link> |
    <router-link to="/createproduct" class ="btn btn-info" >Create Product</router-link> |
    <router-link to="/products/" class ="btn btn-info">Products</router-link> |
    <router-link to="/orders" class ="btn btn-info">Orders</router-link> |
    <router-link to="/logout" class ="btn btn-info">Logout</router-link>
   
  </div>
  <div id="nav" v-if="isLogedIn && user_role != 1">
    <router-link to="/products/" class ="btn btn-info">Products</router-link> |
    <router-link to="/orders" class ="btn btn-info">Orders</router-link> |
    <router-link to="/logout" class ="btn btn-info">Logout</router-link>
   
  </div>
  <router-view/>
  
</template>
<script>
import { ref, onMounted} from "vue";
export default {
setup() {

   let isLogedIn = ref(false);
   let user_id = localStorage.getItem("user_id");
   let user_role = localStorage.getItem("user_role");
    
  onMounted(() => {
           if(localStorage.getItem("user_id")){
              isLogedIn.value = true ;
            }else{
              isLogedIn.value = false ;
            }
           user_id = localStorage.getItem("user_id");
           
    });
    return {
         isLogedIn,
         user_id,
         user_role
    };
}
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #FFFFFF;
}

#nav a.router-link-exact-active {
  color: #000000;
}
</style>
