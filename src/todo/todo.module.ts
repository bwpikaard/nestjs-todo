import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {ItemDAO} from "./item/item.dao";
import {ItemResolver} from "./item/item.resolver";
import {ItemService} from "./item/item.service";
import {ListDAO} from "./list/list.dao";
import {ListResolver} from "./list/list.resolver";
import {ListService} from "./list/list.service";

export const todoEntities = [
    ItemDAO, ListDAO,
];

const ormModule = TypeOrmModule.forFeature(todoEntities);

@Module({
    providers: [ItemService, ListService, ItemResolver, ListResolver],
    imports: [ormModule],
    exports: [ormModule],
})
export class TodoModule {}
