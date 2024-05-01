package mju.paygo.physicalprofile.domain;

public interface PhysicalProfileRepository {

    void save(final PhysicalProfile physicalProfile);
    boolean isExistByMemberId(final Long memberId);
}
