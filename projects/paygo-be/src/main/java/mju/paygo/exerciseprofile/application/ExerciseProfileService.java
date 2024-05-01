package mju.paygo.exerciseprofile.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.exerciseprofile.domain.ExerciseProfile;
import mju.paygo.exerciseprofile.domain.ExerciseProfileRepository;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileCreateRequest;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileEditRequest;
import mju.paygo.physicalprofile.exception.exceptions.PhysicalProfileNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ExerciseProfileService {

    private final ExerciseProfileRepository exerciseProfileRepository;

    public void writeExerciseProfile(final Long memberId, final ExerciseProfileCreateRequest request) {
        ExerciseProfile exerciseProfile = ExerciseProfile.of(memberId, request);
        if (!exerciseProfileRepository.existedByMemberId(memberId)) {
            exerciseProfileRepository.save(exerciseProfile);
        }
    }

    public void editExerciseProfile(final Long memberId, final ExerciseProfileEditRequest request) {
        ExerciseProfile exerciseProfile = exerciseProfileRepository.findByMemberId(memberId)
                .orElseThrow(PhysicalProfileNotFoundException::new);
        exerciseProfile.edit(request);
    }
}
