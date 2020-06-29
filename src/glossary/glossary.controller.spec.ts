import { Test, TestingModule } from '@nestjs/testing';
import { GlossaryController } from './glossary.controller';

describe('Glossary Controller', () => {
  let controller: GlossaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlossaryController],
    }).compile();

    controller = module.get<GlossaryController>(GlossaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
