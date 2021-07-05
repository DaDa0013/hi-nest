import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto{

@IsString()  //IsString 데코레이터
    readonly title: string;

@IsNumber()
    readonly year: number;


@IsOptional()  // 필수가 아니도록 만들기
@IsString({each: true}) 
    readonly genres: string[];
}