import { mangoUrl } from './config/mango.config';
import { TypeOrmConfigLoginService } from './common/services/orm.configService';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(mangoUrl),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigLoginService,
      name: 'logindb',
    }),
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
