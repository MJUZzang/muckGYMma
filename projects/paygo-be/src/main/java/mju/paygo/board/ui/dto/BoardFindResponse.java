package mju.paygo.board.ui.dto;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;

public record BoardFindResponse(
        Long id,
        String content,
        List<String> imageUrls,
        Long memberId,
        String nickname,
        ZonedDateTime createdAt,
        String profileImageUrl,
        Long likeCount,
        boolean isLikedByMember,
        Long commentCount,
        BigDecimal kcal
) {}
