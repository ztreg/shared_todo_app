// import TodoPage from '../components/TodoPage'
import checkMember from './middlewares/member'
import checkAdmin from './middlewares/admin'
import checkGuest from './middlewares/guest'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        meta: {
          middleware: [checkGuest]
        }
      },
      { 
        path: '/todos', component: () => import('pages/Todos.vue'),
        meta: {
          middleware: [checkMember]
        }
      },
      { 
        path: '/signup', component: () => import('pages/CreateAccount.vue'),
        meta: {
          middleware: [checkGuest]
        } 
      },
      { 
        path: '/archive', component: () => import('pages/TodoArchive.vue'),
        meta: {
          middleware: [checkAdmin]
        } 
      },
      { 
        path: '/todolist', component: () => import('pages/TodoList.vue'),
        meta: {
          middleware: [checkMember]
        }
      },
      { 
        path: '/todolist/:id', component: () => import('pages/SingleTodoList.vue'),
        meta: {
          middleware: [checkMember]
        }
      },
      { 
        path: '/profile', component: () => import('pages/ProfilePage.vue'),
        meta: {
          middleware: [checkMember]
        }
      },
      { 
        path: '/policy', component: () => import('pages/PolicyPage.vue'),
      },
      { 
        path: '/cookiepolicy', component: () => import('pages/Cookiepolicy.vue'),
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
