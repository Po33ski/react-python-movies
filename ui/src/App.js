import './App.css';
import {useState, useEffect, useCallback} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorForm from './ActorForm';
import ActorsList from './ActorsList'
import AddActorToMovieForm from './AddActorToMovieForm'
import { ErrorMessage } from './ErrorMessage'

function App() {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [addingActor, setAddingActor] = useState(false);
    const [addingMovieToActor, setAddingMovieToActor] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null);


  const handleError = useCallback((message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }, []);

   async function handleAddMovie(movie) {
       try {
        const response = await fetch('/movies', {
            method: 'POST',
            body: JSON.stringify(movie),
            headers: { 'Content-Type': 'application/json' }
        });
            if (!response.ok) throw new Error("Failed to add movie");
            const movieFromServer = await response.json()
            setMovies([...movies, movieFromServer]);
            setAddingMovie(false);
             } catch (error) {
              handleError(error.message);
           }
   }

    async function handleDeleteMovie(movie) {
       try {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error("Failed to delete movie");
            const nextMovies = movies.filter(m => m.id !== movie.id);
            setMovies(nextMovies);
        } catch(error){
            handleError(error.message);
       }
    }

    async function handleAddActors(actor) {
       try{
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
        else throw new Error("Failed to add actor");
       }catch(error){
            handleError(error.message);
       }
    }

    async function handleDeleteActor(actor) {
       try{
        const response = await fetch(`/actors/${actor.id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            const nextActor = actors.filter(a => a.id !== actor.id);
            setActors(nextActor);
        }
       else throw new Error("Failed to delete actor");
       }catch(error){
            handleError(error.message);
       }
    }

    async function handleAddActorToMovie(movie_id, actor_id) {
        try {
            const response = await fetch(`/movies/${movie_id}/actors`, {
                method: 'POST',
                body: JSON.stringify({actor_id}),
                headers: {'Content-Type': 'application/json'}
            });
            if (response.ok) {
                const updatedMovie = await response.json()
                setMovies(prevMovies =>
                    prevMovies.map(m => m.id === movie_id ? updatedMovie : m));
                setAddingMovieToActor(false)
            } else throw new Error("Failed to add actor to movie");
        }catch(error){
            handleError(error.message);
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
                handleError(error.message);
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
                handleError(error.message);
            }
        };
        fetchMovies();
        fetchActors()
    }, [addingMovieToActor]);


    return (
        <>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
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
        </>
    );
}

export default App;


