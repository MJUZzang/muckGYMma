package mju.paygo.prefersports.application;

import lombok.RequiredArgsConstructor;
import mju.paygo.prefersports.domain.PreferSports;
import mju.paygo.prefersports.domain.PreferSportsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class PreferSportsService {

    private final PreferSportsRepository preferSportsRepository;

    public void create(final Long memberId, final List<String> sportsName) {
        if (!preferSportsRepository.isExistByMemberId(memberId)) {
            preferSportsRepository.save(PreferSports.of(memberId, sportsName));
        }
    }
}
