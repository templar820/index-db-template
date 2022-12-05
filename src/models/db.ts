import Dexie, { Table } from 'dexie';
import { populate } from './populate';
import { TodoItem } from './TodoItem';
import { TodoList } from './TodoList';



export class MyDataBase extends Dexie {
    todoLists!: Table<TodoList, number>;
    todoItems!: Table<TodoItem, number>;
    constructor() {
        super("MyDataBase");
        this.version(1).stores({
            todoLists: '++id',
            todoItems: '++id, todoListId, title'
        }).stores({
            myCustom: "++id",
        });
    }

    deleteList(todoListId: number) {
        return this.transaction('rw', this.todoItems, this.todoLists, () => {
            this.todoItems.where({ todoListId }).delete();
            this.todoLists.delete(todoListId);
        });
    }
}

export const db = new MyDataBase();

db.on('populate', populate);

export function resetDatabase() {
    return db.transaction('rw', db.todoLists, db.todoItems, async () => {
        await Promise.all(db.tables.map(table => table.clear()));
        await populate();
    });
}
