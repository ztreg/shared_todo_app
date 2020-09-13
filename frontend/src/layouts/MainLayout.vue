<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <!-- Cookie accept here -->
      <div class="q-pa-md q-gutter-sm" v-if="!nocookie">
      <q-banner class="bg-grey-8">
        <template v-slot:avatar>
          <q-icon name="info" color="white" />
          <q-btn color="blue" label="OK" style="font-size: 4.4em;" @click="cookieAccept(true)"/>
          <q-btn color="black" :to="'/cookiepolicy'" label="Read our cookie policy" />
        </template>
          <template v-slot:action>
          <q-btn color="grey" label="Turn off cookies" @click="cookieAccept(false)" />
        </template>
        <p class="text-body1"> In order to make this service work, access to your cookies is needed.
        If you don't want this? please click the 'Turn off cookies' button.</p>
      </q-banner>
    </div>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="closeburger()" />
        <q-toolbar-title class="text-center">
          Logged in as {{ auth.username }}
        </q-toolbar-title>
        <div> Vilken bra webbtjänst jag har gjort till mig själv</div>
        <q-btn class="q-ml-lg q-mr-lg" :to="'/profile'">  
          <q-avatar icon="person" color="blue-5" class="icon"> </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="leftDrawerOpen"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>

        <q-item v-for="link in linksData"
          :key="link.title"
          v-bind="link"
          :caption="linksData.caption"
          :to="link.to">
          <q-item-section avatar>
            <q-icon :name="link.icon"/>
          </q-item-section>
          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
      <q-footer class="bg-grey-9">
        <q-toolbar class="glossy">
          <q-toolbar-title></q-toolbar-title>
           <q-toolbar-title><q-btn :to="'/todolist'" class="text-white">Todolists</q-btn></q-toolbar-title>
          <q-toolbar-title><q-btn :to="'/policy'" class="text-white">Privacy Policy</q-btn></q-toolbar-title>
        </q-toolbar>
      </q-footer>
  </q-layout>

</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      nocookie: false,
      linksData: [
        {
          title: 'Login',
          caption: 'Login',
          icon: 'login',
          to: '/'
        },
        {
          title: 'Todolist',
          caption: 'Todolist',
          icon: 'list',
          to: '/todolist'
        },
        {
          title: 'Profile',
          caption: 'Profile & profile settings',
          icon: 'person',
          to: '/profile'
        },
        {
          title: 'Archive',
          caption: 'Finished Todos',
          icon: 'archive',
          to: '/archive'
        },
        {
          title: 'Privacy Policy',
          caption: 'Privacy Policy',
          icon: 'policy',
          to: '/policy'
        }
      ]
    }
  },
  methods: {
    closeburger () {
      this.leftDrawerOpen = !this.leftDrawerOpen
      console.log(this.leftDrawerOpen)
    },
    cookieAccept (val) {
      this.nocookie = val
      if(val === false) {
        localStorage.removeItem('token')
        localStorage.removeItem('showUsers')
        localStorage.removeItem('role')
        localStorage.removeItem('showUsernames')
        localStorage.removeItem('username')
      }
    }
  },
  computed:{
    ...mapGetters(['auth'])
  }
}
</script>
