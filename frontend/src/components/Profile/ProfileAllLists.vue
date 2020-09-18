<template>
    <div class="col-6 col-md-6">
         <div class="text-h6">List Titel & List Skapare</div>
  
        <q-list bordered separator v-for="(list, i) in allLists" :key="i" class="q-pa-md bg-grey-2 text-black " style="max-width: 350px">
            <q-item clickable v-ripple>
                <q-item-section>{{ list.title }}</q-item-section>
                <q-item-section>{{ list.creator }}</q-item-section>
            </q-item>
        </q-list>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'ProfileAllLists',
    data () {
        return {
            allLists : []
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
            const result = await fetch(`/api/users/gdpr/${this.auth.userid}`,
            {
                headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((response) => {
                console.log(response.lists);
                this.allLists = response.lists
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