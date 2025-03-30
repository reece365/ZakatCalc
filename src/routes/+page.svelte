<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition"
    let familySize = $state(4);

    let ricePrice = $state(0);
    let fruitPrice = $state(0);
    let flourPrice = $state(0);

    function lbs_to_kg(weight: number) {
        return weight * (1/0.4536)
    }

    async function get_fred_data(id: string) {
        const response = await fetch(
            `https://getfreddata-p3ouwh6d4q-uc.a.run.app/?id=${id}`
        )

        const data = await response.text();

        return data;
    }

    onMount(async () => {
        try {
            get_fred_data("APU0000701312").then((price) => {
                ricePrice = lbs_to_kg(price)
            })

            get_fred_data("APU0000711417").then((price) => {
                fruitPrice = lbs_to_kg(price)
            })

            get_fred_data("APU0000701111").then((price) => {
                flourPrice = lbs_to_kg(price)
            })
        } catch (error) {
            console.error("Error fetching rice price:", error);
            ricePrice = 0;
        }
    });
</script>

<h1 class="text-3xl p-4">Zakat Al-Fitr Calculator</h1>
<hr>

<div class="flex flex-col p-4">
    <span class="text-lg pb-4">The Zakat for a family of <b>{familySize}</b> is:</span>
    <input 
        type="range" 
        bind:value={familySize} 
        min="1"
        max="10" 
        step="1" 
        list="tickmarks"
        class="h-8 p-2 appearance-none bg-gray-200 rounded-lg cursor-pointer"
        aria-label="Family Size"
        aria-describedby="family-size-input"
    />

    <div class="flex justify-between mt-2 pl-2 pr-2">
        {#each Array(10).fill() as _, i}
            <span class="text-center w-4">{i + 1}</span>
        {/each}
    </div>

    <div class="flex justify-center w-full flex-wrap">
        {#each Array(familySize).fill() as _, i (i)}
            <img 
                class="h-30 shrink drop-shadow-1xl" 
                src="/rice.png" 
                alt="Rice bag {i + 1}" 
                in:fade 
                out:fade 
            />
        {/each}
    </div>
    
    <div class="bg-green-400 text-white p-2 rounded-lg flex flex-col">
        <span class="">Your family's Zakat Al-Fitr:</span>
        <span class="text-2xl">{familySize*2.5}kg of food, grain, or dried fruit</span>
    </div>

    <div class="flex flex-col mt-2 p-2 bg-stone-200 rounded-lg">
        <div class="bg-stone-400 text-white p-2 rounded-lg flex flex-col">
            <span class="text-2xl">${(flourPrice*(familySize*2.5)).toFixed(2)} of flour</span>
        </div>
        <div class="bg-stone-400 text-white mt-2 p-2 rounded-lg flex flex-col">
            <span class="text-2xl">${(ricePrice*(familySize*2.5)).toFixed(2)} of rice</span>
        </div>
        <div class="bg-stone-400 text-white mt-2 p-2 rounded-lg flex flex-col">
            <span class="text-2xl">${(fruitPrice*(familySize*2.5)).toFixed(2)} of fruit</span>
        </div>
    </div>

    <button class="bg-red-400 h-10 text-white mt-2 rounded-lg shadow-lg hover:shadow-none transition">How can I donate?</button>
</div>

