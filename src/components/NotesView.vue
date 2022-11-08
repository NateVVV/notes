<template>
    <v-container>
        <v-expansion-panels focusable>
            <draggable v-model="notes">
                <v-expansion-panel v-for="(note, i) in notes" :key="i">
                    <v-expansion-panel-header v-slot="{ open }">
                        <v-row no-gutters>
                            <v-col cols="4" class="font-weight-bold">
                                {{ note.title }}
                            </v-col>
                            <v-col
                                cols="6"
                                class="d-block deep-purple text-truncate"
                            >
                                <v-fade-transition
                                    leave-absolute
                                    class="d-block"
                                >
                                    <span
                                        v-if="!open"
                                        class="d-inline-block text-truncate text--secondary"
                                    >
                                        {{ note.content }}
                                    </span>
                                </v-fade-transition>
                            </v-col>
                            <v-col cols="2"> </v-col>
                        </v-row>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row>
                            <v-col cols="12">
                                <v-textarea
                                    v-model="note.content"
                                    @change="changeNote(i)"
                                >
                                </v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn @click="deleteNote(i)" color="red"
                                    >Delete</v-btn
                                >
                            </v-col>
                        </v-row>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </draggable>
        </v-expansion-panels>
        <v-card class="pa-3">
            <v-text-field v-model="newNote.title" label="Title" required>
            </v-text-field>
            <v-textarea
                v-model="newNote.content"
                label="Details"
                auto-grow
            ></v-textarea>
            <v-btn @click="storeNote" color="green">Save</v-btn>
        </v-card>
    </v-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
    components: { draggable },
    data: () => ({
        notes: [],
        newNote: { title: "", content: "" },
    }),
    mounted() {
        const notes = localStorage.getItem("notes");
        if (!notes) return;

        this.notes = JSON.parse(notes);
    },
    methods: {
        storeNote() {
            const note = {
                title: this.newNote.title.trim(),
                content: this.newNote.content.trim(),
            };

            if (note.title == "") return;

            this.notes.push(note);
            this.writeLocalStorage();
            this.newNote.title = "";
            this.newNote.content = "";
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
            this.writeLocalStorage();
        },
        changeNote(index) {
            console.log("change", index);
            this.writeLocalStorage();
        },
        writeLocalStorage() {
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
    },
};
</script>
