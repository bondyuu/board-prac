<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

### 2023. 02. 23.
nest.js 게시판 CRUD 연습<br>
db연결없이 배열을 통해 CRUD를 구현함<br>
추후 typeORM 적용 예정<br>



### 2023. 02. 24.
typORM 적용해 MySQL에 board 저장<br>

typeORM 및 MySQL 설치하기
```bash
$ npm install --save @nestjs/typeorm typeorm mysql2
```

typeORMConfig 작성하기 (root경로에 config 폴더를 만들어 작성함)
```javascript
export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'db종류', //Database 설정
  host: 'host정보',
  port: 포트번호,
  username: 'user',
  password: 'password',
  database: 'dbName',
  entities: [entity], // Entity 연결 -> orm에 의해 자동으로 테이블 생성
  synchronize: true, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티 스키마가 변경되면 해당 테이블을 Drop한 후 다시 생성해준다.
};
```

app.module > @module 어노테이션의 imports 속성에 typeORM모듈 추가하기
```javascript
@module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig)
  ],
  ...
})
```

boards.module > @module 어노테이션의 imports 속성에 typeORM모듈 추가하기
```javascript
@module({
  imports: [
    TypeOrmModule.forFeatur([Board]) //Board -> 엔티티
  ],
  ...
})
```

Entity 작성하기<br>
src > boards > boards.entity.ts 참고
```javascript
@Entity()                   // 해당 클래스가 엔티티임을 나타냄
@PrimaryGeneratedColumn()   // 해당 필드가 자동 생성 칼럼임을 나타냄
@Column()                   // 해당 필드가 엔티티의 칼럼임을 나타냄
```

Service 클래스에 Repository 주입하기

```javascript
@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {
      this.boardRepository = boardRepository;
  }   // 서비스 클래스내에서 위의 생성자를 통해 Repository 주입

  findAllBoards(): Promise<Board[]> {      // find() : 모든 객체 찾기
        return this.boardRepository.find();
    }

    async findBoardById(id: number): Promise<Board> {  // findOne() : where으로 선언된 조건에 해당하는 객체 찾기
        const board: Board = await this.boardRepository.findOne({ where: {id: id}});
        if (board === null) {
            throw new NotFoundException('userNotFound');
        }
        return board;
    }

    async saveBoard(requestDto: CreateBoardDto): Promise<Board> { // save() : 객체 저장하기
        return await this.boardRepository.save(requestDto);
    }
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

