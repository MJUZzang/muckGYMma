package mju.paygo.plan.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import mju.paygo.global.domain.BaseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Plan extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long memberId;

    @Column(nullable = false)
    private Long mealId;

    @Column(nullable = false)
    private Boolean cleared;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private LocalDateTime clearedAt;

    @JoinColumn(name = "plan_id")
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<Task> tasks = new ArrayList<>();

    private Plan(final Long memberId, final Long mealId, final List<Task> tasks, final String name) {
        this.memberId = memberId;
        this.mealId = mealId;
        this.cleared = false;
        this.tasks = new ArrayList<>(tasks);
        this.name = name;
    }

    public static Plan of(final Long memberId, final Long mealId, final List<Task> tasks, final String name) {
        return new Plan(memberId, mealId, tasks, name);
    }

    public void clear() {
        this.cleared = true;
        this.clearedAt = LocalDateTime.now();
    }
}
