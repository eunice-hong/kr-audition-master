<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-4">
    <div class="w-full max-w-2xl bg-black/30 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in">
        <!-- 타이틀 -->
        <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            국프 실력 검증 테스트
        </h1>
        <p class="text-2xl text-gray-400 mb-12">당신은 진정한 국민 프로듀서인가요? 📝</p>

        <!-- 게임 설명 -->
        <div class="mb-12 text-gray-300">
            <p class="mb-6">
                연습생들의 무대를 보고<br>
                그들의 최종 순위를 맞춰보세요!
            </p>
            <div class="flex flex-col gap-3 text-sm text-gray-400">
                <p>✦ 5명의 연습생 무대가 제공됩니다</p>
                <p>✦ 각 연습생의 최종 순위를 예측해주세요</p>
                <p>✦ 정확도에 따라 국프 실력을 평가합니다</p>
            </div>
        </div>

        <!-- 시작 버튼 -->
        <button 
            class="px-12 py-6 bg-blue-600 text-white text-2xl rounded-2xl hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/20"
            onclick={() => goto('/game')}
        >
            테스트 시작하기
        </button>

        <!-- 랭킹 버튼 -->
        <button 
            class="mt-4 px-6 py-3 text-gray-400 hover:text-white transition-colors"
            onclick={() => goto('/ranking')}
        >
            전체 순위 보기
        </button>
    </div>

    <!-- 푸터 -->
    <footer class="mt-8 text-gray-500 text-sm text-center">
        <p>© 2024 국프 실력 검증 테스트</p>
        <p class="mt-2">
            <a href="https://github.com/eunjin0212" class="hover:text-gray-300 transition-colors">
                GitHub
            </a>
        </p>
    </footer>
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
    .animate-fade-in {
        animation: fade-in 0.8s ease-out;
    }
</style>