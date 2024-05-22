package mju.paygo.follow.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.follow.application.FollowService;
import mju.paygo.follow.domain.dto.FollowRequest;
import mju.paygo.follow.ui.dto.FollowResponse;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/follow")
@RestController
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public ResponseEntity<Boolean> toggleFollow(@AuthMember final Long followerId, @Valid @RequestBody final FollowRequest request) {
        boolean isFollowing = followService.follow(followerId, request.followeeId());
        return ResponseEntity.ok(isFollowing);
    }

    @GetMapping("/followers")
    public ResponseEntity<List<FollowResponse>> getFollowers(@AuthMember final Long memberId) {
        List<FollowResponse> followers = followService.getFollowers(memberId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/following")
    public ResponseEntity<List<FollowResponse>> getFollowing(@AuthMember final Long memberId) {
        List<FollowResponse> following = followService.getFollowing(memberId);
        return ResponseEntity.ok(following);
    }
}
