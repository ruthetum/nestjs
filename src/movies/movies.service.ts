import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { throws } from 'assert';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAllMovies(): Movie[] {
        return this.movies;
    }

    getMovieDetail(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;
    }

    deleteMovie(id: number){
        this.getMovieDetail(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    createMovie(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    updateMovie(id: number, updateData: UpdateMovieDto) {
        const movie = this.getMovieDetail(id);
        this.deleteMovie(id);
        this.movies.push({...movie, ...updateData});
    }
}
