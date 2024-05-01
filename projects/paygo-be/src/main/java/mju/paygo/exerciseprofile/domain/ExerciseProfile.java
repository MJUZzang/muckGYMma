package mju.paygo.exerciseprofile.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileCreateRequest;
import mju.paygo.exerciseprofile.domain.dto.ExerciseProfileEditRequest;
import mju.paygo.exerciseprofile.domain.vo.Experience;
import mju.paygo.exerciseprofile.domain.vo.Frequency;
import mju.paygo.exerciseprofile.domain.vo.Goal;
import mju.paygo.exerciseprofile.domain.vo.Level;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ExerciseProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Level level;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Goal goal;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Experience experience;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Frequency frequency;

    private ExerciseProfile(final Long memberId, final Level level, final Goal goal, final Experience experience, final Frequency frequency) {
        this.memberId = memberId;
        this.level = level;
        this.goal = goal;
        this.experience = experience;
        this.frequency = frequency;
    }

    public static ExerciseProfile of(final Long memberId, final ExerciseProfileCreateRequest request) {
       Level level = Level.findByName(request.level());
       Goal goal = Goal.findByName(request.goal());
       Experience experience = Experience.findByName(request.experience());
       Frequency frequency = Frequency.findByName(request.frequency());

       return new ExerciseProfile(memberId, level, goal, experience, frequency);
    }

    public void edit(final ExerciseProfileEditRequest request) {
        this.level = (request.level() != null) ? Level.findByName(request.level()) : this.level;
        this.goal = (request.goal() != null) ? Goal.findByName(request.goal()) : this.goal;
        this.experience = (request.experience() != null) ? Experience.findByName(request.experience()) : this.experience;
        this.frequency = (request.frequency() != null) ? Frequency.findByName(request.frequency()) : this.frequency;
    }
}
