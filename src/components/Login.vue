<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form novalidate @submit.prevent="onSubmit()">
    <input name="username" type="email" v-model="model.username" placeholder="User Email">
    <input type="password" name="password" v-model="model.password" placeholder = "Password">
    <input type="submit" class="btn btn-success" value="Login" />
    </form>
  </div>
  
</template>

<script>
import { ref, onMounted} from "vue";
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
      console.log(data.value[0].id);
      localStorage.setItem("user_id",data.value[0].id);
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
        this.$router.push("/products");
      }

    return {
      data,
      loading,
      error,
      model,
      onSubmit,
      isLogedIn
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
</style>
