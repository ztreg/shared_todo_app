async function checkMember ({ next, store }) {
  await store.dispatch('checkIfLoggedIn')
  if(!store.getters.auth.loggedIn){
      return next('/')
  }

  return next()
}

export default checkMember

// If not loggedin -> redirect to loginpage