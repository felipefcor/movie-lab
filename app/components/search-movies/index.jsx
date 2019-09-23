function Search(props) {
    return <form className="form" onSubmit={event => {
        event.preventDefault()

        const { target: { query: { value: query } } } = event

        props.onSearch(query, event)
    }}>
        {<input   className="search-bar" type="text" name="query" placeholder="Search by movie title..."/>}
        
    </form>
}