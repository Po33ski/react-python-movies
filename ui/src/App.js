import './App.css';
import {useState} from "react";
import { useEffect } from 'react';
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from './ActorForm';
import ActorsList from './ActorsList'
import AddActorToMovieForm from './AddActorToMovieForm'
function App() {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [addingActor, setAddingActor] = useState(false);
    const [addingMovieToActor, setAddingMovieToActor] =useState(false)

   async function handleAddMovie(movie) {
    const response = await fetch('/movies', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const movieFromServer = await response.json()
        setMovies([...movies, movieFromServer]);
        setAddingMovie(false);
        }
    }

    async function handleDeleteMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextMovies = movies.filter(m => m.id !== movie.id);
            setMovies(nextMovies);
        }
    }

    async function handleAddActors(actor) {
        const response = await fetch('/actors/', {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const actorFromServer = await response.json()
            setActors([...actors, actorFromServer]);
            setAddingActor(false);
            }
    }

    async function handleDeleteActor(actor) {
        const response = await fetch(`/actors/${actor.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextActor = actors.filter(a => a.id !== actor.id);
            setActors(nextActor);
        }
    }

    async function handleAddActorToMovie(movie_id, actor_id) {
        const response = await fetch(`/movies/${movie_id}/actors`, {
            method: 'POST',
            body: JSON.stringify({actor_id}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const updatedMovie = await response.json()
            setMovies(prevMovies =>
            prevMovies.map(m => m.id === movie_id ? updatedMovie : m));
            setAddingMovieToActor(false)
        } else {
            console.error("Failed to add actor to movie")
        }
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
            const response = await fetch(`/movies`);
            if (!response.ok) throw new Error ("Failed to download the movies");
                const movies = await response.json();
                setMovies(movies);
            } catch (error){
                console.error(error)
            }
        };
        const fetchActors = async () => {
            try{
            const response = await fetch(`/actors`);
            if (!response.ok) throw new Error ("Failed to download the actors");
                const actors = await response.json();
                setActors(actors);
            } catch (error){
                console.error(error)
            }
        };
        fetchMovies();
        fetchActors()
    }, [addingMovieToActor]);

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={handleDeleteMovie}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}
            {actors.length === 0
                ? <p>No actors yet. Maybe add something?</p>
                : <ActorsList actors={actors}
                        onDeleteActor={handleDeleteActor}

                />}
            {addingActor
                ? <ActorForm onActorSubmit={handleAddActors}
                             buttonLabel="Add an Actor"
                />
                : <button onClick={() => setAddingActor(true)}>Add an Actor</button>}
            <div>
                {addingMovieToActor
                ? (actors.length === 0 || movies.length === 0)
                ? <p>You should add something</p>
                : <AddActorToMovieForm onAddATMFSubmit={handleAddActorToMovie}
                                       buttonLabel="Add"
                                       movies={movies}
                                       actors={actors}
                    />
                : <button onClick={() => setAddingMovieToActor(true)}>Add Actors to Movies</button>
            }
            </div>
        </div>
    );
}

export default App;


