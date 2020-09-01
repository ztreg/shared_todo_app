import axios from 'axios'

const state = {
    user: {
        loggedIn: false,
        role: 'guest',
        isAdmin: false,
        username: 'Not a member'
    }
}

const getters = {
    auth(state) {
        return state.user
    }
}

const actions = {
    async checkIfLoggedIn({ commit }) {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
        try {
            const res = await axios.get('http://localhost:8081/login/authentication/checkToken', config)
            console.log(res)
            commit('setUser', res.data) 
        } catch (error) {
            console.log(error)
            
        }
    }
}

const mutations = {
    setUser: (state, user) => {
        state.user.loggedIn = true
        state.user.role = user.role
        state.user.isAdmin = user.role === 'admin',
        state.user.username = user.username
    }
    /*
    logoutUser: (state, user) => {
        state.user.loggedIn = false
        state.user.role = 'guest'
        state.user.isAdmin = false
    }*/
}

export default {
    state,
    getters,
    actions,
    mutations
}