{ 
    const { random }= Math
    
    describe('logic - create custom lists', () => {
        let user
        let listName = 'Best of 2019'

        beforeEach(() => {

            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: [],
                lists: []
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
            return logic.createList(data.id, data.token, listName)
                .then(lists => {

                    /* We need to retrieve user to check list was added to users' lists */
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)
                        .then(response => {
                            const retrievedUser = response.data
                            expect(retrievedUser.id).toBe(data.id)
                            expect(retrievedUser.lists instanceof Array).toBeTruthy()
                            expect(retrievedUser.lists.length).toBe(1)
                            expect(retrievedUser.lists[0].name).toBe(listName)
                        })
                    })
            })
        

        /* Undefined */
        it('should fail when userId is not provided', () => {
            expect(() => logic.createList(undefined, data.token, listName)).toThrowError('id with value undefined is not a string')
        })

        it('should fail when userToken is not provided', () => {
            expect(() => logic.createList(data.id, undefined, listName)).toThrowError('token with value undefined is not a string')
        })

        it('should fail when listName is not provided', () => {
            expect(() => logic.createList(data.id, data.token, undefined)).toThrowError('list name with value undefined is not a string')
        })

        /* Wrong credentials */
        it('should fail on incorrect userId', () => {
            return logic.createList('aaaaa', data.token, listName)
                .catch(error => expect(error).toBeDefined())
        })

        it('should fail on incorrect userToken', () => {
            return logic.createList(data.id, 'bbbbb', listName)
                .catch(error => expect(error).toBeDefined())
        })

        
        /* Empty parameters */
        it('should fail when userId is not provided', () => {
            expect(() => logic.createList('', data.token, listName)).toThrowError('id is empty or blank')
        })

        it('should fail when userToken is not provided', () => {
            expect(() => logic.createList(data.id, '', listName)).toThrowError('token is empty or blank')
        })

        it('should fail when listName is not provided', () => {
            expect(() => logic.createList(data.id, data.token, '')).toThrowError('list name is empty or blank')
        }) 

        /* Wrong endpoints */
        it('should fail on incorrect user api endpoint', () => {
            return logic.createList(data.id, data.id, listName)
                .catch(error => expect(error).toBeDefined())
        })


        it('should fail on incorrect tmdb api endpoint', () => {
            return logic.createList(data.id, data.id, listName)
                .catch(error => expect(error).toBeDefined())
        })


        describe('when user has already custom lists', () => {
          let user
          let listName = 'Top 10 All Time'

          beforeEach(() => {

              user = {
                  name: 'John-' + random(),
                  surname: 'Doe-' + random(),
                  username: 'johndoe-' + random() + '@mail.com',
                  password: '123-' + random(),
                  favorites: [],
                  lists: [{name: 'Best of 2019', movies: []}]
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

          it('should add new list to user\'s list on correct data',  () => {
              return logic.createList(data.id, data.token, listName)
                  .then(() => {
                      return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                      { 'authorization': `bearer ${data.token}` },
                      undefined)
                          .then(response => {
                              const user = response.data
                              expect(user.id).toBe(data.id)
                              expect(user.lists instanceof Array).toBeTruthy()
                              expect(user.lists.length).toBe(2)
                              expect(user.lists[0].name).toBe('Best of 2019')
                              expect(user.lists[0].movies.length).toBe(0)
                              expect(user.lists[1].name).toBe('Top 10 All Time')
                              expect(user.lists[1].movies.length).toBe(0)
                      })
                  })
            })

        })
    })
}