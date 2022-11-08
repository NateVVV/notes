<template>
    <v-app id="inspire">
        <v-app-bar app>
            <v-toolbar-title>Notes</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <NotesView />
        </v-main>
    </v-app>
</template>

<script>
import NotesView from "./components/NotesView";

export default {
    name: "App",

    components: {
        NotesView,
    },

    data: () => ({
        //
    }),
};
</script>
