<script setup lang="ts">
import { computed } from 'vue';


const props = withDefaults(defineProps<{
    monthIndex: number,
    year: number,
    minYear?: number,
    maxYear?: number,
}>(), {
    minYear: 0,
    maxYear: 3999
});


defineEmits(['previous', 'next', 'previousYear', 'nextYear']);

const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

const previousDisabled = computed(() => new Date(props.year, props.monthIndex - 1, 1).getTime() < new Date(props.minYear, 0, 1).getTime())
const nextDisabled = computed(() => new Date(props.year, props.monthIndex + 1, 0).getTime() >= new Date(props.maxYear, 11, 31).getTime())
const previousYearDisabled = computed(() => new Date(props.year - 1, props.monthIndex, 1).getTime() < new Date(props.minYear, 0, 1).getTime());
const nextYearDisabled = computed(() => new Date(props.year + 1, props.monthIndex, 1).getTime() >= new Date(props.maxYear, 11, 31).getTime());



</script>
<template>
    <div class="actions">
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="side-button" @click="$emit('previous')"
            :disabled="previousDisabled" />
        <div class="element-picker">
            <span class="text-content">{{ months[monthIndex] }}</span>
        </div>
        <div class="element-picker">
            <font-awesome-icon icon="fa-solid fa-chevron-up" class="close-button" @click="$emit('previousYear')"
                :disabled="previousYearDisabled" />
            <span class="text-content">{{ year }}</span>
            <font-awesome-icon icon="fa-solid fa-chevron-down" class="close-button" @click="$emit('nextYear')"
                :disabled="nextYearDisabled" />
        </div>
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="side-button" @click="$emit('next')"
            :disabled="nextDisabled" />

    </div>
</template>
<style scoped>
.actions {
    display: flex;
    flex-direction: row;
    gap: 1rem
}

.text-content {
    font-size: larger;
}

.element-picker {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0px 5px;
    cursor: pointer;
    width: 100px
}


.close-button,
.side-button {
    border: 1px solid hsl(210, 25%, 40%, 0);
    transition: border 0.25s ease-in-out, background-color 0.25s ease-in-out, border-radius 0.25s ease;
    cursor: pointer;

}

.close-button:where([disabled="true"]),
.side-button:where([disabled="true"]) {
    cursor: none;
    pointer-events: none;
}

.close-button:hover:where([disabled="false"]),
.side-button:hover:where([disabled="false"]) {
    background-color: hsl(209, 34%, 88%);
    border: 1px solid hsl(210, 25%, 40%);
    border-radius: 5px;
}

.close-button:active:where([disabled="false"]),
.side-button:active:where([disabled="false"]) {
    scale: 1.2
}



.close-button {
    opacity: 0;
    transition: 0.5s ease-in-out opacity;
}

.element-picker:hover>.close-button {
    opacity: 1;
}


.side-button {
    width: 20px;
    height: 20px;
    padding: 3px;
}
</style>