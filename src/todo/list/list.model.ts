import {
    Field, Int, ObjectType,
} from "@nestjs/graphql";

import {Item} from "../item/item.model";

@ObjectType()
export class List {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field(() => [Item])
    items: Item[];
}
