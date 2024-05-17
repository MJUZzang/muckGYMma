package mju.paygo.member.infrastructure.member;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.infrastructure.member.dto.ExerciseSettingResponse;
import mju.paygo.member.infrastructure.member.dto.MemberSettingResponse;
import mju.paygo.member.infrastructure.member.dto.PhysicalSettingResponse;
import mju.paygo.preferexercises.domain.vo.Exercise;
import mju.paygo.prefersports.domain.vo.Sports;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import static mju.paygo.exerciseprofile.domain.QExerciseProfile.exerciseProfile;
import static mju.paygo.member.domain.member.QMember.member;
import static mju.paygo.physicalprofile.domain.QPhysicalProfile.physicalProfile;
import static mju.paygo.preferexercises.domain.QPreferExercises.preferExercises;
import static mju.paygo.prefersports.domain.QPreferSports.preferSports;

@RequiredArgsConstructor
@Repository
public class MemberQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public MemberSettingResponse viewSetting(final Long memberId) {
        Tuple tuple = jpaQueryFactory.select(
                        physicalProfile.birth,
                        physicalProfile.gender,
                        physicalProfile.weight,
                        physicalProfile.height,
                        exerciseProfile.level,
                        exerciseProfile.goal,
                        exerciseProfile.frequency,
                        exerciseProfile.experience
                )
                .from(member)
                .innerJoin(exerciseProfile).on(member.id.eq(exerciseProfile.memberId))
                .innerJoin(physicalProfile).on(member.id.eq(physicalProfile.memberId))
                .innerJoin(preferSports).on(member.id.eq(preferSports.memberId))
                .innerJoin(preferExercises).on(member.id.eq(preferExercises.memberId))
                .where(member.id.eq(memberId))
                .fetchOne();

        PhysicalSettingResponse physicalSetting = new PhysicalSettingResponse(
                tuple.get(physicalProfile.birth),
                tuple.get(physicalProfile.gender),
                tuple.get(physicalProfile.weight),
                tuple.get(physicalProfile.height)
        );

        ExerciseSettingResponse exerciseSetting = new ExerciseSettingResponse(
                tuple.get(exerciseProfile.level),
                tuple.get(exerciseProfile.goal),
                tuple.get(exerciseProfile.experience),
                tuple.get(exerciseProfile.frequency)
        );

        List<Tuple> list = jpaQueryFactory.select(
                        preferSports.sports,
                        preferExercises.exercises
                ).from(member)
                .innerJoin(preferSports).on(member.id.eq(preferSports.memberId))
                .innerJoin(preferExercises).on(member.id.eq(preferExercises.memberId))
                .where(member.id.eq(memberId))
                .fetchResults()
                .getResults();

        Set<Sports> sports = new HashSet<>();
        Set<Exercise> exercises = new HashSet<>();

        for (Tuple t : list) {
            Sports s = t.get(0, Sports.class);
            Exercise e = t.get(1, Exercise.class);
            sports.add(s);
            exercises.add(e);
        }

        return new MemberSettingResponse(
                physicalSetting,
                sports,
                exercises,
                exerciseSetting
        );
    }
}
