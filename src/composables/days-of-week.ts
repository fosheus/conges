import { computed } from "vue";
import { useBreakpoints } from "./breakpoint";

export const useDaysOfWeek = () => {

    const dayOfWeekLabels = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const dayOfWeekLabelsShort = ['Lu.', 'Ma.', 'Me.', 'Je.', 'Ve.', 'Sa.', 'Di.'];

    const { width, type } = useBreakpoints();

    const daysOfWeek = computed(() => {
        if (type.value != 'lg') {
            return [...dayOfWeekLabelsShort];
        }
        return [...dayOfWeekLabels]
    })
    return {
        daysOfWeek
    }

}