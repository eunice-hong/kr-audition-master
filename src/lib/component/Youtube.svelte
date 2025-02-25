<script context="module">
    declare global {
        interface Window {
            onYouTubeIframeAPIReady: () => void;
            YT: {
                Player: new (elementId: string, options: {
                    height: string;
                    width: string;
                    videoId: string;
                    playerVars?: {
                        autoplay?: number;
                        controls?: number;
                        playsinline?: number;
                        cc_load_policy?: number;
                    };
                    events: {
                        onReady: () => void;
                        onStateChange: (event: { data: number }) => void;
                    };
                }) => any;
            };
        }
    }
</script>

<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    export let videoId: string;
    export let autoplay = 1; // 1: 자동재생 켜기, 0: 자동재생 끄기
    
    let player: any;
    let divId = "player_" + Math.floor(Math.random() * 109999).toString();
    
    const dispatch = createEventDispatcher();

    function initPlayer() {
        player = new window.YT.Player(divId, {
            height: "390",
            width: "640",
            videoId,
            playerVars: {
                autoplay: autoplay,
                playsinline: 1,
                controls: 1,
                cc_load_policy: 3
            },
            events: {
                onReady: playerIsReady,
                onStateChange: playerStateChange
            }
        });
    }

    onMount(() => {
        // 이미 API가 로드되어 있는 경우
        if (window.YT && window.YT.Player) {
            initPlayer();
            return;
        }

        // API 아직 안 로드된 경우
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = initPlayer;
    });

    // videoId가 변경될 때마다 실행
    $: if (player && videoId) {
        player.loadVideoById({
            videoId: videoId,
            suggestedQuality: 'large'
        });
    }

    function playerStateChange(event: { data: number }) {
        dispatch("PlayerStateChange", event.data);
        let strReturn = "";
        if(event.data == -1) strReturn = "(unstarted)";
        if(event.data == 0) strReturn = "(ended)";
        if(event.data == 1) strReturn = "(playing)";
        if(event.data == 2) strReturn = "(paused)";
        if(event.data == 3) strReturn = "(buffering)";
        if(event.data == 5) strReturn = "(video cued)";
        dispatch("PlayerStateChangeString", strReturn);
    }

    function playerIsReady() {
        dispatch("Ready");
        setInterval(() => {
            dispatch("currentPlayTime", player.getCurrentTime());
        }, 1000);
    }

    export function play() {
        player?.playVideo();
    }
</script>

<div id={divId} class="w-full h-full"></div>