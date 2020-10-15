
module.exports = {
    getTestUsers: async() => {
        const users = [
            amanda = {
                username: "Amanda",
                password: "123",
                role: "member"
            },
            jonas = {
                username: "jonas",
                password: "123",
                role: "member"
            },
            pelle = {
                username: "pelle",
                password: "123",
                role: "member"
            },
            newUser =	{
                username: "jonas1",
                password: "123",
                role: "member"
            },
            newUser2 = {
                username: "jonas2",
                password: "1234",
                role: "member"
            },
            userAdmin = {
                username: "jonasadmin",
                password: "12345",
                role: "admin"
            },
            http1 = {
                username: 'jonastodohttpnono', 
                password: '12345', 
                role: 'member'
            },
            http2 = {
                username: 'wowlolexde', 
                password: '1234', 
                role: 'member'
            }.
            httpadmin = {
                username: 'jonasadmin', 
                password: '123', 
                role: 'admin'
            },
        ]
        return users
    }

}