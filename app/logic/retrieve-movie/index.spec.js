{
    const { random } = Math
    /* Retrieve movie detail movie specs:
        a) User should be able to get movie details when click in one of the movie results.
        b) If user is logged, detail result will incorporate favorites information.
        c) Empty search will return non-filtered list of movies
    */
    describe('logic - retrieve movie', () => {
        let user
        

        beforeEach(() =>
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        )

        it('should succed on valid movie id', () => {
            const id = "11804"

            return logic.retrieveMovie(undefined, undefined, id)
                .then(movie => {

                    expect(movie.movieComplete.vote_count).toBeDefined()
                    expect(movie.movieComplete.id).toBeDefined()
                    expect(movie.movieComplete.video).toBeDefined()
                    expect(movie.movieComplete.title).toBeDefined()
                    expect(movie.movieComplete.popularity).toBeDefined()
                    expect(movie.movieComplete.poster_path).toBeDefined()
                    expect(movie.movieComplete.original_language).toBeDefined()
                    expect(movie.movieComplete.original_title).toBeDefined()
                    expect(movie.movieComplete.genres).toBeDefined()
                    expect(movie.movieComplete.backdrop_path).toBeDefined()
                    expect(movie.movieComplete.adult).toBeDefined()
                    expect(movie.movieComplete.overview).toBeDefined()
                    expect(movie.movieComplete.release_date).toBeDefined()
                    expect(movie.director).toBeDefined()
                    expect(movie.mainCast).toBeDefined()
                    expect(movie.favorite).toBeUndefined()
                    
                })
        })

        it('should fail on non valid movie id', ()=>{
            const id = 'fhsdjue'

            return logic.retrieveMovie(undefined, undefined, id)
            .then(response => expect(response).toBeUndefined())
            .catch(error => expect(error).toBeDefined())
  
            })
        
        it('should fail with no id', ()=>

            expect (() => 
                logic.retrieveMovie(undefined, undefined, '')
             ).toThrowError(Error, 'movie id is empty or blank')
        )
        
         
            it('should fail with no string id', () => 
            expect(()=>
                logic.retrieveMovie(undefined, undefined, undefined)
            ).toThrowError(Error, 'movie id with value undefined is not a string')
        )
        

        describe('logic - retrieve movie - user with favorites', ()=>{
            const id= "11804"
            let data

            beforeEach(() => {

                user.favorites.push(id)

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response =>{
                    if(response.status === 'KO')throw new Error(response.error)

                    return call('https://skylabcoders.herokuapp.com/api/auth','post',{ 'content-type': 'application/json' }, { username: user.username, password: user.password })
                    .then(response => {
                        if(response.status === 'KO')throw new Error(response.error)

                        data = response.data
                    })
                })
            })

            it('should succeed on valid id',()=>
            logic.retrieveMovie(data.id, data.token, id)
            .then(movie => {
                    expect(movie.movieComplete.vote_count).toBeDefined()
                    expect(movie.movieComplete.id).toBeDefined()
                    expect(movie.movieComplete.video).toBeDefined()
                    expect(movie.movieComplete.title).toBeDefined()
                    expect(movie.movieComplete.popularity).toBeDefined()
                    expect(movie.movieComplete.poster_path).toBeDefined()
                    expect(movie.movieComplete.original_language).toBeDefined()
                    expect(movie.movieComplete.original_title).toBeDefined()
                    expect(movie.movieComplete.genres).toBeDefined()
                    expect(movie.movieComplete.backdrop_path).toBeDefined()
                    expect(movie.movieComplete.adult).toBeDefined()
                    expect(movie.movieComplete.overview).toBeDefined()
                    expect(movie.movieComplete.release_date).toBeDefined()
                    expect(movie.director).toBeDefined()
                    expect(movie.mainCast).toBeDefined()
                    expect(movie.favorite).toBeUndefined()
            }))
            it('should fail on non valid id', () => {
                const id = 'fsfesf'
                return logic.retrieveMovie(data.id, data.token, id)
                .then(response => expect(response).toBeUndefined())
                .catch(error => expect(error).toBeDefined())
            })

            it('should fail with emtpy id', () => 
                expect(()=>
                    logic.retrieveMovie(data.id, data.token, '')
                ).toThrowError(Error, 'movie id is empty or blank')
            )
                   

            it('should fail with no string id', () => 
                expect(()=>
                    logic.retrieveMovie(data.id, data.token, undefined)
                ).toThrowError(Error, 'movie id with value undefined is not a string')
            )

            
        })
    })
   
}