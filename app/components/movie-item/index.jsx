function MovieItem({ movie, onToggle, onClickList }) {

    return <>
    {/* Only displayed after query search or click on a collection. 
    Composed by a grid of movie items with title, rating, poster and a fav button */}
    <div className="mosaicImage">
        <img className="mosaicImage__image" src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`} />
        <div className= "mosaicImage__background"></div>
        
        <div className="mosaicInfo">
        <h3 className="mosaicInfo__title">{ movie.original_title }</h3>
        <span className="mosaicInfo__vote">{movie.vote_average}</span>
        <ListButton active={movie.inlist} onClickList = {() => onClickList(movie.id.toString())} />
        <span className="mosaicInfo__date">{ movie.release_date }</span>
        <FavButton active={movie.favorite} onToggle={() => onToggle(movie.id.toString())} />        
        </div>
        </div>

    </>
}
