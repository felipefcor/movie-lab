{
  describe('call', () => {
    describe('post', () => {
        it('should succeed on coherent data', () => {
            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, {
                username: `pepito-${Math.random()}`,
                password: 'grillo'
            })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('get', () => {
        it('should succeed on coherent data', () => {
            return call('https://api.themoviedb.org/3/search/movie?api_key=03ecceac5993bcd054fbc7d617df741a&query=white', 'get', undefined, undefined)
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

    describe('put', () => {
        it('should succeed on coherent data', () => {
            return call('https://reqres.in/api/users/2', 'put', undefined, {
                "name": "morpheus",
                "job": "zion resident"
            })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

     describe('delete', () => {
        it('should succeed on coherent data', () => {
            return call('https://reqres.in/api/users/2', 'put', undefined, {
                "name": "morpheus",
                "job": "zion resident"
            })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })

     describe('patch', () => {
        it('should succeed on coherent data', () => {
            return call('https://reqres.in/api/users/2', 'put', undefined, {
                "name": "morpheus",
                "job": "zion resident"
            })
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
    })
    
})

}