from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import List

import models
import schemas

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")

@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")
#movies methods:
@app.get("/movies/", response_model=List[schemas.Movie])
def get_movies():
    return list(models.Movie.select())
@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@app.post("/movies/", response_model=schemas.Movie)
def add_movie(movie: schemas.MovieBase):
    movie = models.Movie.create(**movie.model_dump())
    return movie


@app.delete("/movies/{movie_id}", response_model=schemas.Movie)
def delete_movie(movie_id: int):
    movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    movie.delete_instance()
    return movie

#actors methods:
@app.get("/actors/", response_model=List[schemas.Actor])
def get_actors():
    return list(models.Actor.select())

@app.get("/actors/{actor_id}", response_model=schemas.Actor)
def get_actor(actor_id: int):
    actor = models.Actor.get(models.Actor.id == actor_id)
    if actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    return actor

@app.post("/actors/", response_model=schemas.Actor)
def add_actor(actor: schemas.ActorBase):
    newActor = models.Actor.create(**actor.model_dump())
    return newActor

@app.delete("/actors/{actor_id}", response_model=schemas.Actor)
def delete_actor(actor_id: int):
    actor = models.Actor.filter(models.Actor.id == actor_id).first()
    if actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    actor.delete_instance()
    return actor

@app.post("/movies/{movie_id}/actors", response_model=schemas.Movie)
def update_actor(movie_id: int, actor_data: schemas.ActorToMovie):
    movie = models.Movie.filter(models.Movie.id == movie_id).first()
    actor = models.Actor.filter(models.Actor.id == actor_data.actor_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    if actor is None:
        raise HTTPException(status_code=404, detail="Actor not found")
    movie.actors.add(actor)
    movie.save()
    return movie




