<template>
  <div class="about">
    <h1>This is an about page{{LogedIn}}</h1>
    <Login msg="Welcome to Your WE App"/>
  </div>
</template>
<script>
// @ is an alias to /src
import { ref, onMounted} from "vue";
import router from '../router';
export default {
  name: 'Home',
setup(){
let isLogedIn = ref(true);
onMounted(()=>{
      if(localStorage.getItem("user_id")){
       localStorage.clear();
       router.push('/');
       isLogedIn = false;
      }
    });
    return {
      isLogedIn
    };
  }
}
</script>