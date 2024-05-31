package mju.paygo.meal.domain.vo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QNutrient is a Querydsl query type for Nutrient
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QNutrient extends BeanPath<Nutrient> {

    private static final long serialVersionUID = -1308917719L;

    public static final QNutrient nutrient = new QNutrient("nutrient");

    public final NumberPath<java.math.BigDecimal> carbo = createNumber("carbo", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> fat = createNumber("fat", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> gram = createNumber("gram", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> kcal = createNumber("kcal", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> protein = createNumber("protein", java.math.BigDecimal.class);

    public final NumberPath<java.math.BigDecimal> sodium = createNumber("sodium", java.math.BigDecimal.class);

    public QNutrient(String variable) {
        super(Nutrient.class, forVariable(variable));
    }

    public QNutrient(Path<? extends Nutrient> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNutrient(PathMetadata metadata) {
        super(Nutrient.class, metadata);
    }

}

