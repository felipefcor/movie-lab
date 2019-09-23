{
    const { random }= Math

    describe('logic - retrieve fav movies', () => {
        let user
        let data

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            user.favorites.push('680', '500', '24')

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            data = response.data
                        })
                })
        }) 
        
        it('should succeed on correct data', () => {
            return logic.retrieveFavMovies(data.id, data.token)
                .then(movies => {
                    expect(movies).toBeDefined()
                    expect(movies instanceof Array).toBeTruthy
                    expect(movies[0].vote_count).toBeDefined()
                    expect(movies[0].id).toBeDefined()
                    expect(movies[0].video).toBeDefined()
                    expect(movies[0].title).toBeDefined()
                    expect(movies[0].popularity).toBeDefined()
                    expect(movies[0].poster_path).toBeDefined()
                    expect(movies[0].original_language).toBeDefined()
                    expect(movies[0].original_title).toBeDefined()
                    expect(movies[0].backdrop_path).toBeDefined()
                    expect(movies[0].adult).toBeDefined()
                    expect(movies[0].overview).toBeDefined()
                    expect(movies[0].release_date).toBeDefined()
                    expect(movies[0].id).toBe(680)
                })
        })


        it('should fail on empty auth id', () => {
            expect(() => logic.retrieveFavMovies('', data.token)).toThrowError('id is empty or blank')
        }) 

        it('should fail on empty auth token', () => {
            expect(() => logic.retrieveFavMovies(data.id, '')).toThrowError('token is empty or blank')
        })

        it('should fail on undefined userId', () => {
            expect(() => logic.retrieveFavMovies(undefined, data.token)).toThrowError('id with value undefined is not a string')
        })
        
        it('should fail on undefined userToken', () => {
            expect(() => logic.retrieveFavMovies(data.id, undefined)).toThrowError('token with value undefined is not a string')
        }) 

        it('should fail on incorrect auth id', () => {
            return logic.retrieveFavMovies(data.id, 'aaaa')
                .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('User authentication failed.')
                })
        })

        it('should fail on incorrect auth token', () => {
            return logic.retrieveFavMovies(data.id, 'aaaa')
                .catch(error => {
                        expect(error).toBeDefined()
                        expect(error.message).toBe('User authentication failed.')
                })
        })


        it('should fail on incorrect tmdb api endpoint', () => {
            return logic.retrieveFavMovies(data.id, data.id)
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail when on incorrect user api endpoint', () => {
            return logic.retrieveFavMovies(data.id, data.id)
                .catch(error => expect(error).toBeDefined())
        })


        describe('user without favorites', () => {
            let user
            let data

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                data = response.data
                            })
                    })
                })

            it('should return empty array if user has no favorites', () =>  {
                return logic.retrieveFavMovies(data.id, data.token)
                    .then(movies => {
                        expect(movies).toBeDefined()
                        expect(movies instanceof Array).toBeTruthy()
                        expect(movies.length).toBe(0)
                    })
                })

        })
   })

}