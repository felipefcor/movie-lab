{ 
    const { random }= Math
    
    describe('logic - toggle movies from custom lists', () => {
        let user
        let movieId = '680'
        let listName = 'Best of 2019'

        beforeEach(() => {

            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: [],
                lists: [{name: listName, movies: []}]
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                })
                .then(() => {
                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                                data = response.data
                        })
                })
            })

        it('should succeed on correct data', () => {
            return logic.toggleFromMovieList(data.id, data.token, movieId, listName)
                .then(() => {

                    /* We need to retrieve user to check list was added to users' lists */
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)
                        .then(response => {
                            const retrievedUser = response.data
                            expect(retrievedUser.id).toBe(data.id)
                            expect(retrievedUser.lists instanceof Array).toBeTruthy()
                            expect(retrievedUser.lists.length).toBe(1)
                            expect(retrievedUser.lists[0].name).toBe('Best of 2019')
                            expect(retrievedUser.lists[0].movies).toBeDefined()
                            expect(retrievedUser.lists[0].movies[0]).toBe('680')
                        })
                    })
            })
        

        /* Undefined */
        it('should fail when userId is not provided', () => {
            expect(() => logic.toggleFromMovieList(undefined, data.token, movieId, listName)).toThrowError('id with value undefined is not a string')
        })

        it('should fail when userToken is not provided', () => {
            expect(() => logic.toggleFromMovieList(data.id, undefined, movieId, listName)).toThrowError('token with value undefined is not a string')
        })

        it('should fail when movieId is not provided', () => {
            expect(() => logic.toggleFromMovieList(data.id, data.token, undefined, listName)).toThrowError('movie id with value undefined is not a string')
        })

        it('should fail when listName is not provided', () => {
            expect(() => logic.toggleFromMovieList(data.id, data.token, movieId, undefined)).toThrowError('list name with value undefined is not a string')
        })

        /* Wrong credentials */
        it('should fail on incorrect userId', () => {
            return logic.toggleFromMovieList('aaaaa', data.token, movieId, listName)
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail on incorrect userToken', () => {
            return logic.toggleFromMovieList(data.id, 'bbbbb', movieId, listName)
                .catch(error => expect(error).toBeDefined())
        })

        
        /* Empty parameters */
        it('should fail when userId is not provided', () => {
            expect(() => logic.toggleFromMovieList('', data.token, movieId, listName)).toThrowError('id is empty or blank')
        })

        it('should fail when userToken is not provided', () => {
            expect(() => logic.toggleFromMovieList(data.id, '', movieId, listName)).toThrowError('token is empty or blank')
        })

        it('should fail when movieId is not provided', () => {
            expect(() => logic.toggleFromMovieList(data.id, data.token, '', listName)).toThrowError('movie id is empty or blank')
        }) 

         it('should fail when listName is not provided', () => {
            expect(() => logic.toggleFromMovieList(data.id, data.token, movieId, '')).toThrowError('list name is empty or blank')
        }) 

        /* Wrong endpoints */
        it('should fail on incorrect user api endpoint', () => {
            return logic.toggleFromMovieList(data.id, data.id, movieId, listName)
                .catch(error => expect(error).toBeDefined())
        })


        it('should fail on incorrect tmdb api endpoint', () => {
            return logic.toggleFromMovieList(data.id, data.id, movieId, listName)
                .catch(error => expect(error).toBeDefined())
        })


        describe('when user already has the movie on their list', () => {
            let user
            let movieId = '680'
            let listName = 'Best of 2019'

            beforeEach(() => {

                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [],
                    lists: [{name: listName, movies: [movieId]}]
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
                    .then(() => {
                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                    })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                        data = response.data
                    })
                })


                it('should succeed on correct data', () => {
                    return logic.toggleFromMovieList(data.id, data.token, movieId, listName)
                        .then(() => {

                        /* We need to retrieve user to check list was added to users' lists */
                        return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                        { 'authorization': `bearer ${data.token}` },
                        undefined)
                            .then(response => {
                                const retrievedUser = response.data
                                expect(retrievedUser.id).toBe(data.id)
                                expect(retrievedUser.lists instanceof Array).toBeTruthy()
                                expect(retrievedUser.lists.length).toBe(1)
                                expect(retrievedUser.lists[0].name).toBe('Best of 2019')
                                expect(retrievedUser.lists[0].movies).toBeDefined()
                                expect(retrievedUser.lists[0].movies.length).toBe(0)
                            })
                        })
                })
        })
    })
}