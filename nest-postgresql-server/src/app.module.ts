import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailConfigModule } from "./config/mail-config/mail-config.module";
import { CoreModule } from "./core/core.module";
import { JwtConfigModule } from "./config/jwt-config/jwt-config.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./modules/auth/guards/auth.guard";
import { TagsModule } from "./modules/tags/tags.module";
import { ArticlesModule } from "./modules/articles/articles.module";
import { AllExceptionFilter } from "./common/filters/all-exception.filter";
@Module({
  imports: [
    MailConfigModule,
    CoreModule,
    JwtConfigModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    TagsModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
