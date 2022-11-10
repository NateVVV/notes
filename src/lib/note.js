import { v4 as uuidv4 } from "uuid";

export const create = (title, content, id, color, labels) => {
    if (!title) throw "Title not given";
    return {
        title,
        content,
        id: id ? id : uuidv4(),
        color: color ? color : "#FFFFFF",
        labels: labels ? labels : [],
    };
};

const createNotes = (data) => {
    return data
        .map((n) => {
            try {
                return create(n.title, n.content, n.id, n.color, n.labels);
            } catch (e) {
                console.error(`Skipped note. Error: ${e}`);
            }
        })
        .filter((n) => n);
};

export const store = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

export const get = () => {
    const notes = localStorage.getItem("notes");
    if (!notes || notes == "undefined") return [];

    return createNotes(JSON.parse(notes));
};

export default { create, get, store };
