package mju.paygo.water.ui;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.water.application.WaterAddRequest;
import mju.paygo.water.application.WaterService;
import mju.paygo.water.domain.Water;
import org.apache.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/waters")
@RestController
public class WaterController {

    private final WaterService waterService;

    @PostMapping
    public ResponseEntity<Void> addWater(@AuthMember final Long memberId, @RequestBody @Valid final WaterAddRequest request) {
        waterService.addWater(memberId, request);

        return ResponseEntity.status(HttpStatus.SC_CREATED)
                .build();
    }

    @GetMapping("/today")
    public ResponseEntity<Long> todayWater(@AuthMember final Long memberId) {
        Water water = waterService.getTodayWater(memberId);
        return ResponseEntity.ok()
                .body(water.getWater());
    }
}
