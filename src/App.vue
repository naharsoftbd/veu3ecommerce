<template >
  <div id="nav" v-if="isLogedIn">
    <router-link to="/" class ="btn btn-info">Home</router-link> |
    <router-link :to="/products/+user_id" class ="btn btn-info">Products</router-link> |
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
         user_id
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
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
