<template>
  <div class="about">
    <h1>This is an about page{{LogedIn}}</h1>
    <Login msg="Welcome to Your WE App"/>
  </div>
</template>
<script>
// @ is an alias to /src
import { ref, onMounted} from "vue";
export default {
  name: 'Home',
setup(){
let LogedIn = ref(true);
onMounted(()=>{
      if(localStorage.getItem("user_id")){
       localStorage.clear();
       this.$router.push("/");
      }
    });
    return {
      LogedIn
    };
  }
}
</script>