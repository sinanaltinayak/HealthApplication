export class Chat{
    id!: string;
    count!: number;
    createdAt!: number;
    messages!: Message[];
    uid!: string;

    constructor(id: string, count: number, createdAt: number, messages: Message[], uid: string) {
        this.count = count;
        this.id = id;
        this.createdAt = createdAt;
        this.messages = messages;
        this.uid = uid;
    }
}

export class Message{
    content!: string;
    uid!: string;
    createdAt!: number;
    
    constructor(content: string, uid: string, createdAt: number) {
        this.content = content;
        this.uid = uid;
        this.createdAt = createdAt;
    }
}