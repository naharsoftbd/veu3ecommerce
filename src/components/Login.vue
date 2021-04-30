<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <form class="form-inline" @submit.prevent="onSubmit()">
    <div class="form-row align-items-center">
    <div class="col-auto">
    <input name="username" type="email" class="form-control" v-model="model.username" placeholder="User Email" required>
    </div>
    <div class="col-auto">
    <input type="password" name="password" class="form-control" v-model="model.password" placeholder = "Password" required>
    </div>
    <div class="col-auto">
    <input type="submit" class="btn btn-primary mb-2" value="Login" />
    </div>
    </div>
    </form>
  </div>
  
</template>

<script>
import { ref, onMounted} from "vue";
import { useRoute } from 'vue-router';
import router from '../router';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
export default {
  name: 'Login',
  props: {
    msg: String
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    let isLogedIn = ref(null);
    const model = ref({ username: "", password: ""});
    const route = useRoute();

   function fetchData() {
      loading.value = true;
  // I prefer to use fetch
  // you can use use axios as an alternative
  return fetch('http://localhost/wedevsecom/?user=login&username='+model.value.username+'&password='+model.value.password, {
    method: 'get',
    //mode: "no-cors",
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  })
    .then(res => {
      // a non-200 response code
      if (!res.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText);
        error.json = res.json();
        throw error;
      }
      
      return res.json();
    })
    .then(json => {
      // set the response data
      data.value = json.user;
      console.log(data.value[0]);
      localStorage.setItem("user_id",data.value[0].id);
      localStorage.setItem("user_role",data.value[0].user_role);
      if(data.value[0].user_role==1){
        router.push({ name: 'Dashboard'});
      }else{
        router.push({ name: 'Products'});
      }
      
    })
    .catch(err => {
      error.value = err;
      // In case a custom JSON error response was provided
      if (err.json) {
        return err.json.then(json => {
          // set the JSON response message
          error.value.message = json.message;
        });
      }
    })
    .then(() => {
      loading.value = false;
    });
    }

    onMounted(() => {
      //fetchData();
      
    });


      function onSubmit() {
        isLogedIn = fetchData();
        
      }

    return {
      data,
      loading,
      error,
      model,
      onSubmit,
      isLogedIn,
      route
    };
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form {
    margin: 0 auto;
    width: 540px;
}
</style>
