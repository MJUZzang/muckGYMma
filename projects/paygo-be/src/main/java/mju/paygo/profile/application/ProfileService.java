package mju.paygo.profile.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.follow.domain.FollowRepository;
import mju.paygo.likes.exception.exception.MemberNotFoundException;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.profile.ui.dto.ProfileResponse;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class ProfileService {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final FollowRepository followRepository;

    public ProfileResponse getProfile(final Long memberId) {
        Member member = findMemberById(memberId);
        String nickname = member.getNickname();
        String content = member.getProfileContent();
        long postCount = boardRepository.countByMember(member);
        long followingCount = followRepository.countByFollower(member);
        long followerCount = followRepository.countByFollowee(member);

        return new ProfileResponse(nickname, postCount, followingCount, followerCount, content);
    }

    private Member findMemberById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }
}

