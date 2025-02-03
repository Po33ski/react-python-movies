export default function ActorListItem(props) {
    return (
        <div>
            <strong>{props.actor.name}</strong>
            {' '}
            <strong>{props.actor.surname}</strong>
            {' '}
            <a onClick={props.onDelete}>Delete</a>
        </div>
    );
}