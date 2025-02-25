<script lang="ts">
    import { quizData } from '$lib/index';
    import { goto } from '$app/navigation';

    // 순위 순으로 정렬
    const sortedData = quizData.sort((a, b) => a.rank - b.rank);

    // 순위별 색상 반환
    function getRankColor(rank: number): string {
        if (rank <= 10) return 'text-blue-400';  // 상위권: 기본 파란색
        if (rank <= 30) return 'text-blue-300';  // 중상위권: 밝은 파란색
        if (rank <= 50) return 'text-blue-200';  // 중위권: 더 밝은 파란색
        if (rank <= 70) return 'text-blue-100';  // 중하위권: 가장 밝은 파란색
        return 'text-gray-400';  // 하위권: 회색
    }
</script>

<div class="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <!-- 헤더 -->
    <header class="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 h-16 z-10">
        <div class="flex mx-auto px-4 max-w-3xl py-4 gap-4 items-center">
            <!-- 왼쪽 버튼 -->
            <button 
                class="absolute left-4 text-gray-400 hover:text-white transition-colors"
                onclick={() => goto('/')}
            >
                ← 메인으로
            </button>

            <!-- 가운데 제목 (정확한 중앙 정렬) -->
            <p class="text-xl font-bold flex-1 text-center">
                최종 순위
            </p>

        </div>
    </header>

    <!-- 순위 목록 -->
    <div class="flex-1">
        <main class="mx-auto px-4 py-4 max-w-3xl">
            <div class="space-y-[2px]">
                {#each sortedData as contestant}
                    <div class="p-4 hover:bg-black/20 transition-colors">
                        <div class="flex items-center gap-6">
                            <!-- 순위 -->
                            <div class="flex items-center gap-1 w-24">
                                <span class="text-3xl font-bold {getRankColor(contestant.rank)}">{contestant.rank}</span>
                                <span class="text-sm text-gray-400">위</span>
                            </div>

                            <!-- 이름 -->
                            <div class="flex-1">
                                <h2 class="text-xl font-bold">{contestant.name}</h2>
                            </div>

                            <!-- 무대 보기 버튼 -->
                            <a 
                                href={`https://www.youtube.com/watch?v=${contestant.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                            >
                                무대 보기 →
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </main>
    </div>
</div>

<style>
</style>