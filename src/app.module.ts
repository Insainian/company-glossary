import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/views/user.module';
import { GlossaryModule } from './glossary/views/glossary.module';

@Module({
  imports: [UserModule, GlossaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
