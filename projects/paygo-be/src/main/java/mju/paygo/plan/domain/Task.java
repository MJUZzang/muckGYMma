package mju.paygo.plan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.plan.application.dto.TaskWorkoutRequest;
import mju.paygo.plan.domain.vo.TaskType;

import java.time.LocalDateTime;
import static mju.paygo.plan.domain.vo.TaskType.*;
import static mju.paygo.plan.domain.vo.TaskType.SPORTS;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private TaskType taskType;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer expect;

    @Column(nullable = true)
    private Integer time;

    @Column(nullable = true)
    private Integer repeatation;

    @Column(nullable = true)
    private Integer weight;

    @Column(nullable = true)
    private Integer sets;

    @Column(nullable = false)
    private Boolean cleared;

    @Column(nullable = true)
    private LocalDateTime clearedAt;

    @Column(nullable = false)
    private Integer doneSecond;

    private Task(final Long memberId,
                final String name,
                final String taskType,
                final Integer expect,
                final Integer time, final Integer repeatation,
                final Integer weight, final Integer sets) {
        this.memberId = memberId;
        this.name = name;
        this.taskType = taskType.equals("헬스") ? HEALTH : SPORTS;
        this.expect = expect;
        this.time = time;
        this.cleared = false;
        this.doneSecond = 0;
        this.repeatation = repeatation;
        this.weight = weight;
        this.sets = sets;
    }

    public static Task of(final Long memberId, final String type, final TaskWorkoutRequest request) {
        return new Task(
                memberId,
                request.name(),
                type,
                request.expect(),
                request.time(),
                request.repeatation(),
                request.weight(),
                request.set()
        );
    }

    public void done(final int time) {
        // 스포츠
        if (taskType.equals(SPORTS)) {
            if (this.time <= this.doneSecond + time) {
                cleared = true;
                clearedAt = LocalDateTime.now();
                return;
            }
            this.doneSecond += time;
            return;
        }

        // 헬스
        cleared = true;
        clearedAt = LocalDateTime.now();
        this.doneSecond += time;
    }

    public boolean isSame(final Long id) {
        return id.equals(this.id);
    }

    public boolean isCleared() {
        return this.cleared;
    }
}
