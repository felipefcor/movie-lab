/**
 * Creates a new custom list of movies into user's object.
 * If a list with the same name already exists, an error is raised. 
 * Otherwise, the list is created by sending a PUT to Skylabcoders user API.
 * Returns the updated array of lists.
 * 
 * @param {string} userId - User id returned by Skylabcoders' users API authentication
 * @param {string} userToken - Token returned by Skylabcoders' users API authentication
 * @param {string} listName - The name of the list that wants to be created, get from a submit form
 * 
 */
logic.createList = function(userId, userToken, listName) {
    const AUTH_ENDPOINT = 'https://skylabcoders.herokuapp.com/api/user/'

    //Input Validation
    validate.string(userId, 'id')
    validate.string(userToken, 'token')
    validate.string(listName, 'list name')

    /* Call retrieve user endpoint to extract their favorites */
    return call(`${AUTH_ENDPOINT}${userId}`, 'get', {'authorization': `bearer ${userToken}`}, undefined)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
            let lists = response.data.lists

            !lists ? lists = [] : lists

            if (lists.length) {
                const index = lists.findIndex(list => list.name === listName)
                if (index > -1) throw Error(`List with name "${listName} already exists in the database`)
            }

            lists.push({name: listName, movies: []})

            /* Update user favorites on the database */
            return call(
                `https://skylabcoders.herokuapp.com/api/user/${userId}`,
                'put',
                {'content-type': 'application/json', 'authorization': `bearer ${userToken}`},
                {lists})
                .then(response => {
                    if (response.status === 'KO') throw Error(response.error)
                        return lists
                })
        })
    }

