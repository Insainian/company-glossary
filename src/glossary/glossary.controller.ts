import { Controller, Get, Param, Query, Render } from '@nestjs/common';

@Controller('glossary')
export class GlossaryController {
    @Get()
    @Render('glossary/glossary')
    glossaryHome(){
        return { message: 'Glossary home' };
    }

    @Get('search')
    searchBar(@Query('q') q: string): string {
        if (!q) {
            return 'Here is the search bar';
        } else {
            return `Here is a list of results for ${q}`;
        }
    }

    @Get('definition/:id')
    getDefinition(@Param() params): string {
        return 'This is the definition of ' + params.id;
    }

    @Get('add')
    addDefinition(): string {
        return 'You can add things here';
    }
}
