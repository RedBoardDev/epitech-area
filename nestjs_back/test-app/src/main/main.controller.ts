import { Controller, Get, Param } from '@nestjs/common';

@Controller('')
export class MainController {
    @Get()
    fetchAll() {
        return 'Hello Epitech!';
    }
}
