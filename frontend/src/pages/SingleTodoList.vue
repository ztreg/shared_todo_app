<template>
  <div class="q-pa-md center bg-grey-9 text-white">
    <SingleTodoListComp></SingleTodoListComp>
  </div>
</template>

<script>
import SingleTodoListComp from '../components/SingleTodoListComp'
export default {
  name: 'SingleTodoList',
  data () {
    return {}
  },
  components: {
    SingleTodoListComp
  }
}

</script>
