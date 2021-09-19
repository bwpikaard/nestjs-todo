import {
    Field, Int, ObjectType,
} from "@nestjs/graphql";

import {List} from "../list/list.model";

@ObjectType()
export class Item {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field(() => Int)
    listId: number;

    @Field(() => List)
    list: List;
}
