{
    const { random } = Math

    /* Search movie specs:
        a) User should be able to search by keyword and get list of movies returned.
        b) If user is logged, search results will incorporate favorites information.
        c) Empty search will return non-filtered list of movies
        d) Non-valid query should display message saying no results for that query
    */

    describe('logic - search movies', () => {

        describe('search by keyword', () => {
            let data
            let user

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }
        
            return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' }, user)
                    .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                        { 'content-type': 'application/json' },
                        { username: user.username, password: user.password }))
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                        else data = response.data
                    })
                    .catch(error => error)
            })
    
            it('should succeed on correct data', () => {
                return logic.searchMovies(data.id, data.token, 'train', undefined)
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response instanceof Array).toBeTruthy()
                    expect(response[0].id).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined)
                })

            
            it('should fail on non-valid query', () => {
                let query = 'asdafsafsdf'
                return logic.searchMovies(data.id, data.token, query, undefined)
                    .then(response => {
                        expect(response).toBeDefined()
                        expect(response instanceof Array).toBeTruthy()
                        expect(response.length).toBe(0)
                    })
                    
                })
            

            it('should fail when query is not provided', () => {
                expect(() => logic.searchMovies(data.id, data.token, undefined, undefined)).toThrowError('query with value undefined is not a string')
            })

            it('should fail on empty userId', () => {
                expect(() => logic.searchMovies('', data.token, 'train', undefined)).toThrowError('id is empty or blank')
            })
            
            it('should fail on empty userToken', () => {
                expect(() => logic.searchMovies(data.id, '', 'train', undefined)).toThrowError('token is empty or blank')
            })

            it('should fail on empty movieId', () => {
                expect(() => logic.searchMovies(data.id, data.token, '', undefined)).toThrowError('query is empty or blank')
            })

            it('should fail on incorrect userId', () => {
                return logic.searchMovies('aaaaa', data.token, 'train', undefined)
                    .catch(error => expect(error).toBeDefined())
            })

            it('should fail on incorrect userToken', () => {
                return logic.searchMovies(data.id, 'bbbbb', 'train', undefined)
                    .catch(error => expect(error).toBeDefined())
            })

            it('should fail on incorrect user api endpoint', () => {
                return logic.searchMovies(data.id, data.id, 'train', undefined)
                    .catch(error => expect(error).toBeDefined())
            })


            it('should fail on incorrect tmdb api endpoint', () => {
                return logic.searchMovies(data.id, data.id, 'train', undefined)
                    .catch(error => expect(error).toBeDefined())
            })


            describe('search by keyword - user with favorites', () => {
                let data
                let user

                beforeEach(() => {
                    user = {
                        name: 'John-' + random(),
                        surname: 'Doe-' + random(),
                        username: 'johndoe-' + random() + '@mail.com',
                        password: '123-' + random(),
                        favorites: []
                    }
                
                    return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                        { 'content-type': 'application/json' }, user)
                            .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                                { 'content-type': 'application/json' },
                                { username: user.username, password: user.password }))
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)
                                else data = response.data
                            })
                            .catch(error => error)
                })

                it('should succeed on matching criteria', () => {
                const query = 'train' // 20 results

                return logic.searchMovies(data.id, data.token, query, undefined)
                    .then(movies => {
                        expect(movies).toBeDefined()
                        expect(movies instanceof Array).toBeTruthy()
                        expect(movies.length).toBe(20)

                        let favorites = 0

                        movies.forEach(movie => {
                            expect(movie.vote_count).toBeDefined()
                            expect(movie.id).toBeDefined()
                            expect(movie.video).toBeDefined()
                            expect(movie.title).toBeDefined()
                            expect(movie.popularity).toBeDefined()
                            expect(movie.poster_path).toBeDefined()
                            expect(movie.original_language).toBeDefined()
                            expect(movie.original_title).toBeDefined()
                            expect(movie.genre_ids).toBeDefined()
                            expect(movie.backdrop_path).toBeDefined()
                            expect(movie.adult).toBeDefined()
                            expect(movie.overview).toBeDefined()
                            expect(movie.release_date).toBeDefined()

                            movie.favorite && favorites++
                        })

                        expect(favorites).toBe(user.favorites.length)
                    })
                })
            })
        })


    /* Search by collections specs:
        a) It is possible to search by collections by genre located in the landing
        b) If user is logged, the collections results will incorporate favorites information.
        c) Empty search will return non-filtered list of movies
        d) Non-valid query should display message saying no results for that query
    */

        describe('search by collections', () => {
            let data
            let user

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }
        
            return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' }, user)
                    .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                        { 'content-type': 'application/json' },
                        { username: user.username, password: user.password }))
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                        else data = response.data
                    })
                    .catch(error => error)
            })
    
            it('should succeed on correct data', () => {
                return logic.searchMovies(data.id, data.token, '28', true)
                .then(response => {
                    expect(response).toBeDefined()
                    expect(response instanceof Array).toBeTruthy()
                    expect(response[0].id).toBeDefined()
                })
                .catch(error => expect(error).toBeUndefined)
                })

            
            it('should fail on non-valid query', () => {
                let query = 'asdafsafsdf'
                return logic.searchMovies(data.id, data.token, query, true)
                    .then(response => {
                        expect(response).toBeDefined()
                        expect(response instanceof Array).toBeTruthy()
                        expect(response.length).toBe(0)
                    })
                    
                })
            

            it('should fail when query is not provided', () => {
                expect(() => logic.searchMovies(data.id, data.token, undefined, true)).toThrowError('query with value undefined is not a string')
            })

            it('should fail on empty userId', () => {
                expect(() => logic.searchMovies('', data.token, '28', true)).toThrowError('id is empty or blank')
            })
            
            it('should fail on empty userToken', () => {
                expect(() => logic.searchMovies(data.id, '', '28', true)).toThrowError('token is empty or blank')
            })

            it('should fail on empty movieId', () => {
                expect(() => logic.searchMovies(data.id, data.token, '', true)).toThrowError('query is empty or blank')
            })

            it('should fail on incorrect userId', () => {
                return logic.searchMovies('aaaaa', data.token, '28', true)
                    .catch(error => expect(error).toBeDefined())
            })

            it('should fail on incorrect userToken', () => {
                return logic.searchMovies(data.id, 'bbbbb', '28', true)
                    .catch(error => expect(error).toBeDefined())
            })

            it('should fail on incorrect user api endpoint', () => {
                return logic.searchMovies(data.id, data.id, '28', true)
                    .catch(error => expect(error).toBeDefined())
            })


            it('should fail on incorrect tmdb api endpoint', () => {
                return logic.searchMovies(data.id, data.id, '28', true)
                    .catch(error => expect(error).toBeDefined())
            })


            describe('search by collections - user with favorites', () => {
                let data
                let user

                beforeEach(() => {
                    user = {
                        name: 'John-' + random(),
                        surname: 'Doe-' + random(),
                        username: 'johndoe-' + random() + '@mail.com',
                        password: '123-' + random(),
                        favorites: []
                    }
                
                    return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                        { 'content-type': 'application/json' }, user)
                            .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                                { 'content-type': 'application/json' },
                                { username: user.username, password: user.password }))
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)
                                else data = response.data
                            })
                            .catch(error => error)
                })

                it('should succeed on matching criteria', () => {
                const query = '28' // 20 results

                return logic.searchMovies(data.id, data.token, query, true)
                    .then(movies => {
                        expect(movies).toBeDefined()
                        expect(movies instanceof Array).toBeTruthy()
                        expect(movies.length).toBe(20)

                        let favorites = 0

                        movies.forEach(movie => {
                            expect(movie.vote_count).toBeDefined()
                            expect(movie.id).toBeDefined()
                            expect(movie.video).toBeDefined()
                            expect(movie.title).toBeDefined()
                            expect(movie.popularity).toBeDefined()
                            expect(movie.poster_path).toBeDefined()
                            expect(movie.original_language).toBeDefined()
                            expect(movie.original_title).toBeDefined()
                            expect(movie.genre_ids).toBeDefined()
                            expect(movie.backdrop_path).toBeDefined()
                            expect(movie.adult).toBeDefined()
                            expect(movie.overview).toBeDefined()
                            expect(movie.release_date).toBeDefined()

                            movie.favorite && favorites++
                        })

                        expect(favorites).toBe(user.favorites.length)
                    })
                })
            })
        })
    })
}
