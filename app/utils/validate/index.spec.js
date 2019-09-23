{
const { random } = Math
describe('logic - validate', ()=>{
    describe('string', ()=>{
        it('should succeed on correct string', () =>{
            const result = validate.string('query','string')
            expect(result).toBeUndefined()
            
        })
        it('should fail on non correct string', () =>{
            expect(() =>
            validate.string(123,'string')).toThrowError(Error, `string with value 123 is not a string`)
            
        })
        it('should fail on empty string', () =>{
            expect(() =>
            validate.string('','string')).toThrowError(Error, `string is empty or blank`)
            
        })

        it('should fail on empty string', () =>{
            expect(() =>
            validate.string('','string')).toThrowError(Error, `string is empty or blank`)
            
        })
        it('should fail on empty string', () =>{
            expect(() =>
            validate.string( '','string')).toThrowError(Error, `string with value  does not match one of the expected values: `)
            
        })

    })
    describe('email', ()=>{
        it('should succeed on correct email', () =>{
            const result = validate.password('John-'+random()+'@gmail.com','string')
            expect(result).toBeUndefined()
            
        })
        it('should fail on non correct email', () =>{
            expect(() =>
            validate.email(123,'email')).toThrowError(Error, `email with value 123 is not a valid e-mail`)
            
        })

    })
    describe('password', ()=>{
        it('should succeed on correct password', () =>{
            const result = validate.password('123abc','password')
            expect(result).toBeUndefined()
            
        })
        it('should fail on non correct password', () =>{
            expect(() =>
            validate.password(123,'password')).toThrowError(Error, `password is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer`)
            
        })
    })

    describe('URL', ()=>{
        it('should succeed on correct URL', () =>{
            const result = validate.url('https://developer.mozilla.org/es/','string')
            expect(result).toBeUndefined()
            
        })
         it('should fail on non correct URL', () =>{
            expect(() =>
            validate.url(123,'url')).toThrowError(Error, `url with value 123 is not a valid URL`)
            
        })
    })

})
}