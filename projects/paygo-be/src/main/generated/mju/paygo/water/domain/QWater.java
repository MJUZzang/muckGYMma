package mju.paygo.water.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWater is a Querydsl query type for Water
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWater extends EntityPathBase<Water> {

    private static final long serialVersionUID = -1153724264L;

    public static final QWater water1 = new QWater("water1");

    public final mju.paygo.global.domain.QBaseEntity _super = new mju.paygo.global.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.ZonedDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    //inherited
    public final DateTimePath<java.time.ZonedDateTime> updatedAt = _super.updatedAt;

    public final NumberPath<Long> water = createNumber("water", Long.class);

    public QWater(String variable) {
        super(Water.class, forVariable(variable));
    }

    public QWater(Path<? extends Water> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWater(PathMetadata metadata) {
        super(Water.class, metadata);
    }

}

