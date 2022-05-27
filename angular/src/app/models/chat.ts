export class Chat{
    id!: string;
    count!: number;
    createdAt!: number;
    messages!: Message[];
    senderID!: string;
    receiverID!: string;
    testID!: string;

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
    uid!: string;
    createdAt!: number;
    unRead: boolean = true;
    
    constructor(content: string, uid: string, createdAt: number) {
        this.content = content;
        this.uid = uid;
        this.createdAt = createdAt;
    }
}