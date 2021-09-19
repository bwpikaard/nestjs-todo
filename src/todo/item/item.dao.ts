import {
    Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from "typeorm";

import {ListDAO} from "../list/list.dao";

@Entity("item")
export class ItemDAO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    listId: number;

    @ManyToOne(() => ListDAO)
    list: ListDAO;
}
