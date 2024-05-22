package mju.paygo.plan.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTask is a Querydsl query type for Task
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTask extends EntityPathBase<Task> {

    private static final long serialVersionUID = -1416915938L;

    public static final QTask task = new QTask("task");

    public final BooleanPath cleared = createBoolean("cleared");

    public final DateTimePath<java.time.LocalDateTime> clearedAt = createDateTime("clearedAt", java.time.LocalDateTime.class);

    public final NumberPath<Integer> doneSecond = createNumber("doneSecond", Integer.class);

    public final NumberPath<Integer> expect = createNumber("expect", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> repeatation = createNumber("repeatation", Integer.class);

    public final NumberPath<Integer> sets = createNumber("sets", Integer.class);

    public final EnumPath<mju.paygo.plan.domain.vo.TaskType> taskType = createEnum("taskType", mju.paygo.plan.domain.vo.TaskType.class);

    public final NumberPath<Integer> time = createNumber("time", Integer.class);

    public final NumberPath<Integer> weight = createNumber("weight", Integer.class);

    public QTask(String variable) {
        super(Task.class, forVariable(variable));
    }

    public QTask(Path<? extends Task> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTask(PathMetadata metadata) {
        super(Task.class, metadata);
    }

}

