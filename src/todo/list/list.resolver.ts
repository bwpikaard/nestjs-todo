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
        return this.listService.findOneById(id);
    }

    @Query(() => [List])
    async lists(): Promise<List[]> {
        return this.listService.findAll();
    }

    @Mutation(() => List)
    async insertList(@Args("name") name: string): Promise<List> {
        return this.listService.create(name);
    }

    @ResolveField(() => [Item])
    async items(@Parent() list: List): Promise<Item[]> {
        const {id} = list;
        
        return this.itemService.findAll({listId: id});
    }
}
