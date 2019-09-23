/**
 * Registers a new user into the service via Skylabcoders users API
 * by providing the inputs collected on the register form.
 * Return JSON response that includes user id 
 * 
 * @param {string} name       - Name of the user
 * @param {string} surname    - Surname of the user
 * @param {string} username   - Username used to sign in into the service
 * @param {string} password   - Password used to sign in into the service
 * @param {string} repassword - Password confirmation
 * 
 */

logic.registerUser = function (name, surname, username, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')
    validate.password(password, 'password')

    if (password !== repassword) throw new Error('passwords do not match')

    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, {name, surname, username, password, favorites: [], lists: [] })
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)
            return response
        })
}