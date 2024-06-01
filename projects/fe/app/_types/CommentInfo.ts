export interface CommentInfo {
    id: number;
    memberId: number;
    memberNickname: string;
    memberEmail: string;
    boardId: number;
    profileImageUrl: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isMenuOpen?: boolean;
}

export const dummyComments: CommentInfo[] = [
    {
        id: 1,
        memberId: 2,
        memberNickname: "test",
        memberEmail: "wndtjq0510@gmail.com",
        boardId: 1,
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIs4E8HndCWj2wEj53iY7NrCYWHOZZVSsO9Jegt771KeI3Esg=s96-c",
        content: "짜스ㅅㄳ",
        createdAt: new Date("2024-06-01T07:51:38.564093"),
        updatedAt: new Date("2024-06-01T07:51:38.564093"),
    },
    {
        id: 2,
        memberId: 2,
        memberNickname: "test",
        memberEmail: "wndtjq0510@gmail.com",
        boardId: 1,
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIs4E8HndCWj2wEj53iY7NrCYWHOZZVSsO9Jegt771KeI3Esg=s96-c",
        content: "짜스ㅅㄳ2",
        createdAt: new Date("2024-06-01T07:51:46.488396"),
        updatedAt: new Date("2024-06-01T07:51:46.488396"),
    },
    {
        id: 34,
        memberId: 2,
        memberNickname: "test",
        memberEmail: "wndtjq0510@gmail.com",
        boardId: 1,
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIs4E8HndCWj2wEj53iY7NrCYWHOZZVSsO9Jegt771KeI3Esg=s96-c",
        content: "짜스ㅅㄳ2",
        createdAt: new Date("2024-06-01T07:51:46.488396"),
        updatedAt: new Date("2024-06-01T07:51:46.488396"),
    },
    {
        id: 255,
        memberId: 2,
        memberNickname: "test",
        memberEmail: "wndtjq0510@gmail.com",
        boardId: 1,
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIs4E8HndCWj2wEj53iY7NrCYWHOZZVSsO9Jegt771KeI3Esg=s96-c",
        content: "짜스ㅅㄳ2",
        createdAt: new Date("2024-06-01T07:51:46.488396"),
        updatedAt: new Date("2024-06-01T07:51:46.488396"),
    },
    {
        id: 3,
        memberId: 2,
        memberNickname: "test",
        memberEmail: "wndtjq0510@gmail.com",
        boardId: 1,
        profileImageUrl:
            "https://lh3.googleusercontent.com/a/ACg8ocIs4E8HndCWj2wEj53iY7NrCYWHOZZVSsO9Jegt771KeI3Esg=s96-c",
        content: "짜스ㅅㄳ3",
        createdAt: new Date("2024-06-01T07:51:49.815359"),
        updatedAt: new Date("2024-06-01T07:51:49.815359"),
    },
];