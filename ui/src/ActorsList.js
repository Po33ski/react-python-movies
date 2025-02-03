import ActorListItem from "./ActorListItem";

export default function ActorsList(props) {
    return <div>
        <strong>Actors:</strong>
        <ul className="movies-list">
            {props.actors.map(actor => <li key={actor.id}>
                <ActorListItem actor={actor} onDelete={() => props.onDeleteActor(actor)}/>
            </li>)}
        </ul>
    </div>;
}