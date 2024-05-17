package mju.paygo.likes.domain.dto;

public record LikesRequest(
        Long memberId,
        Long boardId
) {
}