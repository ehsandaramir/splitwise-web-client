import {GroupModel} from '../models/group.model';

export class GroupService {
  groups: GroupModel[] = [];

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

    this.groups.push(group1, group2);
  }

  list() {
    return this.groups;
  }

  retrieve(id: number) {
    let target;
    this.groups.forEach(element => target = element.id === id ? element : null);
  }
}
