<template>
    <div class="col-6 col-md-6">
         <q-item-section class="text-h5">All todos on you</q-item-section>
                  <div class="text-h6">Todo Titel & Todo Status</div>
        <q-list bordered separator v-for="(todo, i) in allTodos" :key="i" class="q-pa-md bg-grey-2 text-black " style="max-width: 350px">
            <q-item clickable v-ripple>
                <q-item-section>{{ todo.title }}</q-item-section>
                <q-item-section>{{ todo.done }}</q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'ProfileAllTodos',
    data () {
        return {
            allTodos : []
        }
    },
    mounted() {
        this.token = localStorage.getItem('token')
        this.fetchAllTodos()
    },
    computed: {
    ...mapGetters(['auth'])
    },
    methods: {
        async fetchAllTodos() {
            fetch(`/api/users/gdpr/${this.auth.userid}`,
            {
                headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((response) => {
                this.allTodos = response.todos
            })
            .catch((error) => {
                console.error('There was a error fetching:' + error)
            })
        }
        
    }
}   

</script>

<style>

</style>