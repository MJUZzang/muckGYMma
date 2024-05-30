package mju.paygo.likes.ui.dto;

public record LikesResponse(
        boolean isLiked,
        long likeCount
) {
}
