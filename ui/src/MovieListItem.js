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
            <div>
                <span>Actors:</span>
                <ul>
                    {props.movie.actors.map(actor => (
                        <li key={actor.id}>
                            {`${actor.name} ${actor.surname}`}
                        </li>
                    ))}
                </ul>
            </div>
            {props.movie.description}
        </div>
    );
}

