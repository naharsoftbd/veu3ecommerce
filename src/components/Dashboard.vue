<template>
  
  <div class="container">
        <h3 class="p-3 text-center">Products </h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in data" :key="product.id">
                    <td>{{product.id}}</td>
                    <td><router-link :to="/product/+product.id" class ="btn btn-info">{{product.name}}</router-link></td>
                    <td>{{product.price}}</td>
                    <td><router-link :to="/product/+product.id" class ="btn btn-info"><img alt="Vue logo" :src="product.image"  width="100"></router-link></td>
                    <td><router-link :to="/editproduct/+product.id" class ="btn btn-success">Edit</router-link> <button class="btn btn-danger" @click="onDelete(product.id)">Delete</button></td>
                    
                </tr>
            </tbody>
        </table>
    </div>    
  <p v-if="loading">
   Still loading..
  </p>
  <p v-if="error">


  </p>
  
</template>

<script>
import { ref, onMounted} from "vue";
import { useRoute } from 'vue-router';
import router from '../router';
export default {
  name: 'Dashboard',
  props: {
    msg: String
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    let isLogedIn = ref(false);
   function fetchData() {
      loading.value = true;
  // I prefer to use fetch
  // you can use use axios as an alternative
  return fetch('http://localhost/wedevsecom/?products=read', {
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
      data.value = json.products;
      console.log(data.value);
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
      fetchData();
    });
    function onDelete(product_id) {

    return fetch('http://localhost/wedevsecom/?products=delete&product_id='+product_id, {
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
      data.value = json.products;
      router.push({ name: 'Dashboard'});
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

    return {
      data,
      loading,
      error,
      route,
      isLogedIn,
      onDelete,
      router
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
  color: #FFFFFF;
}
.container{
  text-align:center;
  margin: 0 auto;
}
.container table{
  width:100%;
}
</style>
