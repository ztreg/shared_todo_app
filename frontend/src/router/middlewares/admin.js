async function checkAdmin ({ next, store }) {
    await store.dispatch('checkIfLoggedIn')
    if(!store.getters.auth.isAdmin){
        return next('/todolist')
    }
  
    return next()
  }
  
  export default checkAdmin
  
  // Use this middleware on routes wich require admin, if not admin -> redirect to todos