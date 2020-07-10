import { Controller, Get, Post, Param, Query, Render, Body, Redirect } from '@nestjs/common';
import { SearchResults } from './SearchResults';
import { Definition, DefinitionForm } from './Definition';

@Controller('glossary')
export class GlossaryController {
    @Get()
    @Render('glossary/glossary')
    getHomePage() {
        return { message: 'Glossary home' };
    }

    @Get('search')
    @Render('glossary/search')
    getSearchPage(@Query('q') q: string): SearchResults {
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

    @Get('definition/:word')
    @Render('glossary/show_definition')
    getViewDefinitionPage(@Param() params): Definition {
        return {
            term:params.word,
            meaning: 'Meaning of ' + params.word,
            relatedTerms: ['1st term', '2nd term'],
            links: [{
                title: 'Google',
                url: 'http://google.com'
            }]
        };
    }

    @Get('add')
    @Render('glossary/add_definition')
    getAddDefinitionPage() { }

    @Post('add')
    @Render('glossary/added_definition')
    addDefinition(@Body() definition: DefinitionForm): Definition {
        console.log(definition);
        return {
            term: definition.term,
            meaning: definition.meaning,
            relatedTerms: definition.relatedTerms.split(','),
            links: definition.links.split(',').map((linkUrl) => {
                return {
                    title: '',
                    url: linkUrl
                }
            })
        };
    }
}
