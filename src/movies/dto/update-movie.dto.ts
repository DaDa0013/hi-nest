import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

export class UpdateMovieDto extends PartialType(CreateMovieDto){} //CreateMovieDto와 같지만 전부 필수사항은 아니게