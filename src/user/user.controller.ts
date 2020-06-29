import { Controller, Get } from '@nestjs/common';

@Controller('login')
export class UserController {
    @Get()
    findAll(): string{
        return 'This action returns the login';
    }
}
