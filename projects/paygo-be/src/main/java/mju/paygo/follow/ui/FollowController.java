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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/follow")
@RestController
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public ResponseEntity<Boolean> toggleFollow(@Valid @RequestBody final FollowRequest request) {
        boolean isFollowing = followService.follow(request.followerNickname(), request.followeeNickname());
        return ResponseEntity.ok(isFollowing);
    }

    @GetMapping("/followers")
    public ResponseEntity<List<FollowResponse>> getFollowers(@RequestParam String nickname) {
        List<FollowResponse> followers = followService.getFollowersByNickname(nickname);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/following")
    public ResponseEntity<List<FollowResponse>> getFollowing(@RequestParam String nickname) {
        List<FollowResponse> following = followService.getFollowingByNickname(nickname);
        return ResponseEntity.ok(following);
    }

    @GetMapping("/is-following")
    public ResponseEntity<Boolean> isFollowing(@AuthMember final Long memberId, @RequestParam String targetNickname) {
        boolean isFollowing = followService.isFollowing(memberId, targetNickname);
        return ResponseEntity.ok(isFollowing);
    }
}
