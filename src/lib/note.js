import { v4 as uuidv4 } from "uuid";

export const createNote = (title, content, id, color) => {
    if (!title) throw "Title not given";
    return {
        title,
        content,
        id: id ? id : uuidv4(),
        color,
    };
};

export const createNotes = (data) => {
    return data
        .map((n) => {
            try {
                return createNote(n.title, n.content, n.id, n.color);
            } catch (e) {
                console.error(`Skipped note. Error: ${e}`);
            }
        })
        .filter((n) => n);
};
