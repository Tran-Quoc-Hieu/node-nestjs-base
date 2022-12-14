import { ConfigService } from './config.service';
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}