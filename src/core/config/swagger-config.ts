import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { VillaCarsModule } from "../../modules";

interface MerchantSwaggerConfig {
    path: string;
    title: string;
    description: string;
    version: string;
    tag?: string;
    modules?: any[];
}

export class SwaggerFactory {
    static createMerchantDocument(app: INestApplication, config: MerchantSwaggerConfig) {
        const documentconfig = new DocumentBuilder()
            .setTitle(config.title)
            .setDescription(config.description)
            .setVersion(config.version)
            .addTag(config.tag)
            .build();
        const document = SwaggerModule.createDocument(app, documentconfig, {
            include: config.modules,
        })
        SwaggerModule.setup(config.path, app, document, /* {
            swaggerOptions: {
                persistAuthorization: true,
            },
        } */);
    }

    static setupMerchantDocs(app: INestApplication) {
        const merchants: MerchantSwaggerConfig[] = [
            {
                path: 'api/villa-cars/docs',
                title: 'Villa Cars API',
                description: 'Villa Cars API Documentation',
                version: '1.0',
                tag: 'Villa Cars',
                modules: [VillaCarsModule]
            },
            {
                path: 'api/default/docs',
                title: 'Default API',
                description: 'Default API Documentation',
                version: '1.0',
                tag: 'Default'
            }
        ]
        merchants.forEach((merchant) => {
            this.createMerchantDocument(app, merchant);
        });
    }
}