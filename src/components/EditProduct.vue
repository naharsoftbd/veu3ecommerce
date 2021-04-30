<template>
  <div class="hello">
    <h1>Create Product</h1>
    
  </div>
  <div class="container">
  <form class="form-horizontal" @submit.prevent="onSubmit()">
  <div class="form-group">
    <label class="control-label col-sm-2" for="product_name">Product Name:</label>
    <div class="col-sm-10">
    <input name="product_name" v-model="model.name" id="product_name"  type="text" class="form-control" placeholder="Product Name" required>
     </div>
  </div>
    <div class="form-group">
    <label class="control-label col-sm-2" for="product_sku">Sku:</label>
    <div class="col-sm-10">
    <input type="text" name="product_sku" v-model="model.sku" id="product_sku" class="form-control"  placeholder = "Product Sku" required>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-2" for="product_price">Price:</label>
    <div class="col-sm-10">
    <input type="text" name="product_price" v-model="model.price" id="product_price" class="form-control"  placeholder = "Price" required>
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-2" for="product_image">Image:</label>
    <div class="col-sm-10">
    <img v-show="imageUrl"
           :src="imageUrl"
           class="w-10 h-10 object-cover">
    <input type="file" accept="image/*" name="product_image" id="product_image" class="form-control"  placeholder = "Price" required @change="handleImageSelected">
    </div>
  </div>
   
    <div class="form-group">
      <label class="control-label col-sm-2" for="comment">Description:</label>
      <div class="col-sm-10">
      <textarea class="form-control" rows="5" name="description" v-model="model.description" id="comment"></textarea>
      </div>
    </div>
    <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
    </div>    
  
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import router from '../router';
export default {
  name: 'EditProduct',
  props: {
    msg: String
  },
  setup() {
    const data = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const route = useRoute();
    const product = ref(null);
    let imageFile = ref("");
    let imageUrl = ref("");
    const model = ref({ name: "", sku: "", price: "", description: ""});


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
      model.value = data.value[0];

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

    function updateData(formdata){

    let datas = {}; 
     for(var pair of formdata.entries()) {
       datas[pair[0]]=pair[1];
    }
    //console.log(datas);
  return fetch('http://localhost/wedevsecom/?products=update', {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', 
    headers: {
      //'Content-Type':'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: JSON.stringify(datas)
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
     console.log(json.message);

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
      
    });
    
    }

    function onSubmit() {
        let formdata = new FormData();
        formdata.append("image", imageFile.value);
        formdata.append("name", model.value.name);
        formdata.append("price", model.value.price);
        formdata.append("sku", model.value.sku);
        formdata.append("description", model.value.description);
        formdata.append("user_id",localStorage.getItem("user_id"));
        formdata.append("id",route.params.id);
        updateData(formdata);
        
      }
    function handleImageSelected(event) {
    if (event.target.files.length === 0) {
      imageFile.value = "";
      imageUrl.value = "";
      return;
    }

    imageFile.value = event.target.files[0];
  }

  watch(imageFile, (imageFile) => {
    if (!(imageFile instanceof File)) {
      return;
    }

    let fileReader = new FileReader();

    fileReader.readAsDataURL(imageFile);

    fileReader.addEventListener("load", () => {
      imageUrl.value = fileReader.result;
    });
  });

    return {
      data,
      loading,
      error,
      route,
      product,
      onSubmit,
      handleImageSelected,
      imageFile,
      imageUrl,
      router,
      model
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
