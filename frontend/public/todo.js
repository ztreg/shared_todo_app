import moment from 'moment'

class TodoRequests {
  static async fetchTodos (sortFrom = 'created', direction = 'asc', page = 0) {
    // page = this.page
    /**
     * Returns data and count
     */
    if (page <= 0) page = 0
    console.log('sida nmr ' + page)
    return await fetch('http://localhost:8081/' + sortFrom + '/' + direction + '/' + page)
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
        console.error('There was a error fetching:', error)
      })
  }

  static async editFullTodo (title, done, id) {
    console.log('making full edit request for id ' + id)
    return await fetch('http://localhost:8081/update/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, done: done })
    }).then(res => res.json())
      .then(res => console.log(res))
  }

  static async addTodo (title) {
    console.log('add todo with title ' + title)

    return await fetch('http://localhost:8081/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title })
    }).then(res => res.json())
  }

  static async deleteTodo (id) {
    return await fetch('http://localhost:8081/delete/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    }).then(res => res.json())
      .then(res => console.log(res))
  }

  static async quickEditTodo (done, id) {
    console.log('making put request for id ' + id)
    return await fetch('http://localhost:8081/done/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ done: done })
    }).then(res => res.json())
      .then(res => console.log(res))
  }
}
export default TodoRequests
