package mju.paygo.profile.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.profile.application.ProfileService;
import mju.paygo.profile.ui.dto.ProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/profile")
@RestController
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(@AuthMember final Long memberId) {
        ProfileResponse profile = profileService.getProfile(memberId);
        return ResponseEntity.ok(profile);
    }
}
