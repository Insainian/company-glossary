import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { SearchResults } from './SearchResults';

@Controller('glossary')
export class GlossaryController {
    @Get()
    @Render('glossary/glossary')
    glossaryHome() {
        return { message: 'Glossary home' };
    }

    @Get('search')
    @Render('glossary/search')
    search(@Query('q') q: string): SearchResults {
        return {
            query: q,
            definitions: [
                {
                    term: 'OOP',
                    meaning: 'Object Oriented Programming',
                    relatedTerms: ['OOD'],
                    links: []
                },
                {
                    term: 'OOD',
                    meaning: 'Object Oriented Design',
                    relatedTerms: ['OOP'],
                    links: []
                }
            ]
        };
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
