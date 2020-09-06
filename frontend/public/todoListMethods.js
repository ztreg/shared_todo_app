
class TodoListRequests {
  static async fetchList (token) {
    return await fetch('http://localhost:8081/todolist', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then((response) => response.json())
        .then((response) => {
          console.log(response.todoLists)
          return response
        })
  }

  static async fetchLists (token) {
    return await fetch('http://localhost:8081/todolist', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then((response) => response.json())
        .then((response) => {
          console.log(response.todoLists)
          return response
        })
  }

  static async editTodoList (title, id, token) {
    console.log('making full edit request for id ' + id)
    return await fetch('http://localhost:8081/todolist/' + id, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title})
    })
  }

  static async addTodoList (title, token) {
    console.log('add todolist with title ' + title)

    return await fetch('http://localhost:8081/todolist/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title})
    })
  }

  static async deleteTodoList (id, token) {
    return await fetch('http://localhost:8081/todolist/' + id, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
  }
}
export default TodoListRequests
