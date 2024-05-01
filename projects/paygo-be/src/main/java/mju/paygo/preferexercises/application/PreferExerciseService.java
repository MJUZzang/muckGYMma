package mju.paygo.preferexercises.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.preferexercises.domain.PreferExercises;
import mju.paygo.preferexercises.domain.PreferExercisesRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class PreferExerciseService {

    private final PreferExercisesRepository preferExercisesRepository;

    public void create(final Long memberId, final List<String> exercisesName) {
        preferExercisesRepository.save(PreferExercises.of(memberId, exercisesName));
    }
}
