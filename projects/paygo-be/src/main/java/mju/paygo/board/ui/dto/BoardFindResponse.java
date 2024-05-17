package mju.paygo.board.ui.dto;

public record BoardFindResponse(
        Long id,
        String content,
        String imageUrl,
        Long memberId,
        String memberNickname,
        Long likeCount,
        boolean isLikedByMember,
        Long commentCount // 추가된 댓글 수
) {}
