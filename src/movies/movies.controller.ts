import { Controller, Get, Param, Post, Patch, Body, Query, Delete } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
    
    constructor(readonly moviesService: MoviesService) {}

    @Get()
    getAllMoives(): Movie[] {
        return this.moviesService.getAllMovies();
    }

    @Get("search")
    searchMovie(@Query("keyword") keyword: string) {
        return `Search keyword : ${keyword}`;
    }

    @Get(':id')
    getMoiveDetail(@Param("id") movieId: string): Movie {
        return this.moviesService.getMovieDetail(movieId);
    }

    @Post()
    createMovie(@Body() movieData) {
        return this.moviesService.createMovie(movieData);
    }

    @Patch(':id')
    updateMoive(@Param('id') movieId: string, @Body() updateData) {
        return this.moviesService.updateMovie(movieId, updateData);
    }

    @Delete(':id')
    remove(@Param('id') movieId: string) {
        return this.moviesService.deleteMovie(movieId);
    }
}
