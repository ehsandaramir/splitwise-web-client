import {GroupModel} from '../models/group.model';

export class GroupService {
  groups: {} = {};
  public selectedGroup: GroupModel;

  constructor() {
    const group1 = new GroupModel(
      1,
      'Group 1',
      [
        1, 2
      ],
      [
        1, 2
      ]
    );
    const group2 = new GroupModel(
      2,
      'Group 2',
      [
        1, 2
      ],
      [
        1, 2
      ]
    );

    this.groups[group1.id] = group1;
    this.groups[group2.id] = group2;
  }

  list() {
    const target = [];
    for (const key in this.groups) {
      target.push(this.groups[key]);
    }
    return target;
  }

  retrieve(id: number): GroupModel {
    return this.groups[id];
  }

  update(group: GroupModel) {
    this.groups[group.id] = group;
  }
}
