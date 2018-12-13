import { Record, List as ImmutableList } from 'immutable';

const ItemRecord = Record({
    id: 0,
    text: '',
    item_order: 0,
    project: 0,
    due_date_utc: '',
    priority: 0,
    responsible_uid: null,
    date_added: '',
    date_string: '',
    notes: ImmutableList.of(),
});

export default class Item extends ItemRecord {
    updateWith({ id, text, item_order, project, due_date_utc, priority, responsible_uid, date_added, date_string }) {
        // updateWith does not support settings notes because it depends on
        // how the Todoist API handles notes
        return new Item({
            id: id || this.id,
            text: text || this.text,
            item_order: item_order || this.item_order,
            project: project || this.project,
            due_date_utc: due_date_utc || this.due_date_utc,
            priority: priority || this.priority,
            responsible_uid: responsible_uid || this.responsible_uid,
            date_added: date_added || this.date_added,
            date_string: date_string || this.date_string,
        });
    }
}
