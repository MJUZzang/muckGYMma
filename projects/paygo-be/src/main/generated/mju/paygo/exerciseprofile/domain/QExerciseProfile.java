package mju.paygo.exerciseprofile.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QExerciseProfile is a Querydsl query type for ExerciseProfile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExerciseProfile extends EntityPathBase<ExerciseProfile> {

    private static final long serialVersionUID = -989368072L;

    public static final QExerciseProfile exerciseProfile = new QExerciseProfile("exerciseProfile");

    public final EnumPath<mju.paygo.exerciseprofile.domain.vo.Experience> experience = createEnum("experience", mju.paygo.exerciseprofile.domain.vo.Experience.class);

    public final EnumPath<mju.paygo.exerciseprofile.domain.vo.Frequency> frequency = createEnum("frequency", mju.paygo.exerciseprofile.domain.vo.Frequency.class);

    public final EnumPath<mju.paygo.exerciseprofile.domain.vo.Goal> goal = createEnum("goal", mju.paygo.exerciseprofile.domain.vo.Goal.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final EnumPath<mju.paygo.exerciseprofile.domain.vo.Level> level = createEnum("level", mju.paygo.exerciseprofile.domain.vo.Level.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public QExerciseProfile(String variable) {
        super(ExerciseProfile.class, forVariable(variable));
    }

    public QExerciseProfile(Path<? extends ExerciseProfile> path) {
        super(path.getType(), path.getMetadata());
    }

    public QExerciseProfile(PathMetadata metadata) {
        super(ExerciseProfile.class, metadata);
    }

}

