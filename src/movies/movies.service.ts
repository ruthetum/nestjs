import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { throws } from 'assert';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAllMovies(): Movie[] {
        return this.movies;
    }

    getMovieDetail(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === parseInt(id));
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteMovie(id: string){
        this.getMovieDetail(id);
        this.movies = this.movies.filter(movie => movie.id !== parseInt(id));
    }

    createMovie(movieData) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    updateMovie(id: string, updateData) {
        const movie = this.getMovieDetail(id);
        this.deleteMovie(id);
        this.movies.push({...movie, ...updateData});
    }
}
