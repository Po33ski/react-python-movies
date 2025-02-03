import './App.css';
import {useState} from "react";
import { useEffect } from 'react';
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from './ActorForm';
import ActorsList from './ActorsList'

function App() {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [addingActor, setAddingActor] = useState(false);

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
            const nextActor = actors.filter(m => m !== actor);
            setActors(nextActor);
        }
    }

    async function handleAddActorToMovie(movie, actor) {
        const response = await fetch(`/movies/${movie}/actors`, {
            method: 'POST',
            body: JSON.stringify({actor_id: actor.id}),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            const updatedMovie = await response.json()
            setMovies(prevMovies =>
            prevMovies.map(m => m.id === movie ? updatedMovie : m)
        );
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
    }, []);

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
        </div>
    );
}

export default App;


/*  onDeleteMovie={(movie) => setMovies(movies.filter(m => m !== movie))} */