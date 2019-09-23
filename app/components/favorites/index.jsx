function Favorites({favs, removeFav, showDetail, onClickList}) {
    return  <>
        {favs.length ?
        <Results movies={favs} paintItem={movie => {
            return <MovieItem movie={movie} onToggle={removeFav} onClickList={onClickList} />
        }} onItem={showDetail} />
        : 
        <div className="emptyFavorites">  
         <p><i className="far fa-heart"/></p>
         <h3  className="big-letter">There are no favorites yet</h3>
         </div>}
        </>
}