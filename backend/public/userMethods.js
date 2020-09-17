class UserRequests {
  static async editUser (newUsername, id, token) {
      console.log(newUsername);
      console.log(token);
    console.log('making full users request for id ' + id)
    return await fetch(`api/users/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: newUsername })
    })
  }
}

export default UserRequests
