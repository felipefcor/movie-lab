{
    const { random }= Math
    
    describe('logic - retrieve user', () => {

        let user, data

       //setup user to register, auth and retrieve against the api
       beforeEach(()=> {
 
            user= {
                name: 'pepe' + random(),
                surname: 'perez'  + random(),
                username: 'pE' + random() + '@mail.com',
                password: 'jAg' + random(),
                favorites: []
              
            }
            //call to the api to register the user with the random data
            return call('https://skylabcoders.herokuapp.com/api/user', 'post', {'content-type': 'application/json' }, user )
                .then(response=>{
                    if (response.status==="KO") throw new Error (response.error)
                     //call again to the api to authenticate the previous user 
                    else return call('https://skylabcoders.herokuapp.com/api/auth', 'post', {'content-type':'application/json'}, {username: user.username, password:user.password})
                })
           
             //the auth call returns the id and the token of the user and we keep this data to run the tests
            .then(response=>{
                
                if(response.status==='KO') throw new Error(response.error)
                
                    data= response.data

               })
            
        })
      
            it('should succeed on matching user declared with the user registered', () =>
                 
            logic.retrieveUser(data.id, data.token)
                .then(response=>{                    
                    expect(response.id).toBe(data.id)
                    expect(response.name).toBe(user.name)
                    expect(response.surname).toBe(user.surname)
                    expect(response.username).toBe(user.username)
                    expect(response.password).toBeUndefined()
                })
            ) 

            it('should failed retrieving the user with wrong id', () =>
                 
            logic.retrieveUser('323', data.token)
                
                .catch(error=>{
                    expect(error).toBeDefined()
                }) 
                   
            ) 
            it('should failed retrieving the user with wrong token', () =>
                 
            logic.retrieveUser(data.id, '333333')
                
                .catch(error=>{
                    expect(error).toBeDefined()
                }) 
                   
            ) 

            it('should fail on empty id', () =>
            expect(() =>
                logic.retrieveUser('', 'a-token')
            ).toThrowError(Error, 'id is empty or blank')
            )

            it('should fail on empty token', ()=> 
            expect(() =>
                logic.retrieveUser('13424', '')
            ).toThrowError(Error, 'token is empty or blank')
            )
            

            it('should fail on id undefined', () =>
            expect(() =>
                logic.retrieveUser(undefined, 'a-token')
            ).toThrowError(Error, 'id with value undefined is not a string')
            )

            it('should fail on token undefined', ()=> 
            expect(() =>
                logic.retrieveUser('13424', undefined)
            ).toThrowError(Error, 'token with value undefined is not a string')
            )
    })
}