import axios from 'axios'

const state = {
    user: {
        loggedIn: false,
        role: 'guest',
        isAdmin: false,
        username: 'Not a member',
        userid: ''
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
            const res = await axios.get(`/api/login/authentication/checkToken`, config)
            commit('setUser', res.data) 
        } catch (error) {
            console.log(error)
            
        }
    }
}

const mutations = {
    setUser: (state, user) => {
        console.log(user);
        state.user.loggedIn = true
        state.user.role = user.role
        state.user.isAdmin = user.role === 'admin'
        state.user.username = user.username
        state.user.userid = user.userid
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