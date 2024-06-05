package mju.paygo.likes.ui.dto;

public record LikesListResponse(
        String profileImageUrl,
        String nickname,
        String email,
        boolean isFollowing
) {
}
