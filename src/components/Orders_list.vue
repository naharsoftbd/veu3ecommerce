<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    
  </div>
  <div class="container">
        <h3 class="p-3 text-center">Ordered By </h3>
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Product Name</th>
                    <th>Order Price</th>
                    <th>Order Status</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in data" :key="order.id">
                    <td>{{order.id}}</td>
                    <td>{{order.product_name}}</td>
                    <td>{{order.price}}</td>
                    <td>{{order.order_status}}</td>
                    <td><router-link to="/order/" class ="btn btn-info">{{order.user_name}}</router-link></td>
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
export default {
  name: 'Orders_list',
  props: {
    msg: String
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
   function fetchData() {
      loading.value = true;
  // I prefer to use fetch
  // you can use use axios as an alternative
  return fetch('http://localhost/wedevsecom/?orders=read', {
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
      data.value = json.orders;
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

    return {
      data,
      loading,
      error
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
.container{
  text-align:center;
  margin: 0 auto;
}
.container table{
  width:100%;
}
</style>
