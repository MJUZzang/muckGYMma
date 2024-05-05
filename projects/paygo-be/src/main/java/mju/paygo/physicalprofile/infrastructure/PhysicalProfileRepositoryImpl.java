package mju.paygo.physicalprofile.infrastructure;

import lombok.RequiredArgsConstructor;
import mju.paygo.physicalprofile.domain.PhysicalProfile;
import mju.paygo.physicalprofile.domain.PhysicalProfileRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class PhysicalProfileRepositoryImpl implements PhysicalProfileRepository {

    private final PhysicalProfileJpaRepository physicalProfileJpaRepository;

    @Override
    public void save(final PhysicalProfile physicalProfile) {
        physicalProfileJpaRepository.save(physicalProfile);
    }

    @Override
    public boolean isExistByMemberId(final Long memberId) {
        return physicalProfileJpaRepository.existsByMemberId(memberId);
    }

    @Override
    public Optional<PhysicalProfile> findByMemberId(final Long memberId) {
        return physicalProfileJpaRepository.findByMemberId(memberId);
    }
}
