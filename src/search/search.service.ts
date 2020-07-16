import { Injectable, Body } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'
import { Definition } from 'src/glossary/Definition'

@Injectable()
export class SearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async addDefinition(definition: Definition): Promise<boolean> {
        await this.elasticsearchService.index({
            index: 'glossary',
            type: '_doc',
            body: definition
        })
        return true
        // TODO: return success state of the index function
    }

    async getDefinitionList(query: string): Promise<Definition[]> {
        const { body } = await this.elasticsearchService.search({
            index: 'glossary',
            type: '_doc',
            from: 0, size: 10,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ["term", "meaning"]
                    }
                }
            }
        })
        const definitions = body.hits.hits.map(hit => hit._source)
        return definitions
    }
}
