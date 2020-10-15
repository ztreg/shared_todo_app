    // async fetchTodos (sortFrom = 'created', page = 0) {
    //   page = this.page
    //   // if (page <= 0) page = 0
    //   console.log('sida nmr ' + page)
    //   await fetch('http://localhost:8081/' + sortFrom + '/' + this.direction + '/' + page)
    //     .then(response => response.json())
    //     .then((response) => {
    //       for (let i = 0; i < response.Todos.length; i++) {
    //         response.Todos[i].createdAt = Date.parse(response.Todos[i].createdAt)
    //         response.Todos[i].updatedAt = Date.parse(response.Todos[i].updatedAt)
    //         response.Todos[i].createdAt = moment(response.Todos[i].updatedAt).format('MM/DD hh:mm:ss a')
    //         response.Todos[i].updatedAt = moment(response.Todos[i].updatedAt).format('MM/DD hh:mm:ss a')
    //       }
    //       this.todos = response.Todos
    //       console.log(response.Todos)
    //     })
    //     .catch((error) => {
    //       console.error('There was a error fetching:', error)
    //     })
    // },
    // async editFullTodo (title, done, id) {
    //   console.log('making full edit request for id ' + id)
    //   await fetch('http://localhost:8081/update/' + id, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ title: title, done: done })
    //   }).then(res => res.json())
    //     .then(res => console.log(res))
    // },
    /**
     * Add todo
     */
    // async addTodo (title) {
    //   console.log('add todo with title ' + title)
    //
    //   const data = await fetch('http://localhost:8081/add', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ title: title })
    //   }).then(res => res.json())
    //   for (let i = 0; i < data.length; i++) {
    //     data.Todos[i].createdAt = Date.parse(data.Todos[i].createdAt)
    //     data.Todos[i].updatedAt = Date.parse(data.Todos[i].updatedAt)
    //     data.Todos[i].createdAt = moment(data.Todos[i].updatedAt).format('MM/DD hh:mm a')
    //     data.Todos[i].updatedAt = moment(data.Todos[i].updatedAt).format('MM/DD hh:mm a')
    //   }
    //   this.todos.push(data.lastId)
    //   this.todoTitle = ''
    // },