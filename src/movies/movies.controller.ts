import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}//읽기 전용 movieService 클래스를 가짐

    @Get()
    getAll(): Movie[]{ //Movie array 리턴
        return this.moviesService.getAll(); //consturctor 덕분에 쓸 수 있음
    }

    @Get("/:id")
    getOne(@Param("id") movieId: number): Movie{ //Movie 리턴
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){ //type은 dto
        return this.moviesService.create(movieData);
    }

    @Delete("/:id")
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }

    


}
