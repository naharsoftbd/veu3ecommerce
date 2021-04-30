<template>
  <div class="hello">
    <h1>Create Product</h1>
    
  </div>
  <div class="container">
  <form class="form-horizontal" @submit.prevent="onSubmit()">
  <div class="form-group">
    <label class="control-label col-sm-2" for="product_name">Product Name:</label>
    <div class="col-sm-10">
    <input name="product_name" id="product_name" type="text" class="form-control" placeholder="Product Name" required>
     </div>
  </div>
    <div class="form-group">
    <label class="control-label col-sm-2" for="product_sku">Sku:</label>
    <div class="col-sm-10">
    <input type="text" name="product_sku" id="product_sku" class="form-control"  placeholder = "Product Sku" required>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-2" for="product_price">Price:</label>
    <div class="col-sm-10">
    <input type="text" name="product_price" id="product_price" class="form-control"  placeholder = "Price" required>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-2" for="product_image">Image:</label>
    <div class="col-sm-10">
    <input type="file" name="product_image" id="product_image" class="form-control"  placeholder = "Price" required>
    </div>
  </div>
   
    <div class="form-group">
      <label class="control-label col-sm-2" for="comment">Description:</label>
      <div class="col-sm-10">
      <textarea class="form-control" rows="5" id="comment"></textarea>
      </div>
    </div>
    <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
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
export default {
  name: 'CreateProduct',
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
  return fetch('http://localhost/wedevsecom/?products=create&user_id=2', {
    method: 'post',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', 
    headers: {
      'Content-Type':'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: JSON.stringify({"name" : "Amazing Pillow 2.0",
    "price" : "199",
    "sku" : "202323",
    "description" : "The best pillow for amazing programmers.",
    "category_id" : 2})
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
      //fetchData();
      
    });

    function onSubmit() {
         fetchData();
        
      }

    return {
      data,
      loading,
      error,
      route,
      product,
      onSubmit
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
.control-label{
  float:left;
  text-align:left;
}
.container{
  text-align:left;
}
</style>
