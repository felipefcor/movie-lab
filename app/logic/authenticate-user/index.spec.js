{
    const { random }= Math

describe('logic - authenticate users', () =>{
    let user

    beforeEach(() => {
        user =  {
            name: 'Paco' + random(),
            surname: 'Martinez' + random(),
            username: 'pacoms' + random() +'@email.com',
            password: 'paS1' + random().toFixed(6)
        }
        return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
        .then(response =>{
            if(response.status==='KO') throw new Error (response.error)
        })
    }) 

    it('should succeed on correct data', ()=>
        logic.authenticateUser(user.username, user.password)
        .then(response=> {
            
            expect(response).toBeDefined()
            const id = response.id
            const token = response.token

            expect(id).toBeDefined()
            expect(token).toBeDefined()
            
        })
    )

     it('should fail on not correct password', ()=> 
        logic.authenticateUser(user.username, 'passwjorD1d')
     .catch (error=> expect(error).toBeDefined())
     )

    it('should fail on empty username', () => {
        expect(() =>
            logic.authenticateUser('', user.password)
        ).toThrowError(Error, 'username is empty or blank')
    })

    it('should fail on emtpy password', () => {
        expect(()=> 
            logic.authenticateUser(user.username, '')
        ).toThrowError(Error, 'password is empty or blank')
    })

    it('should fail on non-valid username', () => {
        expect(()=> 
            logic.authenticateUser('asdf#adsf.com', user.password)
        ).toThrowError(Error, 'username with value asdf#adsf.com is not a valid e-mail')
    })

    it('should fail on non-string username', () => {
        expect(()=> 
            logic.authenticateUser(undefined, user.password)
        ).toThrowError(Error, 'username with value undefined is not a string')
    })

    it('should fail on non-string password', () => {
        expect(()=> 
            logic.authenticateUser(user.username, undefined)
        ).toThrowError(Error, 'password with value undefined is not a string')
    })

})

}