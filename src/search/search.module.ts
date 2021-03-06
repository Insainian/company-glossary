import { Module } from '@nestjs/common'
import { SearchService } from './search.service'
import { ElasticsearchModule } from '@nestjs/elasticsearch'

@Module({
  imports: [ElasticsearchModule.register({
    node: `http://${process.env.ELASTICSEARCH_HOST || 'localhost'}:9200`,
  })],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule { }
