package mju.paygo.prefersports.domain;

public interface PreferSportsRepository {

    void save(final PreferSports preferSports);
    boolean isExistByMemberId(final Long memberId);
}
