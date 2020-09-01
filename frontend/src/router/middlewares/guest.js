async function checkGuest ({ next, store }) {
    await store.dispatch('checkIfLoggedIn')
    if(store.getters.auth.loggedIn){
        return next('/todolist')
    }
  
    return next()
  }
  
  export default checkGuest
  
// If loggedin -> redirect to todos from homepage