<template>
    <v-container>
        <draggable
            v-model="notes"
            @change="draggedItem"
            tag="v-expansion-panels"
            :component-data="expansionPanelsData"
            handle=".handle"
        >
            <v-expansion-panel
                v-for="(note, i) in notes"
                :key="note.id"
                :style="{ backgroundColor: note.color }"
            >
                <v-expansion-panel-header v-slot="{ open }" class="handle">
                    <v-row no-gutters>
                        <v-col cols="4" class="font-weight-bold">
                            {{ note.title }}
                        </v-col>
                        <v-col cols="6">
                            <v-fade-transition leave-absolute class="d-block">
                                <span v-if="!open" class="text--secondary">
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
                                auto-grow
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-btn @click="deleteNote(i)" color="red">Delete</v-btn>
                        <v-color-picker
                            class="ma-2"
                            hide-inputs
                            v-model="note.color"
                            @update:color="updateColor"
                        ></v-color-picker>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </draggable>
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

<style scoped></style>

<script>
import draggable from "vuedraggable";

import note from "@/lib/note";

export default {
    name: "NotesView",
    components: { draggable },
    data: () => ({
        notes: [],
        newNote: { title: "", content: "" },
        expansionPanelsData: {
            props: { focusable: true },
        },
    }),
    mounted() {
        this.notes = note.get();

        // write the changes before the site is closed
        onbeforeunload = () => {
            note.store(this.notes);
        };
    },
    methods: {
        storeNote() {
            try {
                const n = note.create(this.newNote.title, this.newNote.content);
                this.notes.push(n);

                this.newNote.title = "";
                this.newNote.content = "";
            } catch (e) {
                console.error(`Did not create note. ${e}`);
            }
        },
        deleteNote(index) {
            this.notes.splice(index, 1);
        },
        // eslint-disable-next-line
        changeNote(index) {},
        draggedItem() {},
        updateColor() {},
    },
};
</script>
