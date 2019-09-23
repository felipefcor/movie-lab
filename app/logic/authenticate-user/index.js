/**
 * Authenticates user via skylabcoders API endpoint
 * by providing username and password as JSON body.
 * Returns API response with a JSON that includes 
 * user id and auth token
 * 
 * @param {string} username - Username used to sign in into the service
 * @param {string} password - Password used to sign in into the service
 * 
 */

logic.authenticateUser= function(username, password){
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
   
    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', {'content-type':'application/json'}, {username, password})
     .then(response =>{
        if (response.status === 'KO') throw new Error (response.error)
        return response.data
    })
}

