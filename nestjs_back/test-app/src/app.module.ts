import { Module } from '@nestjs/common';
import { TestController } from './test/test.controller';
import { MainController } from './main/main.controller';

@Module({
  imports: [],
  controllers: [TestController, MainController],
  providers: [],
})
export class AppModule {}
