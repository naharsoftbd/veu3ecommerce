<template>
  <div class="home">
    
    <Products_list msg="Welcome to Your WE App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Products_list from '@/components/Products_list.vue'

export default {
  name: 'Home',
  components: {
    Products_list
  }
}
</script>
