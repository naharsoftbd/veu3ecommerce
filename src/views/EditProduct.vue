<template>
  <div class="home">
    
    <EditProduct msg="Welcome to Your WE App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import EditProduct from '@/components/EditProduct.vue'

export default {
  name: 'Home',
  components: {
    EditProduct
  }
}
</script>
