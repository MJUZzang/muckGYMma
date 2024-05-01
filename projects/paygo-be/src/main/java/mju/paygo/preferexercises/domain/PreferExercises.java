package mju.paygo.preferexercises.domain;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.preferexercises.domain.vo.Exercise;
import mju.paygo.preferexercises.exception.exceptions.ExerciseDuplicateException;

import java.util.HashSet;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PreferExercises {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @ElementCollection
    @Enumerated(value = EnumType.STRING)
    private List<Exercise> exercises;

    private PreferExercises(final Long memberId, final List<Exercise> exercises) {
        this.memberId = memberId;
        this.exercises = exercises;
    }

    public static PreferExercises of(final Long memberId, final List<String> exercisesName) {
        List<Exercise> exercises = exercisesName.stream()
                .map(Exercise::findByName)
                .toList();
        validateIsNotDuplicate(exercises);

        return new PreferExercises(memberId, exercises);
    }

    private static void validateIsNotDuplicate(final List<Exercise> exercises) {
        HashSet<Exercise> set = new HashSet<>(exercises);
        if (set.size() != exercises.size()) {
            throw new ExerciseDuplicateException();
        }
    }
}
