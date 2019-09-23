function MovieDetail({movie, onBack, onToggle}){

    return <>
    {/* Only displayed after query search or click on a collection. 
    Composed by a grid of movie items with title, rating, poster and a fav button */}
        <div className="containerDetail">

        <div className= "panelDetail">
        <h3 className="panelDetail__title">{ movie.movieComplete.original_title }</h3>
        <span className="panelDetail__vote">{movie.movieComplete.vote_average}</span>
  
        <div className= "fav">
        <FavButton className= "fav" active={movie.movieComplete.favorite} onToggle={() => onToggle(movie.movieComplete.id.toString())} />
        </div>
        
        <span className="panelDetail__date">{ movie.movieComplete.release_date }</span>
        
        
        <h4 className="panelDetail__director">Director</h4>
        <p className="panelDetail__director--name">{movie.director}</p>
        <h4 className="panelDetail__mainCast">Main Cast</h4>
        {movie.mainCast.map(movie => <li className="panelDetail__mainCast--name"key={movie}>{movie}</li>)}
        
        
        <h4 className="panelDetail__description">Overview</h4>
        <span className="panelDetail__description--description">{ movie.movieComplete.overview }</span>
        {onBack && <a className="close__detail--detail" href="" onClick={ event => {
            event.preventDefault()

            onBack()
        }}></a>}
        
        </div>
        <div className= "panelImage">
        <img className="panelImage__image"src={`http://image.tmdb.org/t/p/w342/${movie.movieComplete.poster_path}`} />
        </div>

        </div>
        
        
    </>
}
