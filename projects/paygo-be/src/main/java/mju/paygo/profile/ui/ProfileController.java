package mju.paygo.profile.ui;

import lombok.RequiredArgsConstructor;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.profile.application.ProfileService;
import mju.paygo.profile.ui.dto.MainProfileResponse;
import mju.paygo.profile.ui.dto.ProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/profile")
@RestController
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(@RequestParam String nickname) {
        ProfileResponse profile = profileService.getProfile(nickname);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/main-profile")
    public ResponseEntity<MainProfileResponse> getProfileMain(@AuthMember final Long memberId) {
        MainProfileResponse profile = profileService.getProfileMain(memberId);
        return ResponseEntity.ok(profile);
    }
}
