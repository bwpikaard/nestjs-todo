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
        return this.itemService.findOneById(id);
    }

    @Query(() => [Item])
    async items(@Args("name", {nullable: true}) name?: string, @Args("listId", {nullable: true}) listId?: number): Promise<Item[]> {
        return this.itemService.findAll({name, listId});
    }

    @Mutation(() => Item)
    async insertItem(@Args("name") name: string, @Args("listId") listId: number): Promise<Item> {
        return this.itemService.create(name, listId);
    }

    @ResolveField()
    async list(@Parent() item: Item): Promise<List> {
        const {listId} = item;

        return this.listService.findOneById(listId);
    }
}
