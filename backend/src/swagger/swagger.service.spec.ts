import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerService } from './swagger.service';
import { ConfigModule } from '@nestjs/config';
const SwaggerParser = require('swagger-parser');

describe('SwaggerService', () => {
  let swaggerService: SwaggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwaggerService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: process.env.NODE_ENV + '.env',
        }),
      ],
    }).compile();

    swaggerService = module.get<SwaggerService>(SwaggerService);
  });

  describe('swaggerJSON', () => {
    it('should be generated successfully', async () => {
      const swaggerJSON = await swaggerService.getSchema(
        'devopslibrary/sampledata',
      );
      expect(swaggerJSON).toBeDefined();
      try {
        let api = await SwaggerParser.validate(JSON.parse(swaggerJSON));
        expect(api.info.title).toBe('sampledata');
        expect(api.info.version).toBe('1.0.0');
      } catch (err) {
        console.error(err);
      }
    });
  });
});
