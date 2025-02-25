
/**
 * Quiz Content
 */
export class Quiz {

    /**
     * Quiz ID
     */
    public id: number;

    /**
     * Audition participant name
     */
    public name: string;

    /**
     * Rank of the participant in the audition
     */
    public rank: number;

    /**
     * Audition ID
     */
    public auditionId: number;
    
    /**
     * YouTube video ID
     */
    public videoId: string;

    constructor(id: number, name: string, rank: number, auditionId: number, videoId: string) {
        this.id = id;
        this.name = name;
        this.rank = rank;
        this.auditionId = auditionId;
        this.videoId = videoId;
    }

}