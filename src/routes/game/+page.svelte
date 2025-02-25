<script lang="ts">
    import type { PageData } from './$types';
    import Youtube from '$lib/component/Youtube.svelte';
    import { goto } from '$app/navigation';
    import { recordStore } from '$lib/index';

    let { data } = $props<{ data: PageData }>();
    let index = $state(0);
    let confirmed = $state(false);
    let inputValue = $state("");
    let currentScore = $state(0);
    let scoreToAdd = $state(0);

    function confirmInput() {
        const input = parseInt(inputValue);
        if (isNaN(input) || input < 1 || input > 100) {
            alert("1부터 100 사이의 숫자를 입력해주세요.");
            return;
        }
        confirmed = true;
        currentScore = $recordStore;
        scoreToAdd = 100 - Math.abs(data.quiz_list[index].rank - input);
        
        // 점수 애니메이션 후 실제 점수 업데이트
        setTimeout(() => {
            recordStore.update(current => current + scoreToAdd);
        }, 1000);

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

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative flex flex-col">
    <!-- 상단 점수 표시 -->
    <div class="fixed top-4 right-4 bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full z-10">
        <span class="text-gray-400 mr-2">SCORE</span>
        <span class="text-2xl font-bold">{$recordStore}</span>
    </div>
    
    <!-- 진행 상황 표시 -->
    <div class="fixed top-4 left-4 bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full z-10">
        <span class="text-gray-400 mr-2">ROUND</span>
        <span class="text-2xl font-bold">{index + 1}/5</span>
    </div>

    <!-- 메인 컨텐츠 영역 -->
    <div class="flex-1 flex flex-col justify-center">
        <!-- 유튜브 플레이어 -->
        <div class="w-full max-w-[1200px] mx-auto aspect-video px-4">
            <Youtube videoId={data.quiz_list[index].videoId} />
        </div>
    </div>

    <!-- 입력 영역 -->
    <div class="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-8 flex flex-col items-center gap-6 border-t border-gray-800">
        <div class="text-center mb-2">
            <p class="text-gray-200 mb-2 text-lg font-medium">이 연습생의 순위를 맞춰보세요</p>
            <p class="text-gray-300 text-sm font-medium">(1-100 사이의 숫자를 입력)</p>
        </div>
        
        <div class="flex items-center gap-4">
            <input 
                type="number" 
                min="1" 
                max="100" 
                bind:value={inputValue} 
                class="text-4xl p-4 w-32 text-center bg-gray-900/80 border-2 border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="#"
            />
            <button 
                class="px-8 py-4 bg-blue-600 text-white text-xl rounded-xl hover:bg-blue-700 transition-colors"
                onclick={confirmInput}
            >
                확인
            </button>
        </div>
    </div>

    <!-- 결과 표시 -->
    {#if confirmed}
        <div class="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-20">
            <div class="text-center animate-result">
                <p class="text-7xl font-bold text-yellow-400 mb-4">
                    {data.quiz_list[index].rank}위
                </p>
                <p class="text-2xl text-gray-400 mb-8">
                    {data.quiz_list[index].name}
                </p>
                <div class="flex items-center justify-center gap-2 text-3xl">
                    <span class="text-gray-400">점수:</span>
                    <span class="text-white font-bold">{currentScore}</span>
                    <span class="text-green-400 animate-score-add">+{scoreToAdd}</span>
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    @keyframes result {
        from { 
            opacity: 0; 
            transform: scale(0.8) translateY(20px); 
        }
        to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
        }
    }
    .animate-result {
        animation: result 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes score-add {
        0% { 
            opacity: 0;
            transform: translateY(10px);
        }
        20% { 
            opacity: 1;
            transform: translateY(0);
        }
        80% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    .animate-score-add {
        animation: score-add 2s ease-out forwards;
    }

    /* Chrome, Safari, Edge에서 number input의 화살표 제거 */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    /* Firefox에서 number input의 화살표 제거 */
    input[type="number"] {
        -moz-appearance: textfield;
    }
</style>