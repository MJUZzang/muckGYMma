package mju.paygo.water.domain;

import java.util.Optional;

public interface WaterRepository {

    Optional<Water> findByMemberIdAndToday(Long memberId);
    Water save(Water water);
}
