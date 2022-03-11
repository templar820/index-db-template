import { db } from "./db";

export async function populate() {
    const todoListId = await db.todoLists.add({
        id: 123,
        title: "To Do Today"
    });
    await db.todoItems.bulkAdd([
        {
            id: 1,
            todoListId,
            title: "Feed the birds"
        },
        {
            id: 2,
            todoListId,
            title: "Watch a movie"
        },
        {
            id: 3,
            todoListId,
            title: "Have some sleep"
        }
    ]);
}
