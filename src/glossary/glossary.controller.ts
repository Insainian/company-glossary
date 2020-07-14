import { Body, Controller, Get, Param, Post, Query, Render } from '@nestjs/common'
import { Definition, DefinitionForm } from './Definition'
import { SearchResults } from './SearchResults'
import { SearchService } from 'src/search/search.service'

@Controller('glossary')
export class GlossaryController {
    constructor(private readonly searchService: SearchService) { }
    @Get()
    @Render('glossary/glossary')
    getHomePage() {
        return { message: 'Glossary home' }
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
        }
    }

    @Get('definition/:word')
    @Render('glossary/show_definition')
    getViewDefinitionPage(@Param() params): Definition {
        return {
            term: params.word,
            meaning: 'Meaning of ' + params.word,
            relatedTerms: ['1st term', '2nd term'],
            links: [
                {
                    title: 'Google',
                    url: 'http://google.com'
                }
            ]
        }
    }

    @Get('add')
    @Render('glossary/add_definition')
    getAddDefinitionPage() { }

    @Post('add')
    @Render('glossary/added_definition')
    addDefinition(@Body() definitionForm: DefinitionForm): Definition {
        console.log(definitionForm)
        const definition: Definition = {
            term: definitionForm.term,
            meaning: definitionForm.meaning,
            relatedTerms: definitionForm.relatedTerms.split(',').map(term => term.trim()),
            links: definitionForm.links.split(',').map((linkUrl) => {
                return {
                    title: '',
                    url: linkUrl.trim()
                }
            })
        }
        this.searchService.addDefinition(definition)
        return definition
    }
}
