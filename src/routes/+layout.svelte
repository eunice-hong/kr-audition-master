<script lang="ts">
	import { page } from '$app/stores';
	import { recordStore } from '$lib/index';
	import '../app.css';
	let { children } = $props();

	$effect(() => {
		if ($page.url.pathname === '/') {
			recordStore.set(0);
		}
	});
</script>

<svelte:head>
	<title>국프 실력 검증 테스트 📝</title>
	<meta name="description" content="당신은 진정한 국민 프로듀서인가요? 연습생들의 무대를 보고 그들의 최종 순위를 맞춰보세요!" />
	<meta name="keywords" content="케이팝, 아이돌, 오디션" />
	<meta name="author" content="eunice-hong" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta charset="utf-8" />
	<link rel="icon" href="/favicon.ico" />

	<meta property="og:title" content="국프 실력 검증 테스트 📝" />
	<meta property="og:description" content="당신은 진정한 국민 프로듀서인가요? 연습생들의 무대를 보고 그들의 최종 순위를 맞춰보세요!" />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:url" content="https://kpop-test.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="국프 실력 검증 테스트 📝" />
	<meta property="og:locale" content="ko_KR" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="국프 실력 검증 테스트 📝" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content="1200" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="국프 실력 검증 테스트 📝" />
	<meta name="twitter:description" content="당신은 진정한 국민 프로듀서인가요? 연습생들의 무대를 보고 그들의 최종 순위를 맞춰보세요!" />
	<meta name="twitter:image" content="/og-image.png" />
	<meta name="twitter:url" content="https://kr-audition-master.vercel.app/" />
	<meta name="twitter:site" content="@eunice-hong" />
	<meta name="twitter:creator" content="@eunice-hong" />
</svelte:head>

{@render children()}
