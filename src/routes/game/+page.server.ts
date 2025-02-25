import { quizData as quiz_list } from '$lib/index';
import { Quiz } from '$lib/model/quiz';

export function load() {
    return {
        quiz_list: getFiveRandomQuiz(quiz_list).map(q => ({
            id: q.id,
            name: q.name,
            rank: q.rank,
            auditionId: q.auditionId,
            videoId: q.videoId
        }))
    };
}

function getFiveRandomQuiz(quiz_list: Quiz[]): Quiz[] {
    const randomQuiz: Quiz[] = [];
    const randomIndex: number[] = [];

    while (randomIndex.length < 5) {
        const random = Math.floor(Math.random() * quiz_list.length);
        if (!randomIndex.includes(random)) {
            randomIndex.push(random);
            randomQuiz.push(quiz_list[random]);
        }
    }

    return randomQuiz;
}