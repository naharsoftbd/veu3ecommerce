<template>
  <div class="home">
    
    <Order msg="Welcome to Your WE App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Order from '@/components/Order.vue'

export default {
  name: 'Home',
  components: {
    Order
  }
}
</script>
