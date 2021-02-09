import { Controller, Get, Param, Post, Patch, Body, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAllMoives() {
        return 'This will return all movies';
    }

    @Get("search")
    searchMovie(@Query("keyword") keyword: string) {
        return `Search keyword : ${keyword}`;
    }

    @Get(':id')
    getMoiveDetail(@Param("id") movieId: string) {
        return `This will return one movie with the id : ${movieId}`;
    }

    @Post()
    createMovie(@Body() movieData) {
        return movieData.title;
    }

    @Patch(':id')
    updateMoive(@Param('id') movieId: string, @Body() updateData) {
        return {
        updatedMovie: movieId,
        ...updateData,
        }
    }
}
