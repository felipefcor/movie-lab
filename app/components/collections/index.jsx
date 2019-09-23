function Collections(props){
    
    return <>  
    {/* List of items by genre. If you click on a genre appears a list of movies of this genre  */}     <ul className="container">
                                  
        <div className= "container_image">
        <img className="image_collection" alt="Action" src="https://static.filmin.es/images/collection/30/4/poster_0_3_550x722.jpg" href="" data-id={28} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}></img>
        <p>Collection</p>    
        <p className="title_collection">Action</p>            
        </div>

        <div className= "container_image">
        <img className="image_collection" alt="Drama" src="     https://static.filmin.es/images/collection/25574/3/poster_0_3_550x722.jpg" href="" data-id={18} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}></img>
        <p>Collection</p>    
        <p className="title_collection">Crossing Stories</p>            
        </div>

        <div className= "container_image">
        <img className="image_collection" alt="Western Moderno" src="https://static.filmin.es/images/collection/5679/4/poster_0_3_550x722.webp" href="" data-id={37} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}></img>
        <p>Collection</p>    
        <p className="title_collection">Modern Western</p>            
        </div>

        <div className= "container_image">
        <img className="image_collection" alt="Comedy" src="https://static.filmin.es/images/collection/71148/3/poster_0_3_550x722.jpg" href="" data-id={35} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}></img>
        <p>Collection</p>    
        <p className="title_collection">Comedy</p>            
        </div>

        <div className= "container_image">
        <img className="image_collection" alt="Thriller" src="https://static.filmin.es/images/collection/66197/3/poster_0_3_550x722.jpg" href="" data-id={53} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}></img>
         <p>Collection</p>    
        <p className="title_collection">Extinc</p> 
        </div>

        <div className= "container_image">
        <img className="image_collection" alt="SciFy" src="https://static.filmin.es/images/collection/7666/3/poster_0_3_550x722.jpg" href="" data-id={878} onClick={event=>{
            const { target: { dataset: { id: query } }  } = event
            event.preventDefault()
            props.onCollection(query)
            }}></img>
        <p>Collection</p>    
        <p className="title_collection">Cinema and Science</p>             
        </div>

    
    </ul> 
    </>
}