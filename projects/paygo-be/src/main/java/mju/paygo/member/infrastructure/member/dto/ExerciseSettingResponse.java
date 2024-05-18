package mju.paygo.member.infrastructure.member.dto;

import lombok.Getter;
import mju.paygo.exerciseprofile.domain.vo.Experience;
import mju.paygo.exerciseprofile.domain.vo.Frequency;
import mju.paygo.exerciseprofile.domain.vo.Goal;
import mju.paygo.exerciseprofile.domain.vo.Level;

@Getter
public class ExerciseSettingResponse {

    String level;
    String goal;
    String experience;
    String frequency;

    public ExerciseSettingResponse(final Level level, final Goal goal, final Experience experience, final Frequency frequency) {
        this.level = level.getName();
        this.goal = goal.getName();
        this.experience = experience.getName();
        this.frequency = frequency.getName();
    }
}
