import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAllMovies", () => {
    it("should return an array", () => {
      const result = service.getAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getMoiveDetail", () => {
    it("should return a movie", () => {
      service.createMovie({
        title: 'Test Movie',
        year: 2000,
        genre: ['Test']
      });
      const movie = service.getMovieDetail(1);
      expect(movie).toBeDefined();
    });

    it("should throw a NotFoundException", () => {
      try {
        service.getMovieDetail(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genre: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAllMovies().length;
      service.deleteMovie(1);
      const afterDelete = service.getAllMovies().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should return a 404', () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAllMovies().length;
      service.createMovie({
        title: 'Test Movie',
        genre: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAllMovies().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genre: ['test'],
        year: 2000,
      });
      service.updateMovie(1, { title: 'Updated Test' });
      const movie = service.getMovieDetail(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});