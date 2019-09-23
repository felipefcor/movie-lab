function ListModal({movieId, lists, onCreateList, onToggleMovieList, error, feedback, onClose}) {
    return  <div className='modal-outer'>
        {lists && 
            <div className="modal-inner">
                <a href="" className="close" onClick={event => {
                    event.preventDefault()
                    onClose()
                }}></a>               
                <h3 className="modal-inner__title">Add to</h3>

                <ul className="modal-inner__list">
                    {lists.map(list => 
                        <li className="modal-inner__item" key={Math.random().toFixed(5)}>
                        {list.inList ?
                            <a className="modal-inner__btn modal-inner__btn--active" key={Math.random().toFixed(5)} onClick={() => onToggleMovieList(movieId, list.name)}>{list.name}</a>
                        :
                            <a className="modal-inner__btn" key={Math.random().toFixed(5)} onClick={() => onToggleMovieList(movieId, list.name)}>{list.name}</a>
                        }
                    </li>)
                    }
                </ul>
                <form className="form-panel" onSubmit={(event) => {
                    onCreateList(event)
                }}>
                    <input type="text" name="list" />
                    <button className="button">Create new list</button>
                </form>
                {error && <Feedback message={error}/>}
                {feedback && <Feedback message={feedback} level='success' />}
            </div>}
        </div>
}
