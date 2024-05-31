package mju.paygo.follow.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mju.paygo.follow.domain.Follow;
import mju.paygo.follow.domain.FollowRepository;
import mju.paygo.follow.domain.FollowStatus;
import mju.paygo.follow.exception.exceptions.MemberNotFoundException;
import mju.paygo.follow.ui.dto.FollowResponse;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public boolean follow(final Long followerId, final Long followeeId) {
        Member follower = findMemberById(followerId);
        Member followee = findMemberById(followeeId);

        if (followRepository.existsByFollowerAndFollowee(follower, followee)) {
            followRepository.deleteByFollowerAndFollowee(follower, followee);
            return false; // 언팔로우
        } else {
            Follow follow = Follow.of(follower, followee, FollowStatus.ACCEPTED);
            followRepository.save(follow);
            return true; // 팔로우
        }
    }

    public List<FollowResponse> getFollowersByNickname(final String nickname) {
        Member followee = findMemberByNickname(nickname);
        return followRepository.findAllByFollowee(followee).stream()
                .map(follow -> new FollowResponse(
                        follow.getFollower().getNickname(),
                        follow.getFollower().getEmail(),
                        follow.getFollower().getProfileImageUrl()))
                .collect(Collectors.toList());
    }

    public List<FollowResponse> getFollowingByNickname(final String nickname) {
        Member follower = findMemberByNickname(nickname);
        return followRepository.findAllByFollower(follower).stream()
                .map(follow -> new FollowResponse(
                        follow.getFollowee().getNickname(),
                        follow.getFollowee().getEmail(),
                        follow.getFollowee().getProfileImageUrl()))
                .collect(Collectors.toList());
    }

    private Member findMemberById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }

    private Member findMemberByNickname(final String nickname) {
        return memberRepository.findByNickname(nickname)
                .orElseThrow(MemberNotFoundException::new);
    }

    public boolean isFollowing(final Long memberId, final String targetNickname) {
        Member targetMember = memberRepository.findByNickname(targetNickname)
                .orElseThrow(MemberNotFoundException::new);
        return followRepository.existsByFollowerAndFolloweeId(memberId, targetMember.getId());
    }
}

