import moment from 'moment'
class TodoRequests {
  static async fetchTodos (sortFrom = 'createdAt', direction = 'asc', page = 0, listId) {
    if (page <= 0) page = 0
    console.log('lllllllll')
    console.log(`${sortFrom} | ${direction} | ${page} | ${listId}`)
    return await fetch(`http://localhost:8081/api/todo?sortFrom=${sortFrom}&direction=${direction}&page=${page}&listId=${listId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((response) => {

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

  static async editFullTodo (title, done, id, listId) {
    console.log('making full edit request for id ' + id)
    return await fetch(`http://localhost:8081/api/todo/${id}?listId=${listId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, done: done })
    })
  }

  static async addTodo (title, listId, urgent) {
    console.log('add todo with title ' + title  + 'and listId ' + listId)

    return await fetch(`http://localhost:8081/api/todo/${listId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, urgent: urgent })
    })
  }

  static async deleteTodo (id, listId) {
    return await fetch(`http://localhost:8081/api/todo/${id}?listId=${listId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        'Content-Type': 'application/json'
      }
    })
  }

  static async fetchListName(listId) {
    return await fetch(`http://localhost:8081/api/todolist?listId=${listId}`, {
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
