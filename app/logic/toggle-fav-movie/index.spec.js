{ 
    const { random }= Math
    
    describe('logic - toggle fav movie', () => {
        let user

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
            return logic.toggleFavMovie(data.id, data.token, '680')
                .then(response => {

                    /* We need to retrieve user to check movieId was added to users' favorites */
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)
                        .then(response => {
                            const retrievedUser = response.data
                            expect(retrievedUser.id).toBe(data.id)
                            expect(retrievedUser.favorites instanceof Array).toBeTruthy()
                            expect(retrievedUser.favorites.length).toBe(1)
                            expect(retrievedUser.favorites[0]).toBe('680')
                        })
                    })
            })
        
        describe('when user has already favorites', () => {

          it('should fail when userId is not provided', () => {
              expect(() => logic.toggleFavMovie(undefined, data.token, '680')).toThrowError('id with value undefined is not a string')
          })

          it('should fail when userToken is not provided', () => {
              expect(() => logic.toggleFavMovie(data.id, undefined, '680')).toThrowError('token with value undefined is not a string')
          })

          it('should fail when movieId is not provided', () => {
              expect(() => logic.toggleFavMovie(data.id, data.token, undefined)).toThrowError('movie id with value undefined is not a string')
          })



        it('should fail on incorrect userId', () => {
            return logic.toggleFavMovie('aaaaa', data.token, '680')
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail on incorrect userToken', () => {
            return logic.toggleFavMovie(data.id, 'bbbbb', '680')
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail on incorrect user api endpoint', () => {
            return logic.toggleFavMovie(data.id, data.id, '680')
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail when on incorrect userId', () => {
              return logic.toggleFavMovie('aaaaa', data.token, '680')
                  .catch(error => expect(error).toBeDefined())
          })


        it('should fail on incorrect tmdb api endpoint', () => {
            return logic.toggleFavMovie(data.id, data.id, '680')
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail when on incorrect user api endpoint', () => {
            return logic.toggleFavMovie(data.id, data.id, '680')
                .catch(error => expect(error).toBeDefined())
        })


        describe('when user has already favorites', () => {
          let user
          const movieId = '680'

          beforeEach(() => {

              user = {
                  name: 'John-' + random(),
                  surname: 'Doe-' + random(),
                  username: 'johndoe-' + random() + '@mail.com',
                  password: '123-' + random(),
                  favorites: [movieId]
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

          it('should add new movie to favorites on correct data',  () => {
              const movieId = '500'
              return logic.toggleFavMovie(data.id, data.token, movieId)
                  .then(() => {
                      return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                      { 'authorization': `bearer ${data.token}` },
                      undefined)
                          .then(response => {
                              const user = response.data
                              expect(user.id).toBe(data.id)
                              expect(user.favorites instanceof Array).toBeTruthy()
                              expect(user.favorites.length).toBe(2)
                              expect(user.favorites.includes(movieId)).toBeTruthy()
                      })
                  })
          })

          it('should remove movie from favorites on correct data',  () => {
              return logic.toggleFavMovie(data.id, data.token, movieId)
                  .then(() => {
                      return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                      { 'authorization': `bearer ${data.token}` },
                      undefined)
                          .then(response => {
                              const user = response.data
                              expect(user.id).toBe(data.id)
                              expect(user.favorites instanceof Array).toBeTruthy()
                              expect(user.favorites.length).toBe(0)
                              expect(user.favorites.includes(movieId)).toBeFalsy()
                        })
                    })
              })
          })
      })
  })
}