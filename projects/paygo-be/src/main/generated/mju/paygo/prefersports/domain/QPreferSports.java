package mju.paygo.prefersports.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPreferSports is a Querydsl query type for PreferSports
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPreferSports extends EntityPathBase<PreferSports> {

    private static final long serialVersionUID = -1861603666L;

    public static final QPreferSports preferSports = new QPreferSports("preferSports");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final ListPath<mju.paygo.prefersports.domain.vo.Sports, EnumPath<mju.paygo.prefersports.domain.vo.Sports>> sports = this.<mju.paygo.prefersports.domain.vo.Sports, EnumPath<mju.paygo.prefersports.domain.vo.Sports>>createList("sports", mju.paygo.prefersports.domain.vo.Sports.class, EnumPath.class, PathInits.DIRECT2);

    public QPreferSports(String variable) {
        super(PreferSports.class, forVariable(variable));
    }

    public QPreferSports(Path<? extends PreferSports> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPreferSports(PathMetadata metadata) {
        super(PreferSports.class, metadata);
    }

}

