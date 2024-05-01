package mju.paygo.physicalprofile.domain;

import java.util.Optional;

public interface PhysicalProfileRepository {

    void save(final PhysicalProfile physicalProfile);
    boolean isExistByMemberId(final Long memberId);
    Optional<PhysicalProfile> findByMemberId(final Long memberId);
}
