<template>
    <q-btn class="float-right" label="Logout" color="red" @click="logOut()"></q-btn>
</template>

<script>
export default {
    name: 'LogoutComponent',
    data () {
        return {}
    },
    methods: {
        logOut () {
            localStorage.removeItem('token')
            localStorage.removeItem('showUsers')
            localStorage.removeItem('role')
            this.$router.go( '/' )
    },
    }
}
</script>

<style>

</style>
