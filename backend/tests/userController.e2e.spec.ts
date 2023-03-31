import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users/:id/positions (GET)', () => {
    it('should return the user positions', async () => {
      const response = await request(app.getHttpServer()).get('/users/1/positions');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        checkingAccountAmount: expect.any(Number),
        positions: expect.any(Array),
        consolidated: expect.any(Number),
      });
    });

    it('should return 404 if user is not found', async () => {
      const response = await request(app.getHttpServer()).get('/users/123/positions');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        statusCode: 404,
        message: 'User not found',
      });
    });
  });
});
