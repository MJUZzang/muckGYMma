package mju.paygo.physicalprofile.infrastructure;

import mju.paygo.physicalprofile.domain.PhysicalProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PhysicalProfileJpaRepository extends JpaRepository<PhysicalProfile, Long> {

    PhysicalProfile save(final PhysicalProfile physicalProfile);
    boolean existsByMemberId(final Long memberId);
    Optional<PhysicalProfile> findByMemberId(final Long memberId);
}
