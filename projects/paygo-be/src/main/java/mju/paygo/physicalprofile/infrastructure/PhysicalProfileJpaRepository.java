package mju.paygo.physicalprofile.infrastructure;

import mju.paygo.physicalprofile.domain.PhysicalProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhysicalProfileJpaRepository extends JpaRepository<PhysicalProfile, Long> {

    PhysicalProfile save(final PhysicalProfile physicalProfile);
}
