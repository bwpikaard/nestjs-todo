import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {isUndefined, pickBy} from "lodash";
import {Repository} from "typeorm";

import {ListDAO} from "../list/list.dao";
import {ItemDAO} from "./item.dao";
import type {Item} from "./item.model";
import type {ItemQuery} from "./item.service.types";

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemDAO) private itemRepository: Repository<ItemDAO>,
        @InjectRepository(ListDAO) private listRepository: Repository<ListDAO>,
    ) {}

    async findOneById(id: number): Promise<Item> {
        return this.itemRepository.findOneOrFail(id);
    }

    async findAll(query?: ItemQuery): Promise<Item[]> {
        const cleanQuery = pickBy(query, v => !isUndefined(v));
        const items = this.itemRepository.find(cleanQuery);

        return items;
    }

    async create(name: string, listId: number): Promise<Item> {
        const list = await this.listRepository.findOneOrFail(listId);
        const item = this.itemRepository.create({name, list});

        await this.itemRepository.save(item);
        return item;
    }
}
