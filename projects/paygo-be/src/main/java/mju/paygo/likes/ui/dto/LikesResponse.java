package mju.paygo.likes.ui.dto;

public record LikesResponse(
        Long boardId,
        Long likeCount,
        boolean isLikedByMember,
        Long memberId,       // 추가된 멤버 아이디
        String memberEmail,  // 추가된 멤버 이메일
        String memberNickname // 추가된 멤버 닉네임
) {
}
