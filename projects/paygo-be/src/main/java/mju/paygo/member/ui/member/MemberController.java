package mju.paygo.member.ui.member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.application.member.MemberService;
import mju.paygo.member.domain.member.Member;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.member.ui.member.dto.MemberInitializeRequest;
import mju.paygo.member.ui.member.dto.MemberInitializeResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/setup")
    public ResponseEntity<Void> initialize(@AuthMember final Long memberId, @RequestBody @Valid final MemberInitializeRequest request) {
        memberService.writeInitializeSetting(memberId, request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/initialized")
    public ResponseEntity<MemberInitializeResponse> isInitialized(@AuthMember final Long memberId) {
        Member member = memberService.findById(memberId);
        return ResponseEntity.ok()
                .body(new MemberInitializeResponse(member.isInitialized()));
    }
}
