<template>
  <div class="home">
    
    <CreateProduct msg="Welcome to Your WE App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateProduct from '@/components/CreateProduct.vue'

export default {
  name: 'Home',
  components: {
    CreateProduct
  }
}
</script>
