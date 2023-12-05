import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class TestController {
    private users = [
        {id:1, email:'aaaa@gmail.com', name:'Marceau Cerc' },
        {id:2, email:'2222@gmail.com', name:'Téte Deneuil' },
        {id:3, email:'annneenene@gmail.com', name:'Francis Sau'},
        ];
    
    @Get()
    getUsers() {
        return this.users;
    }

    @Get('/:id')
    getUser(@Param('id') userId: string) : any {
        const user = this.users.find(u => u.id === +userId);
        return user ? user : { error: 'User not found' };
    }
}
