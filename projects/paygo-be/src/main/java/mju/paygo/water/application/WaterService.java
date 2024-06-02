package mju.paygo.water.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.water.domain.Water;
import mju.paygo.water.domain.WaterRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class WaterService {

    private final WaterRepository waterRepository;

    public void addWater(final Long memberId, final WaterAddRequest request) {
        Water water = waterRepository.findByMemberIdAndToday(memberId)
                .orElseGet(() -> {
                    Water w = Water.createDefault(memberId);
                    return waterRepository.save(w);
                });
        water.addWater(request.water());
    }

    public Water getTodayWater(final Long memberId) {
        return waterRepository.findByMemberIdAndToday(memberId)
                .orElseGet(() -> Water.createDefault(memberId));
    }
}
