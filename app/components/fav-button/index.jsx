function FavButton({ active, onToggle }) {
    return <button className="mosaicInfo__fav" onClick={event => {
        event.stopPropagation()
        onToggle()
    }}>{active ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i> }</button>
}
