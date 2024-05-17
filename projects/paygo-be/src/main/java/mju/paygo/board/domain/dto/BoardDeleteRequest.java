package mju.paygo.board.domain.dto;

public record BoardDeleteRequest(
        Long memberId,
        Long boardId
) {
}
