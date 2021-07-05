import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    home(){
        return 'Welcome to my Movie API'
    }
}//홈페이지 가져오기
