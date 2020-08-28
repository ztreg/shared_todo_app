<template>
  <div>
    LIST :d
  </div>
</template>

<script>
export default {
  name: 'TodoListComp',
  data () {
    return {
      token: ''
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    } else {
      this.$router.push({ path: '/' })
    }
    this.fetchList()
  },
  methods: {
    async fetchList () {
      await fetch('http://localhost:8081/todolist', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        }
      }).then((response) => response.json())
        .then((response) => {
          console.log(response)
        })
    }
  }
}
</script>

<style>

</style>
