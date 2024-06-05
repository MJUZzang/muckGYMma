package mju.paygo.profile.application;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import mju.paygo.board.domain.BoardRepository;
import mju.paygo.follow.domain.FollowRepository;
import mju.paygo.likes.exception.exception.MemberNotFoundException;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.plan.domain.Plan;
import mju.paygo.plan.domain.PlanRepository;
import mju.paygo.profile.ui.dto.MainProfileResponse;
import mju.paygo.profile.ui.dto.ProfileResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class ProfileService {

    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    private final FollowRepository followRepository;
    private final PlanRepository planRepository;

    public ProfileResponse getProfile(String nickname) {
        Member member = findMemberByNickname(nickname);
        String content = member.getProfileContent();
        long postCount = boardRepository.countByMember(member);
        long followingCount = followRepository.countByFollower(member);
        long followerCount = followRepository.countByFollowee(member);

        List<Plan> clearedPlans = planRepository.findPlansByMemberIdAndStatus(member.getId(), true);
        long totalClearDay = calculateTotalClearDay(clearedPlans);
        long longestClearDay = calculateLongestClearDay(clearedPlans);
        long nowClearDay = calculateNowClearDay(clearedPlans);

        return new ProfileResponse(nickname, postCount, followingCount, followerCount, content, member.getProfileImageUrl(), totalClearDay, longestClearDay, nowClearDay);
    }

    public MainProfileResponse getProfileMain(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
        return new MainProfileResponse(member.getProfileImageUrl(), member.getNickname());
    }

    private Member findMemberByNickname(String nickname) {
        return memberRepository.findByNickname(nickname)
                .orElseThrow(MemberNotFoundException::new);
    }

    private long calculateTotalClearDay(final List<Plan> plans) {
        if (plans.isEmpty()) return 0;

        Set<LocalDate> uniqueDates = plans.stream()
                .map(plan -> plan.getClearedAt().toLocalDate())
                .collect(Collectors.toSet());
        return uniqueDates.size();
    }

    private long calculateLongestClearDay(final List<Plan> plans) {
        if (plans.isEmpty()) return 0;

        // 완료된 계획들을 날짜별로 정렬
        List<LocalDate> sortedDates = plans.stream()
                .map(plan -> plan.getClearedAt().toLocalDate())
                .sorted()
                .toList();

        long maxStreak = 1;
        long currentStreak = 1;

        for (int i = 1; i < sortedDates.size(); i++) {
            if (sortedDates.get(i).isEqual(sortedDates.get(i - 1).plusDays(1))) {
                currentStreak++;
            } else {
                maxStreak = Math.max(maxStreak, currentStreak);
                currentStreak = 1;
            }
        }
        maxStreak = Math.max(maxStreak, currentStreak); // 마지막 스크릭 체크
        return maxStreak;
    }

    private long calculateNowClearDay(final List<Plan> plans) {
        if (plans.isEmpty()) return 0;

        // 완료된 계획들을 날짜별로 정렬
        List<LocalDate> sortedDates = plans.stream()
                .map(plan -> plan.getClearedAt().toLocalDate())
                .sorted()
                .toList();

        LocalDate today = LocalDate.now();

        long currentStreak = 0;

        for (int i = sortedDates.size() - 1; i >= 0; i--) {
            LocalDate clearedDate = sortedDates.get(i);
            if (clearedDate.isEqual(today) || clearedDate.isEqual(today.minusDays(currentStreak))) {
                currentStreak++;
            } else {
                break;
            }
        }

        return currentStreak;
    }
}
