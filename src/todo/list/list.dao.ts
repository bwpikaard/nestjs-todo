import {
    Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from "typeorm";

import {ItemDAO} from "../item/item.dao";

@Entity("list", {
    name: "list",
})
export class ListDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ItemDAO, i => i.list)
    items: ItemDAO[];
}
