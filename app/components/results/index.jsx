function Results(props) {
    return <>
        <ul className="mosaicPanel">
        {/* For each movie in movies array, create a list element and add event listener with closure to it*/}
        {props.movies.map(movie => <li className="mosaicList" key={movie.id} onClick={ () => {
            
            props.onItem(movie.id.toString())
        }}>
        {/* Send individual movie to paintItem which will create its visualization in the grid */}
        {props.paintItem(movie)}
        </li>)}
        </ul>
    </>
}