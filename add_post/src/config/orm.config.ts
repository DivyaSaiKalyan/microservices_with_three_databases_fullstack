import { Register } from './../common/DTO/register.dto';

//this data base is used to check the user credintials with jwt token

//typeorm login database connection
export const typeormLoginConfigOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  name: 'logindb',
  database: 'micro_db_pro',
  entities: [Register],
  synchronize: true,
};
