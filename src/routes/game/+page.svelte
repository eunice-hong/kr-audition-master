<script lang="ts">
    import type { PageData } from './$types';
    import Youtube from '$lib/component/Youtube.svelte';
    import { goto } from '$app/navigation';
    import { recordStore } from '$lib/index';

    let { data } = $props<{ data: PageData }>();
    let index = $state(0);
    let confirmed = $state(false);
    let inputValue = $state("");

    function confirmInput() {
        const input = parseInt(inputValue);
        if (isNaN(input) || input < 1 || input > 100) {
            alert("1부터 100 사이의 숫자를 입력해주세요.");
            return;
        }
        confirmed = true;
        recordStore.update(current => 
            current + (100 - Math.abs(data.quiz_list[index].rank - input))
        );
        setTimeout(() => {
            confirmed = false;
            inputValue = "";
            if (index < data.quiz_list.length - 1) {
                index++;
            } else {
                goto('/result');
            }
        }, 2000);
    }
</script>

<div class="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
    <div class="absolute top-4 right-4 text-2xl font-bold">
        점수: {$recordStore}
    </div>
    
    <Youtube videoId={data.quiz_list[index].videoId} />

    <div class="absolute bottom-10 flex flex-col items-center gap-4">
        <input 
            type="number" 
            min="1" 
            max="100" 
            bind:value={inputValue} 
            class="text-4xl p-4 w-32 text-center border-2 border-gray-300 bg-gray-800 rounded-lg"
        />
        <button 
            class="px-6 py-2 bg-blue-500 text-white text-xl rounded-lg hover:bg-blue-600 transition"
            onclick={confirmInput}
        >
            확인
        </button>
    </div>

    {#if confirmed}
        <p class="absolute top-1/2 text-6xl font-bold text-yellow-400 animate-fade-in">
            {data.quiz_list[index].rank} 위!
        </p>
    {/if}
</div>

<style>
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.5s ease-out;
    }
</style>