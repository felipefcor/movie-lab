/**
 * Retrieve all customs list from user profile.
 * MovieId is provided to add a boolean flag (inList) to every list if that specific movie is included in it. 
 * Returns the updated array of users's custom lists.
 * 
 * @param {string} userId - User id returned by Skylabcoders' users API authentication
 * @param {string} userToken - Token returned by Skylabcoders' users API authentication
 * @param {string} movieId - The TMDB movie id 
 * 
 */

logic.retrieveLists = function(userId, userToken, movieId) {
    const AUTH_ENDPOINT = 'https://skylabcoders.herokuapp.com/api/user/'

    //Input Validation
    validate.string(userId, 'id')
    validate.string(userToken, 'token')
    validate.string(movieId, 'movie id')

    /* Call retrieve user endpoint to extract their favorites */
    return call(`${AUTH_ENDPOINT}${userId}`, 'get', {'authorization': `bearer ${userToken}`}, undefined)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
            let lists = response.data.lists

            !lists ? lists = [] : lists

            if (lists.length) {
                lists.forEach(list => list.inList = list.movies.includes(movieId))
                return lists
            } else {
                return lists

            }
        })
}


