package mju.paygo.follow.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.follow.application.FollowService;
import mju.paygo.follow.domain.dto.FollowRequest;
import mju.paygo.follow.ui.dto.FollowResponse;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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

    private static final Logger logger = LoggerFactory.getLogger(FollowController.class);

    private final FollowService followService;

    @PostMapping("/follow")
    public ResponseEntity<Void> follow(@AuthMember Long followerId, @RequestBody FollowRequest followRequest) {
        followService.follow(followerId, followRequest.followeeId());
        logger.info("Followed successfully. Follower ID: {}, Followee ID: {}", followerId, followRequest.followeeId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/unfollow")
    public ResponseEntity<Void> unfollow(@AuthMember Long followerId, @RequestBody FollowRequest followRequest) {
        followService.unfollow(followerId, followRequest.followeeId());
        logger.info("Unfollowed successfully. Follower ID: {}, Followee ID: {}", followerId, followRequest.followeeId());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/followers")
    public ResponseEntity<List<FollowResponse>> getFollowers(@AuthMember Long memberId) {
        List<FollowResponse> followers = followService.getFollowers(memberId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/following")
    public ResponseEntity<List<FollowResponse>> getFollowing(@AuthMember Long memberId) {
        List<FollowResponse> following = followService.getFollowing(memberId);
        return ResponseEntity.ok(following);
    }
}