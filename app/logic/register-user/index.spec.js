{
    const { random }= Math

    describe('logic - register user', () => {

        let user, data

        beforeEach(() =>
            user = {
                name: 'Name-' + random(),
                surname: 'Surname-' + random(),
                username: 'username-' + random() + '@mail.com',
                password: 'Password-' + random(),
                favorites: [],
                lists: []
            }
        )
        it('should succeed on correct data user', () =>
            logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
            .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post', {
                'content-type': 'application/json'
            }, {
                username: user.username,
                password: user.password
            }))
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                 else { 
                    data = response.data

                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get', {
                        'authorization': `bearer ${data.token}`
                    }, undefined)
                 } 
            })
            .then(response => {
                const _user = response.data

                expect(_user.name).toBe(user.name)
                expect(_user.surname).toBe(user.surname)
                expect(_user.username).toBe(user.username)
                expect(_user.password).toBeUndefined()
                expect(_user.id).toBe(data.id)
                expect(_user.favorites).toBeDefined()
                expect(_user.favorites).toEqual(user.favorites)
                expect(_user.lists).toBeDefined()
                expect(_user.lists).toEqual(user.lists)
            })

        )
        it('should fail on empty name', () =>
            expect(() =>
                logic.registerUser('', 'Doe-1', 'johndoe-1@mail.com', 'Password1', 'Password1')).toThrowError(Error, 'name is empty or blank')
        )

        it('should fail on empty surname', () =>
            expect(() =>
                logic.registerUser('John-2', '', 'johndoe-2@mail.com', 'Password2', 'Password2')).toThrowError(Error, 'surname is empty or blank')
        )

        it('should fail on non-valid username', () =>
            expect(() =>
                logic.registerUser('John-3', 'Doe-3', 'johndoe-3#mail.com', 'Password3', 'Password3')).toThrowError(Error, 'username with value johndoe-3#mail.com is not a valid e-mail')
        )

        it('should fail on non-maching re-password', () =>
            expect(() =>
                logic.registerUser('John-4', 'Doe-4', 'johndoe-4@mail.com', 'Password4', 'Password5')).toThrowError(Error, 'passwords do not match')
        )
        it('should fail on non-valid password', () =>
            expect(() =>
                logic.registerUser('John-5', 'Doe-5', 'johndoe-5@mail.com', '123', '123')).toThrowError(Error, 'password is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer')
        )

        it('should fail with name if is not  a string', () =>
            expect(() =>
                logic.registerUser([], 'Doe-6', 'johndoe-6@mail.com', 'Password6', 'Password6')).toThrowError(Error, 'name with value  is not a string')
        )

        it('should fail with surname if is not  a string', () =>
            expect(() =>
                logic.registerUser('John-7', NaN, 'johndoe-7@mail.com', 'Password7', 'Password7')).toThrowError(Error, 'surname with value NaN is not a string')
        )

        

        describe('when user alredy exists', () => {
            it('should fail on alredy existing username', () =>
                logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
                .catch(error => expect(error).toBeUndefined())
                .then(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password))
                .catch(error => expect(error).toBeDefined())
            )
            
        })
    })
}
