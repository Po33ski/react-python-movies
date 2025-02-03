import {useState} from "react";

export default function AddActorToMovieForm(props) {
    const [selectedMovie, setSelectedMovie] = useState('');
    const [selectedActor, setSelectedActor] = useState('');

    function handleSelectedActor(event) {
        setSelectedActor(event.target.value)
        console.log(event.target.value)
    }

    function handleSelectedMovie(event) {
        setSelectedMovie(event.target.value)
        console.log(event.target.value)
    }

    function addActorToMovie(event) {
        event.preventDefault();

        props.onAddATMFSubmit(selectedMovie, selectedActor);
        setSelectedMovie('');
        setSelectedActor('');

    }
    return <form onSubmit={addActorToMovie}>
        <h2>Add actor to movie</h2>
        <div>
            <label>Select Actor</label>
            <div>
                <select onChange={handleSelectedActor} value={selectedActor}>
                    <option value="">Select Actor</option>
                    {props.actors.map(actor => (
                        <option key={actor.id} value={actor.id}>
                            {`${actor.name} ${actor.surname}`}
                        </option>
                    ))}
                </select>
            </div>
            <label>Select Movie</label>
            <div>
                <select onChange={handleSelectedMovie} value={selectedMovie}>
                    <option value="">Select Movie</option>
                    {props.movies.map(movie => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}