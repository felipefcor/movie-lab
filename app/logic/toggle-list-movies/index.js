/**
 * Adds or removes a movie to/from a user's custom list.
 * User data is retrieved from Skylabcoders' users API in order 
 * to check if a specific movie is already in user's list. 
 * Returns object with status of response
 * 
 * @param {string} userId - User id returned by Skylabcoders' users API authentication
 * @param {string} userToken - Token returned by Skylabcoders' users API authentication
 * @param {string} movieId - The TMDB movie id 
 * @param {string} listName - The name of the user's custom list 
 * 
 */

logic.toggleFromMovieList = function(userId, userToken, movieId, listName, expression) {
    const TMDB_API_KEY = 'YOUR_OWN_API_KEY_GOES_HERE'
    const AUTH_ENDPOINT = 'https://skylabcoders.herokuapp.com/api/user/'

    //Input Validation
    validate.string(userId, 'id')
    validate.string(userToken, 'token')
    validate.string(movieId, 'movie id')
    validate.string(listName, 'list name')

    /* Call retrieve user endpoint to extract their favorites */
    return call(`${AUTH_ENDPOINT}${userId}`, 'get', {'authorization': `bearer ${userToken}`}, undefined)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
            let lists = response.data.lists

            let indexList
            (lists) ? indexList = lists.findIndex(list => list.name === listName) : lists = []

            /* means list has been found in user's lists */
            let indexMovie
            (lists[indexList].movies) ? indexMovie = lists[indexList].movies.findIndex(movie => movie === movieId) :  {}

            if (indexMovie > -1) {
                lists[indexList].movies.splice(indexMovie, 1)

                return call(
                    `https://skylabcoders.herokuapp.com/api/user/${userId}`,
                    'put',
                    {'content-type': 'application/json', 'authorization': `bearer ${userToken}`},
                    {lists})
                    .then(response => {
                        if (response.status === 'KO') throw Error(response.error)
                    })
            } else {
                /* Check if movie is still accessible */
                 return call(`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&api_key=${TMDB_API_KEY}`, 'get', undefined, undefined)
                    .then(movie => {
                        lists[indexList].movies.push(movieId.toString())

                        /* Update user favorites on the database */
                        return call(
                            `https://skylabcoders.herokuapp.com/api/user/${userId}`,
                            'put',
                            {'content-type': 'application/json', 'authorization': `bearer ${userToken}`},
                            {lists})
                            .then(response => {
                                if (response.status === 'KO') throw Error(response.error)
                            })
                    })
            }
        })
    }
