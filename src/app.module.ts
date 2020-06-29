import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GlossaryModule } from './glossary/glossary.module';

@Module({
  imports: [UserModule, GlossaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
