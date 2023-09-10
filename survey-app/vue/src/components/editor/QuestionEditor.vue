<template>

    <!-- Question index -->
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">
            {{ index + 1 }}. {{ model.question }}
        </h3>

        <div class="flex items-center">
            <!-- Add new question -->
            <button
                type="button"
                @click="emit('addQuestion', index + 1)"
                class="
                    flex
                    items-center
                    text-sm
                    py-1
                    px-4
                    rounded-md
                    text-white
                    bg-gray-600
                    hover:bg-gray-700
                "
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add
            </button>
            <!-- / Add new question -->

            <!-- Delete question -->
            <button
                type="button"
                @click="emit('deleteQuestion', index)"
                class="
                    flex
                    items-center
                    text-sm
                    py-1
                    px-4
                    rounded-md
                    text-white
                    bg-red-600
                    hover:bg-red-700
                    ml-2
                "
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Delete
            </button>
            <!-- / Delete question -->
        </div>
    </div>
    <!-- /Question index -->

    <div class="grid gap-3 grid-cols-12">
        <!-- Question -->
        <div class="mt-3 col-span-9">
            <label
                :for="'question_text_' + model.data"
                class="block text-sm font-medium text-gray-700 col-span-12 sm:col-span-2"
            >Question Text</label>
            <input
                type="text"
                :name="'question_text_' + model.data"
                v-model="model.question"
                @change="dataChange"
                :id="'question_text_' + model.data"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 col-span-12 sm:col-span-10 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            />
        </div>
        <!-- / Question -->

        <!-- Question type -->
        <div class="mt-3 col-span-3">
            <label
                :for="'question_type_' + model.data"
                class="block text-sm font-medium text-gray-700 col-span-12 sm:col-span-2"
            >Select Question Type</label>
            <select
                :name="'question_type_' + model.data"
                v-model="model.type"
                @change="dataChange"
                :id="'question_type_' + model.data"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 col-span-12 sm:col-span-10 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            >
                <option v-for="type in questionTypes" :key="type" :value="type">
                    {{ upperCaseFirst(type) }}
                </option>
            </select>
        </div>
        <!-- / Question type -->
    </div>

    <!-- Question Description -->
    <div class="mt-3 col-span-9">
        <label
            :for="'question_description_' + model.id"
            class="block text-sm font-medium text-gray-700 col-span-12 sm:col-span-2"
        >Question Description</label>
        <textarea
            :name="'question_description_' + model.id"
            v-model="model.description"
            @change="dataChange"
            :id="'question_description_' + model.id"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 col-span-12 sm:col-span-10 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
        ></textarea>
    </div>
    <!-- / Question Description -->

    <!-- Data -->

    <!-- / Data -->

    <hr class="mt-6 mb-16">
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    question: Object,
    index: Number
});

const emit = defineEmits([
    'change',
    'addQuestion',
    'deleteQuestion'
]);

const model = ref(JSON.parse(JSON.stringify(props.question)));

</script>