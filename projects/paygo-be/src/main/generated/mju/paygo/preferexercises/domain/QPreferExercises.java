package mju.paygo.preferexercises.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPreferExercises is a Querydsl query type for PreferExercises
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPreferExercises extends EntityPathBase<PreferExercises> {

    private static final long serialVersionUID = -1579399240L;

    public static final QPreferExercises preferExercises = new QPreferExercises("preferExercises");

    public final ListPath<mju.paygo.preferexercises.domain.vo.Exercise, EnumPath<mju.paygo.preferexercises.domain.vo.Exercise>> exercises = this.<mju.paygo.preferexercises.domain.vo.Exercise, EnumPath<mju.paygo.preferexercises.domain.vo.Exercise>>createList("exercises", mju.paygo.preferexercises.domain.vo.Exercise.class, EnumPath.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public QPreferExercises(String variable) {
        super(PreferExercises.class, forVariable(variable));
    }

    public QPreferExercises(Path<? extends PreferExercises> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPreferExercises(PathMetadata metadata) {
        super(PreferExercises.class, metadata);
    }

}

