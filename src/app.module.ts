import {Module} from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as config from "config";
import {readFileSync} from "fs";

import {TodoModule} from "./todo/todo.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: config.get("db.host"),
            port: config.get("db.port"),
            username: config.get("db.username"),
            password: readFileSync("./secret/db-password.txt").toString(),
            database: config.get("db.database"),
            entities: ["dist/todo/**/*.dao.js"],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: "schema.gql",
        }),
        TodoModule,
    ],
})
export class AppModule {}
