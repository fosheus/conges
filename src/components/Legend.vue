<script setup lang="ts">
import { DayData } from '../models/day-data.model';
import LeaveCell from './LeaveCell.vue';
const holiday = new DayData(new Date(), true, false);
const weekEndDay = new DayData(new Date(), false, true);
const meh = new DayData(new Date(), false, false);
const pasMal = new DayData(new Date(), false, false);
const oulala = new DayData(new Date(), false, false);
const yessay = new DayData(new Date(), false, false);
const banger = new DayData(new Date(), false, false);
const doubleBanger = new DayData(new Date(), false, false);

pasMal.isNextToWeekEnd = true;

oulala.isNextToHoliday = true;

yessay.addBangerBeam('coucou');
yessay.isNextToHoliday = true;

banger.isNextToHoliday = true;
banger.isNextToWeekEnd = true;

doubleBanger.isNextToHoliday = true;
doubleBanger.isNextToWeekEnd = true;
doubleBanger.addBangerBeam('coucou');


</script>
<template>
    <div class="container">
        <div class="legend">
            <h2>Légende</h2>
            <div class="grid">
                <LeaveCell class="cell" :day-data="holiday"></LeaveCell>jours ferié
                <LeaveCell class="cell" :day-data="weekEndDay"></LeaveCell>weekend
                <LeaveCell class="cell" :day-data="meh"></LeaveCell> jour normal
                <LeaveCell class="cell" :day-data="pasMal"></LeaveCell> jour stylé à poser
                <LeaveCell class="cell" :day-data="oulala"></LeaveCell> jour encore plus stylé à poser
                <LeaveCell class="cell" :day-data="yessay"></LeaveCell> jour qu'il faut abosulment poser
                <LeaveCell class="cell" :day-data="banger"></LeaveCell> jour que si tu le poses pas t'es un dégénéré
                <LeaveCell class="cell" :day-data="doubleBanger"></LeaveCell> là y'a plus de doute t'es un déglingo si tu le
                poses pas
            </div>
        </div>
        <div class="can-shrink">
            <img src="../../public/logo.png">
        </div>
    </div>
</template>
<style scoped>
.container {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
}

.can-shrink {
    flex-shrink: 2;
}

img {
    width: 100%;
    max-width: 250px;
}

.legend {
    flex: 1 1 auto
}


.cell {
    width: 55px;
    height: 22px;
    margin-right: 5px;
    border: 1px solid black;
}

.grid {
    display: grid;
    grid-template-columns: 55px auto;
    gap: 3px
}

@media only screen and (max-width: 1200px) {
    .legend {
        color: white
    }

}
</style>