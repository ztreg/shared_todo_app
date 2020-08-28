<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="text-h3 col-12 text-center">All finished todos</div>
    <div v-for="(todo, i) in finishedTodos" :key="i">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-body1 text-black">
            Todo name: {{ todo.title }}
            </div>
            <div class="text-body1 text-black">
            Todo user: {{ todo.userid }}
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn flat color="primary">
            Finished: {{ todo.updatedAt }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoArchive',
  data () {
    return {
      finishedTodos: [],
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      token: ''
    }
  },
  mounted () {
    this.token = localStorage.getItem('token')
    console.log(this.token)
    this.fetchFinished()
  },
  methods: {
    async fetchFinished () {
      await fetch('http://localhost:8081/todo/finished', {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((response) => {
          // console.log(response)
          this.finishedTodos = response
          console.log(this.finishedTodos)
        })
        .catch((error) => {
          console.error('There was a error fetching:' + error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-card {
    width: 100%;
    max-width: 350px;
  }

</style>
