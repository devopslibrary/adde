import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerController } from './swagger.controller';
import { SwaggerService } from './swagger.service';
import { ConfigModule } from '@nestjs/config';

describe('Swagger Controller', () => {
  let controller: SwaggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwaggerController],
      providers: [SwaggerService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: process.env.NODE_ENV + '.env',
        }),
      ],
    }).compile();

    controller = module.get<SwaggerController>(SwaggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
