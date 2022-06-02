import { Register } from './../../common/DTO/register.dto';
import { JwtServiceClass } from './../../common/services/jwt.service';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { Posts } from 'src/Entities/posts.entity';
import { Repository } from 'typeorm';
//import * as fs from 'fs';
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Posts } from 'src/Entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    //@InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
    @InjectModel('Posts') private readonly postRepository: Model<Posts>,
    @InjectRepository(Register, 'logindb')
    private readonly registerRepository: Repository<Register>,
    private readonly jwtService: JwtServiceClass,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createPost(postdata: Posts) {
    const value = await this.cacheManager.get('loginStatus');
    //const value = fs.readFileSync('loginstatus.txt');
    if (value === 'success') {
      const post = new Posts();
      const newData = Object.assign(post, postdata);
      return await this.postRepository.create(newData);
    } else {
      throw new UnauthorizedException('please login then add the post...');
    }
  }

  async getAllposts() {
    return await this.postRepository.find();
  }

  async addLike(id: string, like: number) {
    const getOne = await this.postRepository.findByIdAndUpdate(
      { _id: id },
      { likes: like },
    );
    return getOne;
    //console.log(getOne);
  }

  async getLoginDataViaJwt(token: any) {
    const result = await this.jwtService.verifyJwtToken(token);
    const getdataformlogin = await this.registerRepository.findOne({
      email: result.username,
    });
    if (getdataformlogin) {
      await this.cacheManager.set('loginStatus', 'success');
      // fs.writeFile('loginstatus.txt', 'success', () => {
      //   console.log('success msg saved');
      // });
      // setTimeout(() => {
      //   fs.unlink('loginstatus.txt', () => console.log('text file is clear'));
      // }, 300000);
    } else {
      throw new NotFoundException('user is not register');
    }
  }
}
