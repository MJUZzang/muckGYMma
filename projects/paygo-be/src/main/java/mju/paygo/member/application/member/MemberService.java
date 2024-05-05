package mju.paygo.member.application.member;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.application.event.ExerciseProfileCreatedEvent;
import mju.paygo.exerciseprofile.application.event.ExerciseProfileEditedEvent;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileCreateRequest;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileEditRequest;
import mju.paygo.global.event.Events;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.domain.member.MemberRepository;
import mju.paygo.member.exception.exceptions.member.MemberNotFoundException;
import mju.paygo.member.exception.exceptions.member.MemberNotInitializedException;
import mju.paygo.member.ui.member.dto.MemberEditRequest;
import mju.paygo.member.ui.member.dto.MemberInitializeRequest;
import mju.paygo.physicalprofile.application.event.PhysicalProfileCreatedEvent;
import mju.paygo.physicalprofile.application.event.PhysicalProfileEditedEvent;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileCreateRequest;
import mju.paygo.physicalprofile.domain.dto.PhysicalProfileEditRequest;
import mju.paygo.preferexercises.application.event.PreferExercisesEditedEvent;
import mju.paygo.preferexercises.application.event.PreferExercisesWroteEvent;
import mju.paygo.prefersports.application.event.PreferSportsEditedEvent;
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

       Member member = findById(memberId);
       member.clearInitialize();
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

    public void editSetting(final Long memberId, final MemberEditRequest request) {
        Member member = findById(memberId);
        if (!member.isInitialized()) {
            throw new MemberNotInitializedException();
        }
        editPhysicalProfile(memberId, request.physicalSetting());
        editPreferSports(memberId, request.sports());
        editPreferExercises(memberId, request.exercises());
        editExerciseProfile(memberId, request.exerciseSetting());
    }

    private void editPhysicalProfile(final Long memberId, final PhysicalProfileEditRequest request) {
        if (request == null) {
            return;
        }
        Events.raise(new PhysicalProfileEditedEvent(memberId, request));
    }

    private void editPreferSports(final Long memberId, final List<String> sportsName) {
        if (sportsName == null) {
            return;
        }
        Events.raise(new PreferSportsEditedEvent(memberId, sportsName));
    }

    private void editPreferExercises(final Long memberId, final List<String> exercisesName) {
        if (exercisesName == null) {
            return;
        }
        Events.raise(new PreferExercisesEditedEvent(memberId, exercisesName));
    }

    private void editExerciseProfile(final Long memberId, final ExerciseProfileEditRequest request) {
        if (request == null) {
            return;
        }
        Events.raise(new ExerciseProfileEditedEvent(memberId, request));
    }
}
