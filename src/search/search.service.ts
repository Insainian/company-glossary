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
        if (query === undefined) return []
        const { body } = await this.elasticsearchService.search({
            index: 'glossary',
            type: '_doc',
            from: 0,
            size: 10,
            body: {
                query: {
                    multi_match: {
                        query,
                        fields: ["term", "meaning"]
                    }
                }
            }
        })
        const definitions = body.hits.hits.map(hit => {
            const definition = hit._source
            definition.id = hit._id
            return definition
        })
        return definitions
    }

    async getDefinition(id: string): Promise<Definition | undefined> {
        if (id === undefined) return undefined
        try {
            const { body } = await this.elasticsearchService.get({
                id: id,
                index: 'glossary',
                type: '_doc'
            })
            const definition = body._source
            definition.id = body._id
            return definition
        } catch (error) {
            return undefined
        }
    }

    async deleteDefinition(id: string) {
        await this.elasticsearchService.delete({
            id: id,
            index: 'glossary',
            type: '_doc'
        })
    }
}
