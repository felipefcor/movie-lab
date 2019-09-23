/**
 * Retrieves the list of favorites movies from the user profile.
 * A call to TMDB API is done in order to check availability of every movie id.
 * Returns an array of movie ids favorited by the user
 * 
 * @param {string} userId - User id returned by Skylabcoders' users API authentication
 * @param {string} userToken - Token returned by Skylabcoders' users API authentication
 * 
 */

logic.retrieveFavMovies = function(userId, userToken) {
    const TMDB_API_KEY = 'YOUR_OWN_API_KEY_GOES_HERE'
    const AUTH_ENDPOINT = 'https://skylabcoders.herokuapp.com/api/user/'

    //Input Validation
    validate.string(userId, 'id')
    validate.string(userToken, 'token')

    /* Call retrieve user endpoint to extract their favorites */
    return call(
        `${AUTH_ENDPOINT}${userId}`, 
        'get',
        {'authorization': `bearer ${userToken}`},
        undefined)
        .then(response => {
            if (response.status === 'KO') throw Error('User authentication failed.')
            const favorites = response.data.favorites

            if (!favorites) return []

            /* Maps promise objects into an array which 
            will be resolved with Promise.all() */
            const proms = favorites.map(favId => {
                return call(`https://api.themoviedb.org/3/movie/${favId}?append_to_response=credits&api_key=${TMDB_API_KEY}`, 'get', undefined, undefined)
                .then(movie => { 
                    movie.favorite = true
                    return movie
                })
            })

            return Promise.all(proms)
                
        })

}