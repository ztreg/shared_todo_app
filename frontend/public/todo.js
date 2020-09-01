import moment from 'moment'
class TodoRequests {
  static async fetchTodos (sortFrom = 'createdAt', direction = 'asc', page = 0, listId) {
    // const currenttoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjQ3ODUyNWEwZTQ3ZjMyNjhiNzBmM2QiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTg1MjI2ODEsImV4cCI6MTU5ODUyNjI4MX0.atIvCDe3X4tGzuH8aFCAl4vb6TFp4GIfdj_V5VJuWyU'
    if (page <= 0) page = 0

    return await fetch(`http://localhost:8081/todo?sortFrom=${sortFrom}&direction=${direction}&page=${page}&listId=${listId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((response) => {
        console.log(response)
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].createdAt = Date.parse(response.data[i].createdAt)
          response.data[i].updatedAt = Date.parse(response.data[i].updatedAt)
          response.data[i].createdAt = moment(response.data[i].updatedAt).format('MM/DD HH:mm')
          response.data[i].updatedAt = moment(response.data[i].updatedAt).format('MM/DD HH:mm')
        }
        return response
      })
      .catch((error) => {
        console.error('There was a error fetching:' + error)
      })
  }

  static async editFullTodo (title, done, id) {
    console.log('making full edit request for id ' + id)
    return await fetch('http://localhost:8081/todo/' + id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, done: done })
    })
  }

  static async addTodo (title, listId) {
    console.log('add todo with title ' + title  + 'and listId ' + listId)

    return await fetch(`http://localhost:8081/todo?listId=${listId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title })
    })
  }

  static async deleteTodo (id) {
    return await fetch('http://localhost:8081/todo/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  }

  static async fetchListName(listId) {
    console.log('get me that listname ffs' + process.env.TOKEN)
    return await fetch(`http://localhost:8081/todolist/${listId}`, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then((response) => {
      console.log(response)
      return response
    })
  }
}
export default TodoRequests
