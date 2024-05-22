package mju.paygo.meal.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMeal is a Querydsl query type for Meal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMeal extends EntityPathBase<Meal> {

    private static final long serialVersionUID = -1261640714L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMeal meal = new QMeal("meal");

    public final mju.paygo.global.domain.QBaseEntity _super = new mju.paygo.global.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final BooleanPath exercised = createBoolean("exercised");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final StringPath mealName = createString("mealName");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final mju.paygo.meal.domain.vo.QNutrient nutrient;

    public final BooleanPath posted = createBoolean("posted");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QMeal(String variable) {
        this(Meal.class, forVariable(variable), INITS);
    }

    public QMeal(Path<? extends Meal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMeal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMeal(PathMetadata metadata, PathInits inits) {
        this(Meal.class, metadata, inits);
    }

    public QMeal(Class<? extends Meal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.nutrient = inits.isInitialized("nutrient") ? new mju.paygo.meal.domain.vo.QNutrient(forProperty("nutrient")) : null;
    }

}

