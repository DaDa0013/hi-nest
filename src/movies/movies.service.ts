import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[]= [];

    getAll(): Movie[]{
        return this.movies;
    }

    getOne(id:number):Movie{
        const movie = this.movies.find(movie => movie.id === id); //+id는 string을 number로 변환 가능
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found.`) // 없는 경우 에러 메세지
        }
        return movie;
    }

    deleteOne(id:number){
        this.getOne(id); //id가 있는 경우 remove
        this.movies = this.movies.filter(movie => movie.id !== id);
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length +1,
            ...movieData
        })
    }

    update(id:number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id); //원래 id 지우기
        this.movies.push({...movie, ...updateData });
    }
}
