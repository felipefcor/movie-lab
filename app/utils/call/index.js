/**
 * Fetch wrapper which includes input validation and JSON response parsing
 * Returns object with JSON response parsed.
 * 
 * @param {string} url - URL or API endpoint
 * @param {string} [method='get'] - HTTP method defaults 
 * @param {string} movieId - The TMDB movie id 
 * 
 */

function call(url, method = 'get', headers, body) {
    validate.string(url, 'url')
    validate.url(url, 'url')
    validate.string(method, 'method', true, ['get', 'post', 'put', 'patch', 'delete'])

    return fetch(url, {
        method,
        headers,
        body: JSON.stringify(body)
    })
        .then(res => res.json())
}