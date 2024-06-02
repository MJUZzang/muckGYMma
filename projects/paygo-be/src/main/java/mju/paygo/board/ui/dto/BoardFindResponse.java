package mju.paygo.board.ui.dto;

import mju.paygo.comment.ui.dto.CommentResponse;
import mju.paygo.likes.ui.dto.LikesListResponse;

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
        boolean isLikedByMember,
        int commentCount,
        BigDecimal kcal,
        List<LikesListResponse> likes,
        List<CommentResponse> comments
) {}
