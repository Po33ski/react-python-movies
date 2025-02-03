import ActorsList from "./ActorsList";

export default function MovieListItem(props) {

    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>
            {props.movie.description}
        </div>
    );
}

    // return (
    //     <div>
    //         <div>
    //             <strong>{props.movie.title}</strong>
    //             {' '}
    //             <span>({props.movie.year})</span>
    //             {' '}
    //             directed by {props.movie.director}
    //             {' '}
    //             <a onClick={props.onDelete}>Delete</a>
    //         </div>
    //         <div>
    //             <strong>Actors:</strong>
    //             <ActorsList actors={props.movie.actors}/>
    //             <select onChange={(e) => setSelectedActor(e.target.value)} value={selectedActor}>
    //                 <option value="">Select Actor</option>
    //                     {props.allActors.map(actor => (
    //                         <option key={actor.id} value={actor.id}>
    //                             {`${actor.name} ${actor.surname}`}
    //                         </option>
    //                     ))}
    //             </select>
    //             <a onClick={handleAddActor}>Add Actor</a>
    //         </div>
    //         {props.movie.description}
    //     </div>
    // );