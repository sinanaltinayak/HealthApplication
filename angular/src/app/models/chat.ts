export class Chat{
    id!: string;
    count!: number;
    createdAt!: number;
    messages!: Message[];
    senderID!: string;
    receiverID!: string;
    testID!: string;
    unRead: boolean = true;

    constructor(id: string, count: number, createdAt: number, messages: Message[], senderID: string, receiverID: string, testID: string) {
        this.count = count;
        this.id = id;
        this.createdAt = createdAt;
        this.messages = messages;
        this.senderID = senderID;
        this.receiverID = receiverID;
        this.testID = testID;
    }
}

export class Message{
    content!: string;
    senderID!: string;
    createdAt!: number;
    
    constructor(content: string, senderID: string, createdAt: number) {
        this.content = content;
        this.senderID = senderID;
        this.createdAt = createdAt;
    }
}