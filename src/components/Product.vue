<template>
  <div class="hello">
    <h1>{{ product?.name }}</h1>
    
  </div>
  <div class="container">
        <div class="product_image">
          <img alt="Vue logo" :src="product?.image"  width="400">
        </div>
        <div class="product_desc">
          {{product?.description}}
        </div>
        <br>
        <div class="product_meta">
        <button class="btn btn-success pull-left">Add to Cart</button>
        </div>
    </div>    
  <p v-if="loading">
   Still loading..
  </p>
  <p v-if="error">


  </p>
</template>

<script>
import { ref, onMounted} from "vue";
import { useRoute } from 'vue-router'
export default {
  name: 'Product',
  props: {
    msg: String
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    const product = ref(null);
   function fetchData() {
      loading.value = true;
  // I prefer to use fetch
  // you can use use axios as an alternative
  return fetch('http://localhost/wedevsecom/?products=read&id='+route.params.id, {
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
     product.value = data.value[0];

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
      error,
      route,
      product
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
  padding:0 15px;
}
.container table{
  width:100%;
}
.product_image{
  float:left;
  width:40%;
  
}
.product_desc{
  float:left;
  padding-left:15px;
  padding-bottom:10px;
  width:56%;
  text-align:left;

  
}
.product_meta{
  float:left;
  padding-left:15px;
  
  
}
.pull-left{
  float:left;
}
</style>
