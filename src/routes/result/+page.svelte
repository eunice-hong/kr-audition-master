<script lang="ts">
    import { recordStore } from '$lib/index';
    import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl p-8 text-center">
        <!-- 최종 점수 -->
        <h1 class="text-gray-400 text-2xl mb-4">FINAL SCORE</h1>
        <p class="text-8xl font-bold text-yellow-400 mb-12">{$recordStore}</p>

        <!-- 점수 평가 -->
        <div class="mb-12">
            {#if $recordStore >= 450}
                <p class="text-3xl font-bold text-green-400 mb-2">프로듀서의 자질이 있네요! 👑</p>
                <p class="text-gray-400">당신은 진정한 프로듀서입니다!</p>
            {:else if $recordStore >= 350}
                <p class="text-3xl font-bold text-blue-400 mb-2">꽤 하시네요! 🌟</p>
                <p class="text-gray-400">연습생들을 잘 파악하고 계시군요!</p>
            {:else if $recordStore >= 250}
                <p class="text-3xl font-bold text-yellow-400 mb-2">좋은 시도였어요! ⭐</p>
                <p class="text-gray-400">조금 더 연습하면 금방 늘 거예요!</p>
            {:else}
                <p class="text-3xl font-bold text-red-400 mb-2">아쉽네요... 💫</p>
                <p class="text-gray-400">다시 한번 도전해보세요!</p>
            {/if}
        </div>

        <!-- 버튼 영역 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
                class="px-8 py-4 bg-blue-600 text-white text-xl rounded-xl hover:bg-blue-700 transition-colors"
                onclick={() => goto('/')}
            >
                다시 시작하기
            </button>
            <button 
                class="px-8 py-4 bg-gray-600 text-white text-xl rounded-xl hover:bg-gray-700 transition-colors"
                onclick={() => goto('/ranking')}
            >
                전체 순위 보기
            </button>
        </div>
    </div>

    <!-- 하단 설명 -->
    <p class="text-gray-500 mt-8 text-center text-sm">
        * 점수는 예측한 순위와 실제 순위의 차이를 기준으로 계산됩니다.<br>
        정확할수록 높은 점수를 얻습니다.
    </p>
</div>

<style>
    @keyframes fade-in {
        from { 
            opacity: 0; 
            transform: translateY(20px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }
    :global(.fade-in) {
        animation: fade-in 0.5s ease-out;
    }
</style>