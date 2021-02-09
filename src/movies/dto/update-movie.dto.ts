import { IsString, IsNumber } from 'class-validator';
import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from './create-movie.dto';

// 이렇게 작성해도 가능
// ? 는 필수는 아니라는 뜻
// export class UpdateMovieDto {
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;
    
//     @IsString({ each: true })
//     readonly genre?: string[];
// }

// CreateMovieDto를 변환해서 사용 가능
// PartialType : 필수가 아니라 부분적으로 사용 가능
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
