package mju.paygo.board.ui.dto;

import java.math.BigDecimal;

public record BoardFindResponse(
        Long id,
        String content,
        String imageUrl,
        Long memberId,
        String nickname,
        Long likeCount,
        boolean isLikedByMember,
        Long commentCount,
        BigDecimal kcal
) {}
