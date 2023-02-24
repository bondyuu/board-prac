import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/boards.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql', //Database 설정
  host: 'localhost',
  port: 3300,
  username: 'root',
  password: '1234',
  database: 'nest',
  entities: [Board], // Entity 연결
  synchronize: true, //true 값을 설정하면 어플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 Drop한 후 다시 생성해준다.
};