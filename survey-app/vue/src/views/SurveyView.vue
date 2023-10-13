<template v-slot:header>
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold text-gray-900 my-2">
            {{ model.id ? model.title : 'Create Survey' }}
        </h1>
    </div>
    <pre>{{ model }}</pre>
    <form @submit.prevent="saveSurvey">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <!-- Image -->
                <label class="block text-sm font-medium text-gray-700">
                    Cover photo
                </label>
                <div class="mt-1 flex items-center">
                    <img
                        v-if="model.image_url"
                        :src="model.image_url"
                        :alt="model.title"
                        class="w-64 h-48 object-cover"
                    />
                    <svg v-else class="w-64 h-48 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>

                <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                        <label for="title" class="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <div class="mt-1 flex rounded-md shadow-sm">
                            <input type="text" v-model="model.title" id="title" name="title" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300">
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-6">
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input v-model="model.status" id="status" name="status" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="status" class="font-medium text-gray-700">Status</label>
                            <p class="text-gray-500">Active</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <div class="mt-1">
                        <textarea v-model="model.description" id="description" name="description" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                        Brief description for your survey. URLs are hyperlinked.
                    </p>
                </div>

                <div class="col-span-full">
                    <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Cover photo</label>
                    <div class="mt-2 flex items-center">
                        <img 
                            v-if="model.image" 
                            :src="model.image"
                            :alt="model.title" 
                            class="h-12 w-12 object-cover rounded-md"
                        />
                        <span
                            v-else
                            class="inline-block h-12 w-12 rounded-md overflow-hidden bg-gray-100"
                        >
                            <svg class="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </span>

                        <button type="button" class="rounded-md bg-white mx-2 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Change</span>
                                <input id="file-upload" @change="onImageChoose" name="file-upload" type="file" class="sr-only" />
                            </label>
                        </button>

                    </div>
                </div>

                <div>
                    <label for="expire_date" class="block text-sm font-medium text-gray-700">
                        Expire Date
                    </label>
                    <div class="mt-1">
                        <input type="date" v-model="model.expire_date" id="expire_date" name="expire_date" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md">
                    </div>
                </div>

            </div>

            <!-- Questions -->

            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                <h3 class="text-lg font-semibold flex items-center justify-between">
                    Questions

                    <!-- Add question -->
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
                        Add Question
                    </button>
                </h3>
                <div v-if="model.questions.length === 0">
                    <p class="text-sm text-gray-500">
                        No questions yet.
                    </p>
                </div>
                <div v-for="(question, index) in model.questions" :key="question.id">
                    <QuestionEditor
                        :question="question"
                        :index="index"
                        @change="questionChange"
                        @addQuestion="addQuestion"
                        @deleteQuestion="deleteQuestion"
                    />
                </div>
            </div>
            
            
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none">
                    Save
                </button>

                <router-link to="/surveys" class="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    Cancel
                </router-link>

            </div>
        </div>
    </form>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import store from '../store';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import QuestionEditor from '../components/editor/QuestionEditor.vue';

const route = useRoute();
const router = useRouter();

let model = ref({
    title: '',
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
})

if(route.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(route.params.id)
    );
}

function onImageChoose(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = () => {
        model.value.image = reader.result;

        model.value.image_url = reader.result;
    };

    reader.readAsDataURL(file);
}

function addQuestion(index){
    const newQuestion = {
        id: uuidv4(),
        type: 'text',
        question: "",
        description: null,
        data: {},
    };

    model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question){
    model.value.questions = model.value.questions.filter(
        (q) => q !== question
    );
}

function questionChange(question){
    model.value.questions = model.value.questions.map((q) => {
        if (q.id === question.id) {
            return JSON.parse(JSON.stringify(question));
        }
        return q;
    });
}

/**
 * Create or update survey
 */

function saveSurvey(){
    store.dispatch('saveSurvey', model.value).then(({ data }) => {
        router.push({
            name: 'SurveyView',
            params: {
                id: data.data.id,
            },
        });
    });
}
</script>