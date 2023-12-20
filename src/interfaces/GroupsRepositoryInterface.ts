import { Group } from "../types/Group";
import { GroupCreateData, GroupUpdateData } from "../types/GroupData";
import { GroupFilters } from "../types/GroupFilters.";

export interface GroupsRepositoryInterface {
    getAll(event_id: number): Promise<Group[]>;
    getOne(filters: GroupFilters): Promise<Group | null>;
    create(data: GroupCreateData): Promise<Group>;
    edit(filters: GroupFilters, data:GroupUpdateData): Promise<Group>;
    remove(filters: GroupFilters): Promise<Group>;
}