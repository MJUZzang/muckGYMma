package mju.paygo.physicalprofile.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhysicalProfile is a Querydsl query type for PhysicalProfile
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhysicalProfile extends EntityPathBase<PhysicalProfile> {

    private static final long serialVersionUID = 1174690776L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhysicalProfile physicalProfile = new QPhysicalProfile("physicalProfile");

    public final mju.paygo.physicalprofile.domain.vo.QBirth birth;

    public final EnumPath<mju.paygo.physicalprofile.domain.vo.Gender> gender = createEnum("gender", mju.paygo.physicalprofile.domain.vo.Gender.class);

    public final NumberPath<java.math.BigDecimal> height = createNumber("height", java.math.BigDecimal.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final NumberPath<java.math.BigDecimal> weight = createNumber("weight", java.math.BigDecimal.class);

    public QPhysicalProfile(String variable) {
        this(PhysicalProfile.class, forVariable(variable), INITS);
    }

    public QPhysicalProfile(Path<? extends PhysicalProfile> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhysicalProfile(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhysicalProfile(PathMetadata metadata, PathInits inits) {
        this(PhysicalProfile.class, metadata, inits);
    }

    public QPhysicalProfile(Class<? extends PhysicalProfile> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.birth = inits.isInitialized("birth") ? new mju.paygo.physicalprofile.domain.vo.QBirth(forProperty("birth")) : null;
    }

}

