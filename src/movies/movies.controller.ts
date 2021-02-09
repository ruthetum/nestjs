import { Controller, Get, Param } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAllMoives() {
        return 'This will return all movies';
    }

    @Get('/:id')
    getMoiveDetail(@Param("id") movieId: string) {
        return `This will return one movie with the id : ${movieId}`;
    }
}
