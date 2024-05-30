package mju.paygo.physicalprofile.domain.vo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBirth is a Querydsl query type for Birth
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QBirth extends BeanPath<Birth> {

    private static final long serialVersionUID = 81902788L;

    public static final QBirth birth = new QBirth("birth");

    public final NumberPath<Integer> day = createNumber("day", Integer.class);

    public final NumberPath<Integer> month = createNumber("month", Integer.class);

    public final NumberPath<Integer> year = createNumber("year", Integer.class);

    public QBirth(String variable) {
        super(Birth.class, forVariable(variable));
    }

    public QBirth(Path<? extends Birth> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBirth(PathMetadata metadata) {
        super(Birth.class, metadata);
    }

}

