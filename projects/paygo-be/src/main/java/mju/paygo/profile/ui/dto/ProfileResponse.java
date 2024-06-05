package mju.paygo.profile.ui.dto;

public record ProfileResponse (
        String nickname,
        long postCount,
        long followingCount,
        long followerCount,
        String content,
        String profileImageUrl,
        long totalClearDay,
        long longestClearDay,
        long nowClearDay
){
}
