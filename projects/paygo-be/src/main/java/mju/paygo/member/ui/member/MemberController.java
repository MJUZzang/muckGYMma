package mju.paygo.member.ui.member;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import mju.paygo.member.application.member.MemberService;
import mju.paygo.member.ui.auth.support.auth.AuthMember;
import mju.paygo.member.ui.member.dto.MemberInitializeRequest;
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
    public void initialize(@AuthMember Long memberId, @RequestBody @Valid final MemberInitializeRequest request) {
        memberService.writePhysicalProfile(memberId, request.physical());
    }
}
