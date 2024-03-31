import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PanierModule } from './panier/panier.module';
import { CardModule } from './card/card.module';
import { ItemsModule } from './items/items.module';
import { ShoplistModule } from './shoplist/shoplist.module';
import { CategoriesModule } from './categories/categories.module';
import { SupplimentCompositionModule } from './suppliment-composition/suppliment-composition.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.POSTGRES_HOST,
      port:parseInt(<string>process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:'admin',
      database:process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,
    }),
    UserModule,
    PanierModule,
    CardModule,
    ItemsModule,
    ShoplistModule,
    CategoriesModule,
    SupplimentCompositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
