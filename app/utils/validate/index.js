/**
 * Input validation for strings, emails, functions, urls and passwords.
 * Returns no response if validation is passed, otherwise raises error.
 * 
 * string
 * @param {string} target - Input parameter to validate
 * @param {string} name - Variable identifier
 * @param {string} [empty=true] - Optional validate flag. When set to false (defaul) empty strings are allowed. Default is true
 * @param {string} values - Array of values against which target existence will be checked. 
 * 
 * email
 * @param {string} target - Input parameter to validate
 * @param {string} name - Variable identifier
 * 
 * password
 * @param {string} target - Input parameter to validate
 * @param {string} name - Variable identifier
 * 
 * function
 * @param {string} target - Input parameter to validate
 * @param {string} name - Variable identifier
 * 
 * url
 * @param {string} target - Input parameter to validate
 * @param {string} name - Variable identifier
 */

const validate = (() => {
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ 
    const PASSWORD_REGEX = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
    return {
        string(target, name, empty = true, values) {
            if (typeof target !== 'string') throw TypeError(`${name} with value ${target} is not a string`)
            if (empty && !target.trim()) throw new Error(`${name} is empty or blank`)
            if (values && !values.includes(target)) throw new Error(`${name} with value ${target} does not match one of the expected values: ${values.join(', ')}`)
        },

        email(target, name) {
            if (!EMAIL_REGEX.test(target)) throw new Error(`${name} with value ${target} is not a valid e-mail`)
        },

        password(target, name) {
            if (!PASSWORD_REGEX.test(target)) throw new Error(`${name} is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer`)
        }, 

        function(target, name) {
            if (typeof target !== 'function') throw TypeError(`${name} with value ${target} is not a function`)
        },

        url(target, name) {
            if (!URL_REGEX.test(target)) throw new Error(`${name} with value ${target} is not a valid URL`)
        }
    }
})()
