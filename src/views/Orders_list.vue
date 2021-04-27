<template>
  <div class="home">
    
    <Orders_list msg="Welcome to Your WE App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Orders_list from '@/components/Orders_list.vue'

export default {
  name: 'Home',
  components: {
    Orders_list
  }
}
</script>
