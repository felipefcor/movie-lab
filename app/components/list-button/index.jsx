function ListButton({ active, onClickList }) {
    return <button className="mosaicInfo__list" onClick={event => {
        event.stopPropagation()
        onClickList()
    }}>{active ? <i  class="fas fa-list" style="color: blue"></i> : <i className="fas fa-list"></i> }</button>
}