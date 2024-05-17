package mju.paygo.board.domain.dto;

public record BoardUpdateRequest(
        Long memberId,
        Long boardId,
        String content
) {
}