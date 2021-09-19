import {
    Args, Int, Mutation, Parent, Query, ResolveField, Resolver,
} from "@nestjs/graphql";

import type {List} from "../list/list.model";
import {ListService} from "../list/list.service";
import {Item} from "./item.model";
import {ItemService} from "./item.service";

@Resolver(() => Item)
export class ItemResolver {
    constructor(
        private readonly itemService: ItemService,
        private readonly listService: ListService,
    ) {}

    @Query(() => Item)
    async item(@Args("id", {type: () => Int}) id: number): Promise<Item> {
        const item = this.itemService.findOneById(id);

        return item;
    }

    @Query(() => [Item])
    async items(@Args("name", {nullable: true}) name?: string, @Args("listId", {nullable: true}) listId?: number): Promise<Item[]> {
        const items = this.itemService.findAll({name, listId});

        return items;
    }

    @Mutation(() => Item)
    async insertItem(@Args("name") name: string, @Args("listId") listId: number): Promise<Item> {
        const item = this.itemService.create(name, listId);

        return item;
    }

    @ResolveField()
    async list(@Parent() item: Item): Promise<List> {
        const {listId} = item;

        return this.listService.findOneById(listId);
    }
}
