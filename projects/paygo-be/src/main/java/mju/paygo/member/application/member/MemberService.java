package mju.paygo.member.application.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.application.event.ExerciseProfileCreatedEvent;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileCreateRequest;
import mju.paygo.global.event.Events;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.exception.exceptions.member.MemberNotFoundException;
import mju.paygo.member.ui.member.dto.MemberInitializeRequest;
import mju.paygo.physicalprofile.application.event.PhysicalProfileCreatedEvent;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;
import mju.paygo.preferexercises.application.event.PreferExercisesWroteEvent;
import mju.paygo.prefersports.application.event.PreferSportsWroteEvent;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public void create(final String email, final String nickname) {
        if (!memberRepository.existsByEmail(email)) {
            memberRepository.save(Member.createWithOAuthLogin(email, nickname));
        }
    }

    public void writeInitializeSetting(final Long memberId, final MemberInitializeRequest request) {
       writePhysicalProfile(memberId, request.physicalSetting());
       writePreferSports(memberId, request.sports());
       writePreferExercises(memberId, request.exercises());
       writeExerciseProfile(memberId, request.exerciseSetting());
    }

    private void writePhysicalProfile(final Long memberId, final PhysicalProfileCreateRequest request) {
        Events.raise(new PhysicalProfileCreatedEvent(memberId, request));
    }

    private void writePreferSports(final Long memberId, final List<String> sportsName) {
        Events.raise(new PreferSportsWroteEvent(memberId, sportsName));
    }

    private void writePreferExercises(final Long memberId, final List<String> exercisesName) {
        Events.raise(new PreferExercisesWroteEvent(memberId, exercisesName));
    }

    private void writeExerciseProfile(final Long memberId, final ExerciseProfileCreateRequest request) {
        Events.raise(new ExerciseProfileCreatedEvent(memberId, request));
    }

    @Transactional(readOnly = true)
    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
    }
}
