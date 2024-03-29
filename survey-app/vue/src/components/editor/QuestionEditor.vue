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
                @click="addQuestion()"
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
                @click="deleteQuestion()"
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
                :id="question_type"
                :name="question_type"
                v-model="model.type"
                @change="typeChange"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 col-span-12 sm:col-span-10 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
            >
                <option v-for="typeQ in questionTypes" :key="type" :value="typeQ">
                    {{ upperCaseFirst(typeQ) }}
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
    <div>
        <div v-if="shouldHaveOptions()" class="mt-2">
            <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
                Options
                <!-- Add new option -->
                <button
                    type="button"
                    @click="addOption()"
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
                    Add Option
                </button>
                <!-- / Add new option -->
            </h4>

            <div v-if="!model.data.options.length" class="text-xs text-gray-600 text-center py-3">
                You don't have any options yet.
            </div>

            <!-- Option list -->
            <div
                v-for="(option, index) in model.data.options"
                :key="option.uuid"
                class="flex items-center justify-between"
            >
                <span class="w-6 text-sm"> {{ index+1 }}. </span>
                <input
                    type="text"
                    v-model="option.text"
                    @change="dataChange"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 col-span-12 sm:col-span-10 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                />

                <!-- Delete option -->
                <button
                    type="button"
                    @click="removeOption(option)"
                    class="
                        h-8
                        w-8    
                        flex
                        items-center
                        justify-center
                        rounded-full
                        border border-transparent
                        text-sm text-red-500
                        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 mt-1 inline-block">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                <!-- / Delete option -->
            </div>
            <!-- / Option list -->
            
        </div>
    </div>
    <!-- / Data -->

    <hr class="mt-6 mb-16">
</template>

<script setup>
import { ref, computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store';

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

const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function shouldHaveOptions() {
    return ['radio', 'checkbox', 'select'].includes(model.value.type);
}

function getOptions() {
    return model.value.data.options;
}

function setOptions(options) {
    model.value.data.options = options;
}

function addOption() {
    setOptions([
        ...getOptions(),
        {
            uuid: uuidv4(),
            text: ''
        },
    ]);
    dataChange();
}

function removeOption(op) {
    setOptions(getOptions().filter((opt) => opt !== op));
    dataChange();
}

function typeChange() {
    if (shouldHaveOptions()) {
        setOptions(getOptions() || []);
    }
    dataChange();
}

function dataChange() {
    const data = JSON.parse(JSON.stringify(model.value));
    if(!shouldHaveOptions()) {
        delete data.data.options;
    }

    emit('change', data);
}

function addQuestion(){
    emit('addQuestion', props.index + 1);
}

function deleteQuestion(){
    emit('deleteQuestion', props.question);
}

</script>