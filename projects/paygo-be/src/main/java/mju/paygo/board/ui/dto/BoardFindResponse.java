package mju.paygo.board.ui.dto;

import java.math.BigDecimal;
import java.util.List;

public record BoardFindResponse(
        Long id,
        String content,
        List<String> imageUrls,
        Long memberId,
        String nickname,
        Long likeCount,
        boolean isLikedByMember,
        Long commentCount,
        BigDecimal kcal
) {}
