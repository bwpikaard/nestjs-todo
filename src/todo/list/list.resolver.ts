import {
    Args, Int, Mutation, Parent, Query, ResolveField, Resolver,
} from "@nestjs/graphql";

import {Item} from "../item/item.model";
import {ItemService} from "../item/item.service";
import {List} from "./list.model";
import {ListService} from "./list.service";

@Resolver(() => List)
export class ListResolver {
    constructor(
        private readonly listService: ListService,
        private readonly itemService: ItemService,
    ) {}

    @Query(() => List)
    async list(@Args("id", {type: () => Int}) id: number): Promise<List> {
        const list = this.listService.findOneById(id);

        return list;
    }

    @Query(() => [List])
    async lists(): Promise<List[]> {
        const lists = await this.listService.findAll();

        return lists;
    }

    @Mutation(() => List)
    async insertList(@Args("name") name: string): Promise<List> {
        const list = this.listService.create(name);

        return list;
    }

    @ResolveField(() => [Item])
    async items(@Parent() list: List): Promise<Item[]> {
        const {id} = list;
        
        return this.itemService.findAll({listId: id});
    }
}
