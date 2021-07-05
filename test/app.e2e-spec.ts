import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => { //beforeAll로 매번 새 어플리케이션 생성하지 않도록
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
        forbidNonWhitelisted:true,
        transform: true
        }), //ValidationPipe가 유효성 검사
      );
    await app.init();
  });

  

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies (GET)", () => {
    it("/movies (GET)", () => {
      return request(app.getHttpServer())
        .get("/movies") //movies에 GET 요청 테스트
        .expect(200)
        .expect([]);
    });

    it("POST", () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"TEST",
          year: 2000,
          genres: ['test'],
        })
        .expect(201); //서버에 request해서 movies에 post할때 위 정보들을 보내면 201을 받는지
    });

    it("POST 400", () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title:"TEST",
          year: 2000,
          genres: ['test'],
          other:"thing"
        })
        .expect(400); //서버에 request해서 movies에 post할때 위 정보들을 보내면 201을 받는지
    }); 

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404);
    });
  });

  describe('/movies/:id',() => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(200)
    });
    
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test'})
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
  });
});
