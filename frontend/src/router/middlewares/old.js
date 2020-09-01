// if (to.path === '/' || to.path === '/signup') {
//   console.log('move on, you ok fellow')
//   next()
// } else {
//   const status = await TodoPage.methods.checkToken(localStorage.getItem('token'))
//   if (status.ok === false) {
//     console.log('not ok')
//     await TodoPage.methods.logOut()
//     console.log('nonon')
//     next({ path: '/' })
//   } else {
//     if (localStorage.getItem('role') === 'admin') TodoPage.data.role = 'admin'
//   }
//   next()
// }