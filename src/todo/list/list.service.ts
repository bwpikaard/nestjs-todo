import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {isUndefined, pickBy} from "lodash";
import {Repository} from "typeorm";

import {ListDAO} from "./list.dao";
import type {List} from "./list.model";
import type {ListQuery} from "./list.service.types";

@Injectable()
export class ListService {
    constructor(@InjectRepository(ListDAO) private listRepository: Repository<ListDAO>) {}

    async findOneById(id: number): Promise<List> {
        const list = await this.listRepository.findOneOrFail(id);

        return list;
    }

    async findAll(query?: ListQuery): Promise<List[]> {
        const cleanQuery = pickBy(query, v => !isUndefined(v));
        const lists = await this.listRepository.find(cleanQuery);

        return lists;
    }

    async create(name: string): Promise<List> {
        const list = this.listRepository.create({name});

        await this.listRepository.save(list);
        return list;
    }
}
