import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/common';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: process.env.NODE_ENV + '.env',
        }),
        PassportModule,
        HttpModule,
      ],
      providers: [JwtStrategy],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    it('should return the payload for complete authorization scopes', async () => {
      const mockPayload = {
        iss: 'https://devopslibrary.auth0.com/',
        sub: 'github|5382669',
        aud: [
          'https://backend.adde.to',
          'https://devopslibrary.auth0.com/userinfo',
        ],
        iat: 1584823605,
        exp: 1584910005,
        azp: 'HypzdOPzhUnOgLD6IPk9PcYuHUvPxocy',
        scope: 'openid profile email',
      };

      expect(await jwtStrategy.validate(mockPayload)).toBe(mockPayload);
    });
  });
});
