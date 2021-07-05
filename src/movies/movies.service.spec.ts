import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { isRFC3339 } from 'class-validator';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll",() => {

    it("should return an array", () => {

      const result = service.getAll(); //getAll함수 호출

      expect(result).toBeInstanceOf(Array); //배열로 반환하는지 테스트
    })
  })//꼭 함수와 같은 이름일 필요는 없음


  describe("getOne", () => {
    it("should return a movie", () => {
      service.create({  // movie 만들기
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 error", () => {
      try{
        service.getOne(999); //에러가 생기는 지 확인
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException) //에러가 NotFoundException인지 
        expect(e.message).toEqual("Movie with ID 999 not found."); //에러메세지가 잘 나오는지
      }
    })
  })


  describe("deleteOne", () => {
    it("deletes a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      })
      const allMovies = service.getAll().length;
      service.deleteOne(1)
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies); //제대로 삭제된게 맞는지 
    });
    it("should return a 404", () => {
      try{ 
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); //에러를 제대로 반환하는지
      }
    });
  });

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate); //생성된 것이 맞는지 
    });
  });
    
  describe("update", () => {
    it("should update a movie", () => {
      service.create({
        title:"Test Movie",
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title:"Updated Test"});
      const movie= service. getOne(1);
      expect(movie.title).toEqual('Updated Test'); //title 검사
    });
    it("should return a 404", () => {
      try{ 
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException); //에러를 제대로 반환하는지
      }
    });
  })
});
