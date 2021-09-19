import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {isUndefined, pickBy} from "lodash";
import {Repository} from "typeorm";

import {ItemDAO} from "./item.dao";
import type {Item} from "./item.model";
import type {ItemQuery} from "./item.service.types";

@Injectable()
export class ItemService {
    constructor(@InjectRepository(ItemDAO) private itemRepository: Repository<ItemDAO>) {}

    async findOneById(id: number): Promise<Item> {
        const item = this.itemRepository.findOneOrFail(id);

        return item;
    }

    async findAll(query?: ItemQuery): Promise<Item[]> {
        const cleanQuery = pickBy(query, v => !isUndefined(v));
        const items = this.itemRepository.find(cleanQuery);

        return items;
    }

    async create(name: string, listId: number): Promise<Item> {
        const item = this.itemRepository.create({name, listId});

        await this.itemRepository.save(item);
        return item;
    }
}
