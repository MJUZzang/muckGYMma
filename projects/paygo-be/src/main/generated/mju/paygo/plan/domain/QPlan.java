package mju.paygo.plan.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlan is a Querydsl query type for Plan
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlan extends EntityPathBase<Plan> {

    private static final long serialVersionUID = -1417025086L;

    public static final QPlan plan = new QPlan("plan");

    public final mju.paygo.global.domain.QBaseEntity _super = new mju.paygo.global.domain.QBaseEntity(this);

    public final BooleanPath cleared = createBoolean("cleared");

    public final DateTimePath<java.time.LocalDateTime> clearedAt = createDateTime("clearedAt", java.time.LocalDateTime.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> mealId = createNumber("mealId", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath name = createString("name");

    public final ListPath<Task, QTask> tasks = this.<Task, QTask>createList("tasks", Task.class, QTask.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QPlan(String variable) {
        super(Plan.class, forVariable(variable));
    }

    public QPlan(Path<? extends Plan> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPlan(PathMetadata metadata) {
        super(Plan.class, metadata);
    }

}

