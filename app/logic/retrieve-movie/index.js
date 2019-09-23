/**
 * Retrieves movie details such as title, release date or director 
 * by calling the specific TMDB API endpoint with a movie id.
 * When an user is logged to the service, their favorites are also retrieved
 * to check if the movie id is already included in user's favorites.  
 * Returns a parsed JSON with movie details.
 * 
 * @param {string} userId - User id returned by Skylabcoders' users API authentication
 * @param {string} userToken - Token returned by Skylabcoders' users API authentication
 * @param {string} movieId - The TMDB movie id 
 * 
 */

logic.retrieveMovie =function(userId, userToken, movieId) {
    const API_KEY= '03ecceac5993bcd054fbc7d617df741a'
    let favorites

    if(userId != undefined && userToken != undefined){
        validate.string(userId, 'id')
        validate.string(userToken, 'token')
        validate.string(movieId, 'movie id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${userId}`, 'get', { 'authorization': `bearer ${userToken}` }, undefined)
        .then(response => {
            if(response.status === 'KO') throw new Error(response.error)
            favorites = response.data.favorites

            return call(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`,'get', undefined, undefined )
            .then(movie => {
                if( movie.error ) throw new Error(movie.error)
                favorites && (movie.favorite = favorites.includes(movieId))

                let movieComplete = movie

                let director
                let result = movie.credits.crew.find(member => member.job === 'Director')
                result ? director = result.name : director = 'Unknown'
                let mainCast = movie.credits.cast.splice(0, 4).map(member => member.name)

                  const movieDetail = {
                    movieComplete,
                    director,
                    mainCast,
                } 
            return movieDetail

            })

            
        })
    }else {
        validate.string(movieId, 'movie id')

        return call(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`,'get', undefined, undefined )
        .then(movie =>{
            if(movie.error) throw new Error(movie.error)

                let movieComplete = movie

                let director
                let result = movie.credits.crew.find(member => member.job === 'Director')
                result ? director = result.name : director = 'Unknown'
                let mainCast = movie.credits.cast.splice(0, 4).map(member => member.name)

                  const movieDetail = {
                    movieComplete,
                    director,
                    mainCast,
                } 
            return movieDetail
        })
    }
}
