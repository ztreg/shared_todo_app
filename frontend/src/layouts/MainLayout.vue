<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="closeburger()"
        />

        <q-toolbar-title class="text-center">
          Logged in as {{ auth.username }}
        </q-toolbar-title>
        
        <div> Vilken bra webbtjänst jag har gjort till mig själv</div>
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
          Essential Links
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
      linksData: [
        {
          title: 'Login',
          caption: 'Login',
          icon: 'login',
          to: '/'
        },
        {
          title: 'Archive',
          caption: 'Finished Todos',
          icon: 'archive',
          to: '/archive'
        },
        {
          title: 'Todolist',
          caption: 'Todolist',
          icon: 'list',
          to: '/todolist'
        }
      ]
    }
  },
  methods: {
    closeburger () {
      this.leftDrawerOpen = !this.leftDrawerOpen
      console.log(this.leftDrawerOpen)
    }
  },
  computed:{
    ...mapGetters(['auth'])
  }
}
</script>
