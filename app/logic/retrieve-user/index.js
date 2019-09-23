/**
 * Retrieves user data by sending a request to
 * Skylabcoders' users API with an id an auth token.
 * Returns an object with all the stored user data.
 * 
 * @param {string} userId - User id returned by Skylabcoders' users API authentication
 * @param {string} userToken - Token returned by Skylabcoders' users API authentication
 * 
 */

logic.retrieveUser = function(userId, userToken){
    //validation id and token must be strings
    validate.string(userId, 'id')
    validate.string(userToken,'token')

    //calls to the api with the id and token of the arguments and returns the data of this user
    return call(`https://skylabcoders.herokuapp.com/api/user/${userId}`, 'get', {'authorization':`bearer ${userToken}`}, undefined)
    .then(response=>{
        if(response.status==='KO') throw new Error(response.error)
        return response.data
    })
}