import { AppService } from './../services/app.service';
import { Controller, Get, Logger, Res } from "@nestjs/common";


@Controller()
export class HomeController {
    constructor(private readonly appService: AppService) {}

    @Get()
    public async Home(@Res() response) {
        Logger.log(`get home`);
        response.render('home', 
        {
            title: 'HOME',
            templatePath: 'HOME',
        });
    }
}